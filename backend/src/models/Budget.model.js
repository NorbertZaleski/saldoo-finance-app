import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: 'true'
    }],
    limit: {
        type: Number,
        required: [true, 'Limit jest wymagany'],
        min: [0.01, 'Limit musi być większy od 0']
    },
    period: {
        type: String,
        default: 'monthly',
        enum: ['monthly', 'yearly']
    },
    month: {
        type: Number,
        min: 0,
        max: 11,
        default: () => new Date().getMonth()
    },
    year: {
        type: Number,
        default: () => new Date().getFullYear()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    alertTreshold: {
        type: Number,
        default: 80,
        min: 0,
        max: 100
    },
}, {
    timestamps: true
});

//unikalność
budgetSchema.index(
    { user: 1, period: 1, month: 1, year: 1},
    {unique: true}
);

budgetSchema.index({user: 1, isActive: 1});
budgetSchema.index({user: 1, 'categories': 1});

//ogarnąć te metody czy one tu powinny być czy utils?


/**
 * Oblicza całkowite wydatki dla WSZYSTKICH kategorii w budżecie
 */
budgetSchema.methods.calculateTotalSpent = async function() {
  const Transaction = mongoose.model('Transaction');
  
  const result = await Transaction.aggregate([
    {
      $match: {
        user: this.user,
        category: { $in: this.categories },
        type: 'expense',
        date: {
          $gte: this.getPeriodStartDate(),
          $lte: this.getPeriodEndDate()
        }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' }
      }
    }
  ]);

  return result.length > 0 ? result[0].total : 0;
};

/**
 * Oblicza wydatki dla KONKRETNEJ KATEGORII w budżecie
 */
budgetSchema.methods.calculateCategorySpent = async function(categoryId) {
  const Transaction = mongoose.model('Transaction');
  
  const result = await Transaction.aggregate([
    {
      $match: {
        user: this.user,
        category: categoryId,
        type: 'expense',
        date: {
          $gte: this.getPeriodStartDate(),
          $lte: this.getPeriodEndDate()
        }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' }
      }
    }
  ]);

  return result.length > 0 ? result[0].total : 0;
};

/**
 * Oblicza statystyki dla każdej kategorii w budżecie
 */
budgetSchema.methods.getCategoryStats = async function() {
  const Transaction = mongoose.model('Transaction');
  const Category = mongoose.model('Category');
  
  // Pobierz nazwy kategorii
  const categories = await Category.find({
    _id: { $in: this.categories }
  }).select('name icon color');

  // Oblicz wydatki dla każdej kategorii
  const stats = await Promise.all(
    categories.map(async (category) => {
      const spent = await this.calculateCategorySpent(category._id);
      return {
        category: category,
        spent: spent,
        limit: this.limit,
        remaining: this.limit - spent,
        percentage: this.limit > 0 ? Math.round((spent / this.limit) * 100) : 0
      };
    })
  );

  // Oblicz całkowite wydatki
  const totalSpent = stats.reduce((sum, s) => sum + s.spent, 0);
  const totalRemaining = this.limit - totalSpent;
  const totalPercentage = this.limit > 0 
    ? Math.round((totalSpent / this.limit) * 100) 
    : 0;

  return {
    budget: this,
    categories: stats,
    summary: {
      totalSpent,
      totalRemaining,
      totalPercentage: Math.min(totalPercentage, 100),
      limit: this.limit,
      status: this.getStatus(totalPercentage)
    }
  };
};

/**
 * Pomocnicze - określa status budżetu
 */
budgetSchema.methods.getStatus = function(percentage) {
  if (percentage < 70) return 'on-track';
  if (percentage < 90) return 'warning';
  return 'exceeded';
};

/**
 * Pomocnicze - data startowa okresu
 */
budgetSchema.methods.getPeriodStartDate = function() {
  if (this.period === 'monthly') {
    return new Date(this.year, this.month, 1);
  } else {
    return new Date(this.year, 0, 1);
  }
};

/**
 * Pomocnicze - data końcowa okresu
 */
budgetSchema.methods.getPeriodEndDate = function() {
  if (this.period === 'monthly') {
    return new Date(this.year, this.month + 1, 0);
  } else {
    return new Date(this.year, 11, 31);
  }
};

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
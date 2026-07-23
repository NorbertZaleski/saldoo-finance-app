import mongoose from "mongoose";

//constants

const DEFAULT_LAYOUT = [
  { id: 'budget', x: 0, y: 0, w: 3, h: 2, variant: 'medium' },
  { id: 'transactions', x: 3, y: 0, w: 3, h: 2, variant: 'medium' },
  { id: 'spending', x: 0, y: 2, w: 2, h: 2, variant: 'medium' },
  { id: 'stats', x: 2, y: 2, w: 2, h: 1, variant: 'small' },
  { id: 'goals', x: 4, y: 2, w: 2, h: 2, variant: 'medium' },
  { id: 'tips', x: 0, y: 4, w: 2, h: 1, variant: 'small' }
];

const DEFAULT_VISIBLE_WIDGETS = [
    'budget', 'transactions', 'spending', 'stats', 'goals', 'tips'
];

const DEFAULT_WIDGET_SETTINGS = {
  budget: {
    limit: 3,
    showCategories: true,
    showProgress: true
  },
  transactions: {
    limit: 5,
    showAllTypes: true,
    showDates: true
  },
  spending: {
    period: 'month',
    categoryLimit: 5,
    showPercentage: true
  },
  stats: {
    showIncome: true,
    showExpense: true,
    showBalance: true,
    period: 'month'
  },
  goals: {
    limit: 3,
    showProgress: true,
    showTarget: true
  },
  tips: {
    category: 'general',
    showDaily: true,
    limit: 1
  }
};

const WIDGET_IDS = ['budget', 'transactions', 'spending', 'stats', 'goals', 'tips'];

const WIDGET_VARIANTS = ['small', 'medium', 'big'];


//schema
const dashboardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },

    layout: {
    type: [{
      id: {
        type: String,
        required: true,
        enum: WIDGET_IDS
      },
      x: { type: Number, default: 0, min: 0 },
      y: { type: Number, default: 0, min: 0 },
      w: { type: Number, default: 2, min: 1, max: 6 },
      h: { type: Number, default: 2, min: 1, max: 4 },
      variant: {
        type: String,
        enum: WIDGET_VARIANTS,
        default: 'medium'
      }
    }],
    default: DEFAULT_LAYOUT
  },

  visibleWidgets: {
    type: [{
      type: String,
      enum: WIDGET_IDS
    }],
    default: DEFAULT_VISIBLE_WIDGETS
  },

  widgetSettings: {
    type: mongoose.Schema.Types.Mixed,
    default: DEFAULT_WIDGET_SETTINGS
  }
}, {
  timestamps: true
});


dashboardSchema.statics.getDefaultLayout = function() {
  return DEFAULT_LAYOUT;
};

// zwraca domyślne widoczne widżety
dashboardSchema.statics.getDefaultVisibleWidgets = function() {
  return DEFAULT_VISIBLE_WIDGETS;
};

// zwraca domyślne ustawienia widżetów
dashboardSchema.statics.getDefaultWidgetSettings = function() {
  return DEFAULT_WIDGET_SETTINGS;
};

// zwraca dostępne ID widżetów
dashboardSchema.statics.getWidgetIds = function() {
  return WIDGET_IDS;
};

// zwraca dostępne warianty
dashboardSchema.statics.getWidgetVariants = function() {
  return WIDGET_VARIANTS;
};

// sprawdza, czy widget istnieje
dashboardSchema.statics.isValidWidgetId = function(widgetId) {
  return WIDGET_IDS.includes(widgetId);
};

// sprawdza, czy wariant jest poprawny
dashboardSchema.statics.isValidVariant = function(variant) {
  return WIDGET_VARIANTS.includes(variant);
};

// resetuje dashboard do domyślnego układu
dashboardSchema.methods.resetToDefault = function() {
  this.layout = DEFAULT_LAYOUT;
  this.visibleWidgets = DEFAULT_VISIBLE_WIDGETS;
  this.widgetSettings = DEFAULT_WIDGET_SETTINGS;
  return this.save();
};

// Dodaje widget do dashboardu
dashboardSchema.methods.addWidget = function(widgetId, position = null) {
  if (!this.constructor.isValidWidgetId(widgetId)) {
    throw new Error(`Widget "${widgetId}" nie istnieje`);
  }

  // sprawdź, czy widget już istnieje
  if (this.visibleWidgets.includes(widgetId)) {
    throw new Error(`Widget "${widgetId}" już istnieje na dashboardzie`);
  }

  // dodaj do widocznych widgetów
  this.visibleWidgets.push(widgetId);

  // dodaj widget do layouta na koniec
  const maxY = this.layout.reduce((max, item) => Math.max(max, item.y + item.h), 0);
  this.layout.push({
    id: widgetId,
    x: 0,
    y: maxY,
    w: 2,
    h: 2,
    variant: 'medium'
  });

  return this.save();
};


dashboardSchema.methods.removeWidget = function(widgetId) {
  // Usuń z widocznych widgetów
  this.visibleWidgets = this.visibleWidgets.filter(id => id !== widgetId);
  
  // Usuń z layoutu
  this.layout = this.layout.filter(item => item.id !== widgetId);
  
  return this.save();
};


dashboardSchema.methods.updateWidgetSettings = function(widgetId, newSettings) {
  if (!this.constructor.isValidWidgetId(widgetId)) {
    throw new Error(`Widget "${widgetId}" nie istnieje`);
  }

  if (!this.widgetSettings[widgetId]) {
    this.widgetSettings[widgetId] = {};
  }

  Object.assign(this.widgetSettings[widgetId], newSettings);
  return this.save();
};

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

export default Dashboard;
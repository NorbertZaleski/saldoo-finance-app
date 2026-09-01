import { Plus } from 'lucide-react';
import { useAccounts } from '../../../hooks/useAccounts';
import { formatCurrency } from '../../../utils/budgetFormat';
import Widget from './Widget';
import { useState } from 'react';
import AddAccountForm from './addAccountForm';
import { createAccount } from '../../../../../backend/src/controllers/account.controller';
createAccount

const BalanceWidget = ({ 
  currency = 'zł',
  size = 'small',
  className = ''
  }) => {

const { accounts, totalBalance, loading, error } = useAccounts();
const [showAddForm, setShowAddForm] = useState(false);
const [submitting, setSubmitting] = useState(false);

const handleAddAccount = async (accountData) => {
  try {
    setSubmitting(true);
    await createAccount(accountData);
    setShowAddForm(false);
  } catch (err) {
    console.error('Nie udało się dodać konta:', err);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <Widget size={size} className={className}>
        <Widget.Body>
            <div className='flex items-center justify-between mb-4'>
              <h3 className="text-lg font-semibold text-white">Saldo</h3>
              <Plus onClick={() => setShowAddForm((prev) => !prev)} color='white' title="Dodaj źródło salda" className='bg-white/10 rounded-lg'/>
              {accounts.length > 1 && (
                <span className='text-xs text-white/50'>{accounts.length} konta</span>
              )}
            </div>
            {loading ? (
              <div>Ładowanie...</div>
            ) : error ? (
              <div>
                {error}
              </div>
            ) : (
              <div className='bg-white/5 rounded-lg p-4 mb-4'>
                <span>
                  {formatCurrency(totalBalance, currency)}
                </span>
              </div>
            )}
            
            {!loading && !error && accounts.length > 0 && (
              <div>
                {acccounts.map((acc) => (
                  <div key={acc._id} className='flex items-center justify-between text-sm'>
                    <span>
                      <span>{acc.icon} || bankicona</span>
                      {acc.name}
                    </span>
                    <span>
                      {formatCurrency(acc.balance, acc.currency || currency)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && accounts.length === 0 && (
              <p className="text-white/50 text-sm">Brak podłączonych kont</p>
            )}

            {showAddForm && (
              <AddAccountForm
                onSubmit={handleAddAccount}
                onCancel={() => setShowAddForm(false)}
              />
            )}
            {submitting && (
              <p className="text-white/50 text-xs mt-2">Zapisywanie...</p>
            )}

        </Widget.Body>
    </Widget>
  );
};

export default BalanceWidget;
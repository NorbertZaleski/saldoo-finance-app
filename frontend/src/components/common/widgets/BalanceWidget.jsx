import { Plus, Trash } from 'lucide-react';
import { useAccounts} from '../../../hooks/useAccounts';
import { formatCurrency } from '../../../utils/budgetFormat';
import { getAccountIcon } from '../../../utils/accountIcons';
import Widget from './Widget';
import { useState } from 'react';
import AddAccountForm from './addAccountForm';
import { accountService } from '../../../services/account.service';

const BalanceWidget = ({ 
  currency = 'zł',
  size = 'small',
  className = ''
  }) => {

const { accounts, totalBalance, loading, error, reload } = useAccounts();
const [showAddForm, setShowAddForm] = useState(false);
const [submitting, setSubmitting] = useState(false);

const handleAddAccount = async (accountData) => {
  try {
    setSubmitting(true);
    await accountService.createAccount(accountData);
    setShowAddForm(false);
    await reload();
  } catch (err) {
    console.error('Nie udało się dodać konta:', err);
  } finally {
    setSubmitting(false);
  }
};

const handleDeleteAccount = async (accountId) => {
  try {
    await accountService.deleteAccount(accountId);
    await reload();
  } catch (err) {
        console.error('Nie udało się usunąć konta:', err);
  }
}

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
                {accounts.map((acc) => {
                  const IconComponent = getAccountIcon(acc.icon);
                  return (
                  <div key={acc._id} className='flex items-center justify-between text-sm'>
                    <span className='flex items-center gap-2'>
                      <IconComponent size={16} className="text-white/70"/>
                      {acc.name}
                    </span>
                    <span>
                      {formatCurrency(acc.balance, acc.currency || currency)}
                    </span>
                      <button onClick={()=> handleDeleteAccount(acc._id)}><Trash size={16} className='text-white/70'/></button>
                  </div>
                )})}
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
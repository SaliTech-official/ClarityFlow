import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TransactionItem from './TransactionItem';
import { Receipt, TrendingUp } from 'lucide-react';

export default function TransactionList({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-gray-100">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Receipt className="w-8 h-8 text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">No transactions yet</h3>
        <p className="text-muted">Start tracking your finances by adding your first transaction above.</p>
      </div>
    );
  }

  const sortedTransactions = transactions.sort((a, b) => 
    new Date(b.date || b.created_date) - new Date(a.date || a.created_date)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text">Recent Transactions</h2>
          <p className="text-muted">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''} total</p>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {sortedTransactions.map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDeleteTransaction}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
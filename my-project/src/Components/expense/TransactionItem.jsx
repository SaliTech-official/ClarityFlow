import React from 'react';
import { Trash2, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
// Replace missing UI lib button with a minimal inline button component
function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center px-2 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const categoryEmojis = {
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '💡',
  healthcare: '🏥',
  shopping: '🛍️',
  salary: '💼',
  freelance: '🔧',
  investment: '📈',
  other: '📦'
};

export default function TransactionItem({ transaction, onDelete, index }) {
  const isIncome = transaction.amount > 0;
  const amount = Math.abs(transaction.amount);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-surface rounded-xl p-5 shadow-lg border-l-4 ${
        isIncome ? 'border-positive' : 'border-negative'
      } hover:shadow-xl transition-all duration-300 group`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`p-3 rounded-xl ${
            isIncome ? 'bg-positive-muted' : 'bg-negative-muted'
          }`}>
            <span className="text-xl">
              {categoryEmojis[transaction.category] || '📦'}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text truncate">
              {transaction.description}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              {transaction.date && (
                <div className="flex items-center gap-1 text-sm text-muted">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(transaction.date), 'MMM d, yyyy')}
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-muted">
                <Tag className="w-3 h-3" />
                {transaction.category}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`text-right ${
            isIncome ? 'text-positive' : 'text-negative'
          }`}>
            <div className="text-lg font-bold">
              {isIncome ? '+' : '-'}${amount.toFixed(2)}
            </div>
            <div className="text-xs text-muted">
              {isIncome ? 'Income' : 'Expense'}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(transaction.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-negative-muted hover:text-negative rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
import React from 'react';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = Math.abs(transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));
  
  const balance = totalIncome - totalExpenses;

  const summaryCards = [
    {
      title: 'Balance',
      amount: balance,
      icon: Wallet,
      color: balance >= 0 ? 'text-positive' : 'text-negative',
      bgColor: 'bg-white',
      iconBg: balance >= 0 ? 'bg-emerald-50' : 'bg-rose-50',
    },
    {
      title: 'Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-positive',
      bgColor: 'bg-white',
      iconBg: 'bg-emerald-50',
    },
    {
      title: 'Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'text-negative',
      bgColor: 'bg-white',
      iconBg: 'bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {summaryCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${card.bgColor} rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted mb-1">{card.title}</p>
              <p className={`text-2xl font-bold ${card.color}`}>
                ${Math.abs(card.amount).toFixed(2)}
              </p>
            </div>
            <div className={`${card.iconBg} p-3 rounded-xl`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
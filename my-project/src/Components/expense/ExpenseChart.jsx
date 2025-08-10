import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExpenseChart({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = Math.abs(transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));

  // Data for pie chart
  const pieData = [
    { name: 'Income', value: totalIncome, color: 'var(--color-positive)' },
    { name: 'Expenses', value: totalExpenses, color: 'var(--color-negative)' }
  ].filter(item => item.value > 0);

  // Data for category breakdown
  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.category || 'other';
    const amount = Math.abs(transaction.amount);
    
    if (!acc[category]) {
      acc[category] = { name: category, income: 0, expenses: 0 };
    }
    
    if (transaction.amount > 0) {
      acc[category].income += amount;
    } else {
      acc[category].expenses += amount;
    }
    
    return acc;
  }, {});

  const categoryChartData = Object.values(categoryData);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 border border-border rounded-lg shadow-lg">
          <p className="font-semibold capitalize text-text">{`${label}`}</p>
          {payload.map((pld, index) => (
            <p key={index} style={{ color: pld.color }}>
              {`${pld.dataKey}: $${pld.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-surface backdrop-blur-sm bg-opacity-80 rounded-2xl p-8 text-center shadow-xl border border-border/20">
        <div className="bg-surface-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">No data to display</h3>
        <p className="text-muted">Add some transactions to see your financial insights.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Income vs Expenses Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-2xl p-6 shadow-xl border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent p-3 rounded-xl">
            <PieChartIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-text">Income vs Expenses</h3>
        </div>

        {pieData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color}/>
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value.toFixed(2)}`]}
                  labelStyle={{ color: 'var(--color-text)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-muted">
            No data available
          </div>
        )}

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-positive rounded-full"></div>
            <span className="text-sm text-muted">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-negative rounded-full"></div>
            <span className="text-sm text-muted">Expenses</span>
          </div>
        </div>
      </motion.div>

      {/* Category Breakdown Bar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-surface rounded-2xl p-6 shadow-xl border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent p-3 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-text">Category Breakdown</h3>
        </div>

        {categoryChartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted)' }}
                  tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-muted)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" fill="var(--color-positive)" name="Income" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-negative)" name="Expenses" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-muted">
            No category data available
          </div>
        )}
      </motion.div>
    </div>
  );
}
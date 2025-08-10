import React, { useState, useEffect } from 'react';
import { Transaction } from '@/Entities/Transaction';
import { motion } from 'framer-motion';
import { Wallet, Sparkles, Sun, Moon } from 'lucide-react';

import Summary from '@/Components/expense/Summary';
import TransactionForm from '@/Components/expense/TransactionForm';
import TransactionList from '@/Components/expense/TransactionList';
import ExpenseChart from '@/Components/expense/ExpenseChart';

export default function ClarityFlow() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await Transaction.list('-created_date');
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      await Transaction.create(transactionData);
      await loadTransactions(); // Reload to get the latest data
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await Transaction.delete(transactionId);
      await loadTransactions(); // Reload to get the latest data
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Theme toggle
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    root.classList.toggle('dark', next);
    root.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted font-medium">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
          className="bg-surface/40 backdrop-blur-lg border-b border-border/20 sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-accent p-3 rounded-2xl shadow-elev">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text">
                  Clarity Flow
                </h1>
                <p className="text-muted font-medium">Take control of your financial journey</p>
              </div>
            </div>
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 bg-surface/60 px-4 py-2 rounded-full border border-border/20">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-text">Premium Experience</span>
                </div>
                <button
                  aria-label="Toggle theme"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-text hover:brightness-95 transition"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'} mode</span>
                </button>
              </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Summary Cards */}
        <Summary transactions={transactions} />

        {/* Transaction Form */}
        <TransactionForm onAddTransaction={handleAddTransaction} />

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-accent p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text">Financial Insights</h2>
              <p className="text-muted">Visualize your spending patterns and trends</p>
            </div>
          </div>
          <ExpenseChart transactions={transactions} />
        </motion.div>

        {/* Transaction List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <TransactionList 
            transactions={transactions} 
            onDeleteTransaction={handleDeleteTransaction}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-surface/40 backdrop-blur-lg border-t border-border/20 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-muted">
            Built with ❤️ for better financial management
          </p>
        </div>
      </footer>
    </div>
  );
}
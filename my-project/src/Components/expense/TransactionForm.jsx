import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
// Minimal native UI replacements for missing component library
function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input(props) {
  const { className = '', ...rest } = props;
  return (
    <input
      className={`w-full px-3 py-2 border border-border rounded-xl bg-surface text-text placeholder:text-muted focus:border-accent focus:ring-accent ${className}`}
      {...rest}
    />
  );
}

function Label({ children, className = '', ...props }) {
  return (
    <label className={`block text-sm font-semibold text-text ${className}`} {...props}>
      {children}
    </label>
  );
}

function Select({ value, onValueChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full px-3 py-2 border border-border rounded-xl bg-surface text-text focus:border-accent focus:ring-accent"
    >
      {children}
    </select>
  );
}

function SelectTrigger({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function SelectValue() { return null; }

function SelectContent({ children }) { return children; }

function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

const categories = [
  { value: 'food', label: '🍔 Food & Dining' },
  { value: 'transport', label: '🚗 Transport' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'utilities', label: '💡 Utilities' },
  { value: 'healthcare', label: '🏥 Healthcare' },
  { value: 'shopping', label: '🛍️ Shopping' },
  { value: 'salary', label: '💼 Salary' },
  { value: 'freelance', label: '🔧 Freelance' },
  { value: 'investment', label: '📈 Investment' },
  { value: 'other', label: '📦 Other' },
];

export default function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'other'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    setIsSubmitting(true);
    await onAddTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    
    setFormData({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'other'
    });
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface backdrop-blur-sm bg-opacity-80 rounded-2xl p-8 shadow-xl border border-border/20 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent p-3 rounded-xl">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-text">Add Transaction</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-text">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="What was this transaction for?"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
               className="focus:border-accent focus:ring-accent rounded-xl h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold text-text">
              Amount
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                 className="pl-10 focus:border-accent focus:ring-accent rounded-xl h-12"
                required
              />
            </div>
            <p className="text-xs text-muted">
              Use positive numbers for income, negative for expenses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-text">
              Category
            </Label>
              <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
                <SelectTrigger className="rounded-xl h-12 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-semibold text-text">
              Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="pl-10 border-gray-200 focus:border-accent focus:ring-accent rounded-xl h-12"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !formData.description || !formData.amount}
          className="w-full bg-accent hover:brightness-90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding Transaction...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Transaction
            </div>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
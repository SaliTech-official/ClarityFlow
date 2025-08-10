# ClarityFlow

ClarityFlow is a clean and responsive personal finance tracker web application built with React and Tailwind CSS. It enables users to easily add, view, and manage their income and expenses with real-time balance updates and insightful visual charts. Data is stored locally to ensure persistence across sessions.

## Features

- Add income and expense transactions with description, amount, and optional date  
- View a detailed list of all transactions with clear color differentiation (green for income, red for expenses)  
- Delete any transaction easily  
- Display total balance, total income, and total expenses dynamically  
- Visualize income vs expenses with an interactive chart  
- Persistent data storage using localStorage  
- Fully responsive design optimized for desktop and mobile  
- Clean and modular codebase with React Hooks for state management  
- Styled elegantly using Tailwind CSS utility classes  
- **Dark Mode support** with smooth theme switching for a better user experience in all lighting conditions  

## Installation and Setup

To run ClarityFlow locally, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.  
2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```
3. Navigate to the project directory:
   ```bash
   cd expense-tracker
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm start
   ```
6. Open your browser and visit `http://localhost:3000` to see the app in action.

## State Management

The application uses React's built-in Hooks (`useState`) for managing the state in a simple and straightforward manner, making it easy to follow and maintain.

## Preview

![ClarityFlow Screenshot](/Preview/Preview1.png)

![ClarityFlow Screenshot](/Preview/Preview2.png)

![ClarityFlow Screenshot](/Preview/Preview3.png)

![ClarityFlow Screenshot](/Preview/Preview4.png)

![ClarityFlow Screenshot](/Preview/Preview5.png)

![ClarityFlow Screenshot](/Preview/Preview6.png)

## Future Updates

Exciting updates and new features are planned to enhance ClarityFlow's functionality and user experience.

## Technical Highlights

- LocalStorage is used to persist data between sessions without the need for a backend.  
- Interactive charts provide a clear visual representation of income and expenses.  
- Tailwind CSS ensures a clean, modern, and responsive UI.  
- **Dark Mode implementation** using Tailwind’s built-in dark variant for effortless theme toggling and consistent design across themes.  

---

Feel free to explore the code, contribute, or report any issues!

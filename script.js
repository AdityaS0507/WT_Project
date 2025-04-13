const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');
const expenseDescription = document.getElementById('expense-description');
const expenseCategory = document.getElementById('expense-category');
const expenseAmount = document.getElementById('expense-amount');
const transactionHistory = document.getElementById('transaction-history');

const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');

// Track totals
let totalIncome = 0;
let totalExpenses = 0;

function addIncome() {
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransactionToTable(description, 'Income', amount, 'Income');
    totalIncome += amount;
    updateSummary();
    incomeDescription.value = '';
    incomeAmount.value = '';
}

function addExpense() {
    const description = expenseDescription.value.trim();
    const category = expenseCategory.value;
    const amount = parseFloat(expenseAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransactionToTable(description, category, amount, 'Expense');
    totalExpenses += amount;
    updateSummary();
    expenseDescription.value = '';
    expenseAmount.value = '';
}

function addTransactionToTable(description, category, amount, type) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    row.querySelector('.delete-btn').addEventListener('click', () => {
        if (type === 'Income') {
            totalIncome -= amount;
        } else {
            totalExpenses -= amount;
        }
        row.remove();
        updateSummary();
    });

    transactionHistory.appendChild(row);
}

function updateSummary() {
    totalIncomeEl.textContent = totalIncome.toFixed(2);
    totalExpensesEl.textContent = totalExpenses.toFixed(2);
    balanceEl.textContent = (totalIncome - totalExpenses).toFixed(2);
}

function clearAll() {
    totalIncome = 0;
    totalExpenses = 0;
    transactionHistory.innerHTML = '';
    updateSummary();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}


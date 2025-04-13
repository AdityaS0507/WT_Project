const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');
const expenseDescription = document.getElementById('expense-description');
const expenseCategory = document.getElementById('expense-category');
const expenseAmount = document.getElementById('expense-amount');
const transactionHistory = document.getElementById('transaction-history');

const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');

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
    sendExpenseToServer(description, amount, "Income", "income");

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
    sendExpenseToServer(description, amount, category, "expense");
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

function sendExpenseToServer(description, amount, category, type) {
    fetch('save-expense.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            description: description,
            category: category,
            amount: amount,
            type: type
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Saved to database!");
        } else {
            console.error("Error saving:", data.error);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

function loadExpensesFromDB() {
    fetch('get-expenses.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                renderTransaction(item.description, item.category, parseFloat(item.amount), item.type);
            });
            updateSummary();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function renderTransaction(description, category, amount, type) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    row.querySelector('.delete-btn').addEventListener('click', function () {
        row.remove();
        updateSummary();
        // You can extend this to also delete from the DB if you want
    });

    document.getElementById('transaction-history').appendChild(row);
}

// Fetch expenses from DB when the page loads
window.addEventListener('DOMContentLoaded', () => {
    loadExpensesFromDB();
});

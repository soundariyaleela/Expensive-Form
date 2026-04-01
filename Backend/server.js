const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());
let expenses = [];//multiple data can be stored


app.post('/hello', (req, res) => {
    const { name, expense, amount } = req.body;
    
   
    if (!name || !expense || !amount) {
        return res.status(400).json({ 
            message: 'All fields are required!' 
        });
    }
    
    const newExpense = {
        name,
        expense,
        amount: parseFloat(amount).toFixed(2)
        
    };
    
    expenses.push(newExpense);
    

    res.json({ 
        message: `Expense added successfully! ${name} spent $${amount} on ${expense}` 
    });
    
    console.log('Current expenses:', expenses);
});


app.get('/expenses', (req, res) => {
    res.json(expenses);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
document.getElementById("myform").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const expense = document.getElementById("expense").value;
    const amount = document.getElementById("Amount").value;

    if (!name || !expense || !amount) {
        document.getElementById("result").innerHTML = 
            '<p class="error-message">Please fill all fields!</p>';
        return;
    }

    fetch("http://localhost:5000/hello", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            expense: expense,
            amount: amount
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerHTML = '';
        
        
        if (!document.querySelector('table')) {
            createTable();
        }
        
        addTableRow(name, expense, amount);
        
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<p class="success-message">${data.message}</p>`;
        document.getElementById("result").prepend(messageDiv);
        
        document.getElementById("myform").reset();
        document.getElementById("name").focus();
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("result").innerHTML = 
            '<p class="error-message">Failed to submit. Please try again.</p>';
    });
});

function createTable() {
    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Expense</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody id="tablebody">
            </tbody>
        </table>
    `;
    document.getElementById("result").innerHTML = tableHTML;
}

function addTableRow(name, expense, amount) {
    const tablebody = document.getElementById("tablebody");
    if (!tablebody) return;
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${expense}</td>
        <td>$${parseFloat(amount).toFixed(2)}</td>
    `;

    if (tablebody.firstChild) {
        tablebody.insertBefore(newRow, tablebody.firstChild);
    } else {
        tablebody.appendChild(newRow);
    }
}
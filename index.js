const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const fullName = "prafull_raj";
const dob = "03112002";
const email = "prafull_raj@srmap.edu.in";
const rollNumber = "AP21110011016";

function isNumber(s) {
    return !isNaN(s);
}

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    const numbers = data.filter(item => isNumber(item));
    const alphabets = data.filter(item => !isNumber(item) && /^[A-Za-z]$/.test(item));

    const highestAlphabet = alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).slice(-1)[0] || null;

    res.json({
        is_success: true,
        user_id: `${fullName}_${dob}`,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

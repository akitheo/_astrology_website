const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (HTML, CSS, JS) from the 'public' folder

// Add your existing HTML and other routes here...

app.post('/submitForm', (req, res) => {
    const formData = req.body;

    // Process and write data to Excel file using xlsx library
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([formData]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'User Data');
    xlsx.writeFile(workbook, 'user_data.xlsx');

    res.send('Form submitted successfully!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

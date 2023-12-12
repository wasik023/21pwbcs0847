const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(express.json());

// ReadFile Endpoint (GET /readFile)
app.get('/readFile/:fileName', async (req, res) => {
  const fileName = req.params.fileName;

  try {
    const content = await fs.readFile(fileName, 'utf-8');
    res.send(content);
  } catch (error) {
    res.status(404).send('File not found');
  }
});

// WriteFile Endpoint (POST /writeFile)
app.post('/writeFile/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const data = req.body.data;

  if (!data) {
    return res.status(400).send('Data not provided in the request body');
  }

  try {
    await fs.writeFile(fileName, data, 'utf-8');
    res.send('File written successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// UpdateFile Endpoint (PUT /updateFile)
app.put('/updateFile/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const newData = req.body.data;

  if (!newData) {
    return res.status(400).send('No new data provided in the request body');
  }

  try {
    // Append new data to the file on a new line
    await fs.appendFile(fileName, `\n${newData}`, 'utf-8');
    res.send('File updated successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port  http://localhost:${port}`);
});

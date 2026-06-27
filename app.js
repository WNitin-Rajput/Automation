const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

// 1. CREATE
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// 2. READ (All)
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// 3. READ (Single)
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.status(200).json(item);
});

// 4. UPDATE
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  item.name = name;
  res.status(200).json(item);
});

// 5. DELETE
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(itemIndex, 1);
  res.status(204).send(); // 204 No Content
});

module.exports = app;
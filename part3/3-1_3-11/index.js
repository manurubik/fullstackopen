// index.js
const express = require("express");
const app = express();
const PORT = 3001;

const persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const personsNum = persons.length;
  const date = new Date();

  const responseText = `
    <p>Phonebook has info for ${personsNum} people</p>
    <p>${date}</p>
  `;

  res.send(responseText);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

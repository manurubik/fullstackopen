import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [dataSearch, setDataSearch] = useState("");

  const handleName = (e) => {
    setNewName(e.target.value);
  };
  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearch = (e) => {
    setDataSearch(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const repeatedNames = persons.filter((person) => person.name === newName);

    if (repeatedNames.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newId = (persons.length + 1).toString;
      const newPerson = { name: newName, number: newNumber, id: newId };
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("There was an error adding the person:", error);
        });
    }
  };

  const searchResults = persons.filter((person) =>
    person.name.toLowerCase().includes(dataSearch.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Filter dataSearch={dataSearch} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={searchResults} />
    </>
  );
};

export default App;

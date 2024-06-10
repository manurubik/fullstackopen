import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [dataSearch, setDataSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState(true);

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
    const repeatedName = persons.find((person) => person.name === newName);

    if (repeatedName) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const matchingPerson = { ...repeatedName, number: newNumber };

        personService
          .update(repeatedName.id, matchingPerson)
          .then((match) => {
            setPersons(
              persons.map((person) => (person.id !== match.id ? person : match))
            );
            setNewName("");
            setNewNumber("");
            showNotification(`Updated ${match.name} number`);
          })
          .catch((error) => {
            console.error("There was an error updating the person:", error);
            setNotificationStyle(false);
            showNotification(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setNotificationStyle(true);
            }, 3000);
          });
      }
    } else {
      const newId = (persons.length + 1).toString();
      const newPerson = { name: newName, number: newNumber, id: newId };
      personService
        .create(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${person.name}`);
        })
        .catch((error) => {
          console.error("There was an error adding the person:", error);
        });
    }
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Remove ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("There was an error removing the person:", error);
        });
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const searchResults = persons.filter((person) =>
    person.name.toLowerCase().includes(dataSearch.toLowerCase())
  );

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification} styles={notificationStyle} />
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
      <Persons persons={searchResults} onRemove={removePerson} />
    </>
  );
};

export default App;

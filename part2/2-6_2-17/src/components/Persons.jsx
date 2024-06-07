import Person from "./Person";

const Persons = ({ persons, onRemove }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} removePerson={onRemove} />
      ))}
    </ul>
  );
};

export default Persons;

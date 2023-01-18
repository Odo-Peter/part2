import { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';
import PhoneService from './components/services/phonebookService';
import Notification from './components/notification';
import Error from './components/error';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    PhoneService.getAll().then((initialContact) => setPersons(initialContact));
  }, []);

  const addContact = (e) => {
    e.preventDefault();
    const phonebookObject = {
      name: newName,
      number: newNumber,
    };

    const repeaterCheck =
      persons.map((person) => person.name).indexOf(newName) > -1;

    if (repeaterCheck) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      const id = persons
        .map((p) => (p.name === newName ? p.id : ''))
        .filter((c) => c !== '')[0];

      const changedContactNumber = {
        ...phonebookObject,
        number: phonebookObject.number,
      };

      if (confirmed) {
        PhoneService.update(id, changedContactNumber)
          .then((returnedContact) => {
            setPersons(persons.map((p) => (p.id === id ? returnedContact : p)));
          })
          .catch((err) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
          });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } else {
      PhoneService.create(phonebookObject).then((addContact) =>
        setPersons(persons.concat(addContact))
      );
      setSuccess(`Added ${newName}`);
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    }

    setNewName('');
    setNewNumber('');
  };

  const handleFilter = (e) => {
    setFilterName(e.target.value);
  };

  const handleInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const deleteContact = (e) => {
    const id = parseInt(e.target.id);
    const clickedOn = persons.filter((p) => p.id === id);

    const confirmed = window.confirm(`Delete ${clickedOn[0].name}`);

    if (confirmed) {
      PhoneService.toBeDeleted(id);
      setPersons(persons.filter((person) => person.id !== id));
    } else {
      setPersons(persons);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      {success !== '' ? <Notification message={success} /> : success}

      {errorMessage !== '' ? <Error message={errorMessage} /> : errorMessage}

      <Filter filterName={filterName} handleFilter={handleFilter} />

      <PersonForm
        newName={newName}
        handleInput={handleInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
        addContact={addContact}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterName={filterName}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;

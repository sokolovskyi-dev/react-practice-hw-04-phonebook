import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';

// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

export const App = () => {
  const initialContacts = [
    { id: 1, name: 'Rosie Simpson', number: '645-17-49' },
    { id: 2, name: 'Hermonie Kline', number: '555-22-41' },
    { id: 3, name: 'Eden Clements', number: '555-13-94' },
    { id: 4, name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('contacts'));
    return saved?.length ? saved : initialContacts;
  });
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (savedContacts && savedContacts.length) {
  //     setContacts(savedContacts);
  //   }
  // }, []);

  // componentDidMount = () => {
  //   const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (savedContacts.length) {
  //     this.setState({ contacts: savedContacts });
  //   }
  // };

  // componentDidUpdate(_, prevState) {
  //   if (prevState.contacts.length !== this.state.contacts.length) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    const normalizedNewName = name.toLowerCase().trim();
    const isDuplicate = contacts.some(
      ({ name }) => name.toLowerCase().trim() === normalizedNewName
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prev => [...prev, { id: nanoid(), name, number }]);
  };

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const filterValue = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(filterValue));
  };

  const deleteContact = deleteId => {
    const newContactList = contacts.filter(({ id }) => id !== deleteId);
    setContacts(newContactList);
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />

      <h2>Contacts</h2>

      <Filter handleChange={handleChange} filter={filter} />

      <ContactList filteredContacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

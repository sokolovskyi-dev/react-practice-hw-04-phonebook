// import { Component } from 'react';
import { useState } from 'react';
import { IoMdContacts } from 'react-icons/io';

import { Form } from './ContactForm.styled';

export const ContactForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // state = { name: '', number: '' };

  const handleChange = e => {
    const { name, value } = e.target;
    // this.setState({ [name]: value });

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    // const { name, number } = this.state;
    handleSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  // const { name, number } = this.state;

  return (
    <Form onSubmit={onSubmit}>
      <IoMdContacts className="main-icon" />
      <label>
        <div>Name</div>
        <input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoComplete="off"
        />
      </label>

      <label>
        <div>Number</div>
        <input
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          placeholder="Enter number XXX-XX-XX"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
        />
      </label>

      <button type="submit">Add contact</button>
    </Form>
  );
};

import React, { useState } from 'react';
import { useAddContact } from '../mutation/useAddContact';
import { useNavigate } from 'react-router-dom';
import './AddContactForm.css';  

export default function AddContactForm() {
  const { handleAddContact } = useAddContact(); 
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phones, setPhones] = useState<Array<{ number: string }>>([]);

  const navigate = useNavigate();

  const numericRegex = /^[0-9]*$/;
  const alphanumericRegex = /^[a-zA-Z0-9]*$/;

  const handlePhoneAdd = () => {
    if (phone) {
      if (phone.match(numericRegex))
      {
        setPhones([...phones, { number: phone }]);
        setPhone('');
      } else {
        alert("Phone number should contain only number!")
      }
    }
  };

  const HandleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || phones.length === 0) {
      alert("Please fill in all the contact info!");
      return;
    }

    if (!firstName.match(alphanumericRegex) || !lastName.match(alphanumericRegex)) {
      alert('First Name and Last Name should contain only letters and numbers.');
      return;
    }
    
    try {
      // Call the handleAddContact function to add the contact
      const result = await handleAddContact(firstName, lastName, phones);

      // Handle the result, e.g., show a success message or reset the form
      console.log('Contact added:', result);
      
      // Reset the form
      setFirstName('');
      setLastName('');
      setPhones([]);

      navigate("/");

    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error('Error adding contact:', error);

      alert("Please enter another phone number!");

      setFirstName('');
      setLastName('');
      setPhones([]);
    }
};

return (
  <div className="add-contact-container">
    <h2>Add New Contact</h2>
    <form className="add-contact-form" onSubmit={HandleFormSubmit}>
      <label>
        First Name:
        <input
          className="input-field"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          className="input-field"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />
      <label className="phone-input">
        Phone Number:
        <input
          className="input-field"
          type="text"
          value={phone}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.match(numericRegex) || inputValue === '') {
              setPhone(inputValue);
            }
          }}
        />
        <button type="button" className="add-phone-button" onClick={handlePhoneAdd}>
          +
        </button>
      </label>
      <ul className='list-number'>
        {phones.map((p, index) => (
          <li key={index}>{p.number}</li>
        ))}
      </ul>
      <button type="submit" className="submit-button">Add Contact</button>
    </form>

    <div className="go-back-button">
      <button onClick={() => navigate("/")}>Go back</button>
    </div>
  </div>
);
}

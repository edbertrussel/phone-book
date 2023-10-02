import React, { useEffect, useState } from 'react';
import { useContactList } from "../hooks/useContactList";
import './ContactListPage.css'; 
import { useDeleteContact } from '../mutation/useDeleteContact';
import { Link, useNavigate } from 'react-router-dom';

interface Contact {
  id: number | undefined;
  first_name: string;
  last_name: string;
  phones: Array<{ number: string }>;
  isFavorite: boolean;
}

export default function ContactListPage() {
    
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const {error, loading, data} = useContactList();

    const navigate = useNavigate();

    useEffect(() => {
      if (data) {
        setContacts(data.contact);
        console.log('Updated Contacts Data:', data.contact);
      }
    }, [data]);

    const handlePageChange = (page: React.SetStateAction<number>) => {
      setCurrentPage(page);
  };

    const filteredContacts = contacts.filter((contact) => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const toggleFavorite = (id: number | undefined) => {
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === id) {
          return { ...contact, isFavorite: !contact.isFavorite };
        }
        return contact;
      });
      setContacts(updatedContacts);
    };
    
    const sortedContacts = [
      ...filteredContacts.filter((contact) => contact.isFavorite),
      ...filteredContacts.filter((contact) => !contact.isFavorite),
    ];

    const { handleDelete } = useDeleteContact();

    const recordsPerPage = 10;
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    const records = sortedContacts.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(contacts.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1);

    return (
      <div className="contact-list-page">
        <div className='search-button-container'>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search By Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="add-contact-button">
            <button onClick={() => navigate(`/add-contact`)}>Add Contacts</button>
          </div>
        
        </div>

        {error && (
          <div className="error-message">
            Error: {error.message}
          </div>
        )}
  
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Numbers</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>
                  <ul>
                    {contact.phones.map((phone, phoneIndex) => (
                      <li key={phoneIndex}>{phone.number}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button onClick={() => toggleFavorite(contact.id)}>
                    {contact.isFavorite ? 'Unfavorite' : 'Favorite'}
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/${contact.id}`)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="pagination">
          {numbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useContactList } from "../hooks/useContactList";
import './css/ContactListPage.css'; 
import { useDeleteContact } from '../mutation/useDeleteContact';
import { useNavigate } from 'react-router-dom';

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
    const {error, data} = useContactList();

    const navigate = useNavigate();

    //retrieve and set the data from the graphql
    useEffect(() => {
      if (data) {
        setContacts(data.contact);
        console.log('Updated Contacts Data:', data.contact);
      }
    }, [data]);

    //keep track the page number
    const handlePageChange = (page: React.SetStateAction<number>) => {
      setCurrentPage(page);
  };

    //return the contacts based on the search keyword
    const filteredContacts = contacts.filter((contact) => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    //keep track and set the favorite contacts
    const toggleFavorite = (id: number | undefined) => {
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === id) {
          return { ...contact, isFavorite: !contact.isFavorite };
        }
        return contact;
      });
      setContacts(updatedContacts);
    };
    
    //display the favorite contacts on top
    const sortedContacts = [
      ...filteredContacts.filter((contact) => contact.isFavorite),
      ...filteredContacts.filter((contact) => !contact.isFavorite),
    ];

    const { handleDelete } = useDeleteContact();

    //pagination logic
    const recordsPerPage = 10;
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    const records = sortedContacts.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(contacts.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1);

    return (
      <div className="page-wrapper">
        <div className='container-large'>
          <div className='padding-global'>
            <div className='header-section'>
              <h1>PhoneBook</h1>
            </div>
          </div>

          <div className='searchButton-section'>
            <div className='padding-global'>
              <div className='searchButton-container'>
                <div className='searchBar'>
                  <input
                    type="text"
                    placeholder="Search By Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="addContact-button">
                  <button onClick={() => navigate(`/add-contact`)}>Add Contacts</button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message">
              Error: {error.message}
            </div>
          )}

          <div className='contactTable-section'>
            <div className='padding-global'>
              <div className='contactList-container'>
                <table className="contactList-table">
                  <thead>
                    <tr>
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
                          <button className='edit-button' onClick={() => navigate(`/${contact.id}`)}>Edit</button>
                        </td>
                        <td>
                          <button className='delete-button' onClick={() => handleDelete(contact.id)}>Delete</button>
                        </td>
                        <td>
                          <button className='favorite-button' onClick={() => toggleFavorite(contact.id)}>
                            {contact.isFavorite ? '★' : '☆'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='padding-global'>
            <div className='pagination-container'>
              <div className="pagination">
                {numbers.map((number) => (
                <button key={number}
                  onClick={() => handlePageChange(number)}
                  className={number === currentPage ? "active" : ""}> {number}
                </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

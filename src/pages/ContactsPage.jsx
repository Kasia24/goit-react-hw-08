import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { fetchContacts } from "../api/api";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await fetchContacts();
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts");
      }
    };

    loadContacts();
  }, []);

  const handleContactAdded = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  return (
    <div>
      <h1>My Contacts</h1>
      <ContactForm onContactAdded={handleContactAdded} />
      <ContactList contacts={contacts} />
    </div>
  );
};

export default ContactsPage;

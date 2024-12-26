import React, { useEffect, useState } from "react";
import { fetchContacts, deleteContact } from "../api/api";
import Fuse from "fuse.js";
import toast from "react-hot-toast";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Fetch contacts on component mount
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await fetchContacts();
        setContacts(response.data);
        setFilteredContacts(response.data); // Initialize filtered contacts
      } catch (error) {
        toast.error("Failed to fetch contacts.");
      }
    };

    getContacts();
  }, []);

  // Fuse.js for contact search
  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(contacts, {
        keys: ["name", "number"], // Search by name or phone number
        threshold: 0.3, // Match accuracy
      });
      const result = fuse.search(searchTerm).map(({ item }) => item);
      setFilteredContacts(result);
    } else {
      setFilteredContacts(contacts); // Reset to full contact list
    }
  }, [searchTerm, contacts]);

  // Handle contact deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter((contact) => contact.id !== id));
        toast.success("Contact deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete contact.");
      }
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredContacts.map((contact) => (
          <ListItem
            key={contact.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(contact.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={contact.name} secondary={contact.number} />
          </ListItem>
        ))}
      </List>
      {filteredContacts.length === 0 && <p>No contacts found.</p>}
    </div>
  );
};

export default ContactList;

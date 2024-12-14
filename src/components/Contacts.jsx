import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchContacts,
  deleteContact,
  addContact,
  updateContact,
} from "../redux/contactsSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import Fuse from "fuse.js";

// Filtrowanie z Fuse.js
const filterContacts = (contacts, query) => {
  const fuse = new Fuse(contacts, {
    keys: ["name", "phone"],
    threshold: 0.3, // Wartość dopasowania
  });
  return fuse.search(query).map((result) => result.item);
};

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pobranie kontaktów z Redux Store
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  const { token } = useSelector((state) => state.auth);

  // Stan do wyszukiwania
  const [searchQuery, setSearchQuery] = useState("");

  // Formik - walidacja i początkowe wartości
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
  });

  // Obsługa formularza dodawania/edycji kontaktu
  const handleAddEditSubmit = async (values, { setSubmitting }) => {
    try {
      if (values.id) {
        // Edytowanie kontaktu
        await dispatch(
          updateContact({ id: values.id, contact: values, token })
        );
        toast.success("Contact updated successfully");
      } else {
        // Dodawanie nowego kontaktu
        await dispatch(addContact({ contact: values, token }));
        toast.success("Contact added successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Usuwanie kontaktu
  const handleDeleteContact = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirmed) {
      dispatch(deleteContact({ id, token }));
      toast.success("Contact deleted successfully");
    }
  };

  // Ładowanie kontaktów
  useEffect(() => {
    if (token) {
      dispatch(fetchContacts(token));
    } else {
      navigate("/login");
    }
  }, [dispatch, token, navigate]);

  // Filtrowanie kontaktów na podstawie wyszukiwania
  const filteredContacts = searchQuery
    ? filterContacts(contacts, searchQuery)
    : contacts;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Contacts</h1>

      {/* Formularz dodawania/edycji kontaktu */}
      <Formik
        initialValues={{ name: "", phone: "", id: "" }} // domyślne wartości
        validationSchema={validationSchema}
        onSubmit={handleAddEditSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter contact's name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Field
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter contact's phone"
              />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Contact"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Wyszukiwanie */}
      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Lista kontaktów */}
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
            <button
              onClick={() => {
                // Wypełnianie formularza do edycji kontaktu
                document.getElementById("name").value = contact.name;
                document.getElementById("phone").value = contact.phone;
                document.getElementById("id").value = contact.id;
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
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

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  const { token } = useSelector((state) => state.auth);

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [editContact, setEditContact] = useState(null); // Current contact being edited

  // Fetch contacts on component mount
  useEffect(() => {
    if (token) {
      dispatch(fetchContacts(token));
    } else {
      navigate("/login");
    }
  }, [dispatch, token, navigate]);

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
  });

  // Handle form submit for adding or editing
  const handleAddEditSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (values.id) {
        await dispatch(
          updateContact({ id: values.id, contact: values, token })
        );
        toast.success("Contact updated successfully");
      } else {
        await dispatch(addContact({ contact: values, token }));
        toast.success("Contact added successfully");
      }
      setEditContact(null); // Clear edit state
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle contact deletion
  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await dispatch(deleteContact({ id, token }));
        toast.success("Contact deleted successfully");
      } catch (error) {
        toast.error("Failed to delete contact");
      }
    }
  };

  // Fuzzy search
  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    const fuse = new Fuse(contacts, {
      keys: ["name", "phone"],
      threshold: 0.3,
    });
    return fuse.search(searchQuery).map((result) => result.item);
  }, [contacts, searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Contacts</h1>

      {/* Form for adding or editing contacts */}
      <Formik
        initialValues={{
          name: editContact?.name || "",
          phone: editContact?.phone || "",
          id: editContact?.id || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddEditSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" placeholder="Enter contact's name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Field
                id="phone"
                name="phone"
                placeholder="Enter contact's phone"
              />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : editContact
                    ? "Update Contact"
                    : "Add Contact"}
              </button>
              {editContact && (
                <button type="button" onClick={() => setEditContact(null)}>
                  Cancel Edit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Contacts list */}
      <ul>
        {filteredContacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          filteredContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.phone}
              <button onClick={() => handleDeleteContact(contact.id)}>
                Delete
              </button>
              <button onClick={() => setEditContact(contact)}>Edit</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Contacts;

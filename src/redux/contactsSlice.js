import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = "https://connections-api.goit.global/contacts";

// Inicjalny stan
const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

// Thunki asynchroniczne do obsługi API

// Pobieranie kontaktów
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (token) => {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Dodawanie kontaktu
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ contact, token }) => {
    const response = await axios.post(API_URL, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Usuwanie kontaktu
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async ({ id, token }) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id; // zwracamy ID, aby usunąć kontakt w reducerze
  }
);

// Aktualizowanie kontaktu
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, contact, token }) => {
    const response = await axios.patch(`${API_URL}/${id}`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Slice
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // W przypadku synchronizacji stanów (np. filtrowanie kontaktów)
    filterContacts(state, action) {
      state.contacts = state.contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          contact.phone.includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch kontakty
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Dodaj kontakt
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Usuń kontakt
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Aktualizowanie kontaktu
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Eksportowanie akcji
export const { filterContacts } = contactsSlice.actions;

// Eksportowanie reducerów
export default contactsSlice.reducer;

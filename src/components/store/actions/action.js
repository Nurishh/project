
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const signUp = createAsyncThunk(
  "auth/createUser",
  async function (userData, { rejectWithValue }) {
    try {
      const { data } = await axios.get(`${BASE_URL}/users`);
      const finded = data.find(
        (item) =>
          item.email === userData.email && item.password === userData.password
      );

      if (finded) {
        alert("Такой пользователь уже существует");
        throw new Error("Такой пользователь уже существует");
      }

      const createdUser = await axios.post(`${BASE_URL}/users`, userData);
      localStorage.setItem("user-data", JSON.stringify(createdUser.data));
      return createdUser.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

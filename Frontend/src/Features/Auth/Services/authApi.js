import axios from "axios";

// ✅ Create reusable axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// ================= REGISTER =================
export async function register({ username, email, password }) {
  try {
    const { data } = await API.post("/auth/register", {
      username,
      email,
      password,
    });
    return data;
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    throw err;
  }
}

// ================= LOGIN =================
export async function login({ email, password }) {
  try {
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
}

// ================= LOGOUT =================
export async function logout() {
  try {
    const { data } = await API.get("/auth/logout");
    return data;
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err;
  }
}

// ================= GET USER =================
export async function getMe() {
  try {
    const { data } = await API.get("/auth/get-me");
    return data;
  } catch (err) {
    console.error("GetMe error:", err.response?.data || err.message);
    throw err;
  }
}
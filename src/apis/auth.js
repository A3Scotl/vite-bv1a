import { jwtDecode } from "jwt-decode"; 

const API_BASE_URL = "http://localhost:8080/api/auth";

export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      const decodedToken = jwtDecode(data.data.token);
      const role = decodedToken.role; 
      return {
        success: true,
        data: {
          user: { email, roles: [role] },
          token: data.data.token,
        },
      };
    } else {
      return { success: false, message: data.error || "Invalid email or password" };
    }
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: "Logout failed" };
    }
  } catch (error) {
    console.error("Logout API error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function fetchUserData(token) {
  try {
    const decodedToken = jwtDecode(token);
    const email = decodedToken.sub; 
    const role = decodedToken.role; 
    return {
      success: true,
      data: { email, roles: [role] },
    };
  } catch (error) {
    console.error("Fetch user data error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
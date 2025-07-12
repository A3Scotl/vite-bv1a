// Hàm giả lập (mock) cho các cuộc gọi API
// Khi có backend Spring, bạn sẽ thay thế logic này bằng các cuộc gọi fetch/axios thực tế

const MOCK_USERS = {
  admin: { username: "admin", roles: ["ROLE_ADMIN", "ROLE_EDITOR"], email: "admin@example.com" },
  editor: { username: "editor", roles: ["ROLE_EDITOR"], email: "editor@example.com" },
  user: { username: "user", roles: ["ROLE_USER"], email: "user@example.com" },
}

export async function login(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (MOCK_USERS[username] && password === "password") {
        // Giả lập mật khẩu là "password"
        const user = MOCK_USERS[username]
        const token = `mock-jwt-token-for-${username}`
        resolve({ success: true, data: { user, token } })
      } else {
        resolve({ success: false, message: "Invalid username or password" })
      }
    }, 500) // Giả lập độ trễ mạng
  })
}

export async function logout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 200)
  })
}

// Ví dụ về một hàm API khác (có thể mở rộng sau này)
export async function fetchUserData(token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (token && token.startsWith("mock-jwt-token-for-")) {
        const username = token.replace("mock-jwt-token-for-", "")
        if (MOCK_USERS[username]) {
          resolve({ success: true, data: MOCK_USERS[username] })
        } else {
          resolve({ success: false, message: "User not found" })
        }
      } else {
        resolve({ success: false, message: "Invalid token" })
      }
    }, 300)
  })
}

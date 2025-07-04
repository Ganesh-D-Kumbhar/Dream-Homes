import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        toast.success("Login successful!")
        return true
      } else {
        toast.error("Invalid credentials")
        return false
      }
    } catch (error) {
      toast.error("Login failed")
      return false
    }
  }

  const signup = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const existingUser = users.find((u) => u.email === userData.email)

      if (existingUser) {
        toast.error("User already exists")
        return false
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      toast.success("Account created successfully!")
      return true
    } catch (error) {
      toast.error("Signup failed")
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
  }

  const updateProfile = (userData) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData }
        localStorage.setItem("users", JSON.stringify(users))
      }

      toast.success("Profile updated successfully!")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

import { createContext, useContext, useState, useEffect } from "react"
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const existingUser = users.find((u) => u.email === userData.email)

      if (existingUser) {
        return false
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        profilePic: null,
        preferences: {
          propertyType: [],
          priceRange: { min: 0, max: 10000000 },
          location: [],
        },
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
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

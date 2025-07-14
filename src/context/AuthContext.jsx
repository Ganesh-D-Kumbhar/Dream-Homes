import { createContext, useContext, useState, useEffect } from "react"
import apiService from "../lib/api.js"

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
      const response = await apiService.loginUser(email, password)

      if (response.success) {
        const userData = response.data
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(userData))
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
      const response = await apiService.registerUser(userData)

      if (response.success) {
        const newUser = response.data
        setUser(newUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(newUser))
        return true
      } else {
        return false
      }
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

  const updateProfile = async (userData) => {
    if (user) {
      try {
        const response = await apiService.updateUserProfile(user._id, userData)

        if (response.success) {
          const updatedUser = response.data
          setUser(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser))
          return true
        }
        return false
      } catch (error) {
        console.error("Update profile error:", error)

        // Fallback to local update for profile pic and other non-critical updates
        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return true
      }
    }
    return false
  }

  const updatePassword = async (currentPassword, newPassword) => {
    if (user) {
      try {
        const response = await apiService.updateUserPassword(user._id, {
          currentPassword,
          newPassword,
        })

        return response.success
      } catch (error) {
        console.error("Update password error:", error)
        return false
      }
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        updatePassword,
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

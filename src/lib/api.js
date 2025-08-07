// // const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api"
// const API_BASE_URL = "https://dream-homes-backend.onrender.com/api"

// class ApiService {
//   constructor() {
//     this.baseURL = API_BASE_URL
//     this.adminToken = localStorage.getItem("adminAuth") === "true" ? "admin-authenticated" : null
//   }

//   // Helper method for making requests
//   async makeRequest(url, options = {}) {
//     try {
//       const headers = {
//         "Content-Type": "application/json",
//         ...options.headers,
//       }

//       // Add admin auth header if available
//       if (this.adminToken && url.includes("/admin/")) {
//         headers.Authorization = `Bearer ${this.adminToken}`
//       }

//       const response = await fetch(`${this.baseURL}${url}`, {
//         headers,
//         ...options,
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Request failed")
//       }

//       return data
//     } catch (error) {
//       console.error(`API Error (${url}):`, error)
//       throw error
//     }
//   }

//   // Helper method for form data requests
//   async makeFormRequest(url, formData, options = {}) {
//     try {
//       const headers = {}

//       // Add admin auth header if available
//       if (this.adminToken && url.includes("/admin/")) {
//         headers.Authorization = `Bearer ${this.adminToken}`
//       }

//       const response = await fetch(`${this.baseURL}${url}`, {
//         method: "POST",
//         body: formData,
//         headers,
//         ...options,
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Request failed")
//       }

//       return data
//     } catch (error) {
//       console.error(`API Error (${url}):`, error)
//       throw error
//     }
//   }

//   // User Authentication Methods
//   async registerUser(userData) {
//     return this.makeRequest("/users/register", {
//       method: "POST",
//       body: JSON.stringify(userData),
//     })
//   }

//   async loginUser(email, password) {
//     return this.makeRequest("/users/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//     })
//   }

//   async updateUserProfile(userId, userData) {
//     return this.makeRequest(`/users/profile/${userId}`, {
//       method: "PUT",
//       body: JSON.stringify(userData),
//     })
//   }

//   async updateUserPassword(userId, passwordData) {
//     return this.makeRequest(`/users/password/${userId}`, {
//       method: "PUT",
//       body: JSON.stringify(passwordData),
//     })
//   }

//   async getUserProfile(userId) {
//     return this.makeRequest(`/users/profile/${userId}`)
//   }

//   // Public API methods
//   async getProperties(params = {}) {
//     const queryString = new URLSearchParams(params).toString()
//     const url = `/properties${queryString ? `?${queryString}` : ""}`
//     return this.makeRequest(url)
//   }

//   async deletePropertyImage(propertyId, imageUrl) {
//     return this.makeRequest(`/admin/properties/${propertyId}/image`, {
//       method: "DELETE",
//       body: JSON.stringify({ imageUrl }),
//     })
//   }

//   async getProperty(id) {
//     return this.makeRequest(`/properties/${id}`)
//   }

//   async searchProperties(query, params = {}) {
//     const queryString = new URLSearchParams(params).toString()
//     const url = `/properties/search/${encodeURIComponent(query)}${queryString ? `?${queryString}` : ""}`
//     return this.makeRequest(url)
//   }

//   // Inquiry methods
//   async submitInquiry(inquiryData) {
//     return this.makeRequest("/inquiries", {
//       method: "POST",
//       body: JSON.stringify(inquiryData),
//     })
//   }

//   // Admin API methods
//   async adminLogin(password) {
//     const response = await this.makeRequest("/admin/login", {
//       method: "POST",
//       body: JSON.stringify({ password }),
//     })

//     if (response.success) {
//       this.adminToken = "admin-authenticated"
//       localStorage.setItem("adminAuth", "true")
//     }

//     return response
//   }

//   async getAdminStats() {
//     return this.makeRequest("/admin/stats")
//   }

//   async getAdminProperties(params = {}) {
//     const queryString = new URLSearchParams(params).toString()
//     const url = `/admin/properties${queryString ? `?${queryString}` : ""}`
//     return this.makeRequest(url)
//   }

//   async createProperty(propertyData, images = []) {
//     const formData = new FormData()
//     formData.append("propertyData", JSON.stringify(propertyData))

//     images.forEach((image) => {
//       formData.append("images", image)
//     })

//     return this.makeFormRequest("/admin/properties", formData)
//   }

//   async updateProperty(id, propertyData, images = []) {
//     const formData = new FormData()
//     formData.append("propertyData", JSON.stringify(propertyData))

//     images.forEach((image) => {
//       formData.append("images", image)
//     })

//     return this.makeFormRequest(`/admin/properties/${id}`, formData, {
//       method: "PUT",
//     })
//   }

//   async deleteProperty(id) {
//     return this.makeRequest(`/admin/properties/${id}`, {
//       method: "DELETE",
//     })
//   }

//   async uploadImage(imageFile) {
//     const formData = new FormData()
//     formData.append("image", imageFile)
//     return this.makeFormRequest("/upload", formData)
//   }

//   async getInquiries(params = {}) {
//     const queryString = new URLSearchParams(params).toString()
//     const url = `/admin/inquiries${queryString ? `?${queryString}` : ""}`
//     return this.makeRequest(url)
//   }

//   async updateInquiry(id, updateData) {
//     return this.makeRequest(`/admin/inquiries/${id}`, {
//       method: "PATCH",
//       body: JSON.stringify(updateData),
//     })
//   }

//   // Health check
//   async healthCheck() {
//     return this.makeRequest("/health")
//   }

//   // Logout admin
//   adminLogout() {
//     this.adminToken = null
//     localStorage.removeItem("adminAuth")
//   }
// }

// export default new ApiService()














// Add these new API methods to your existing api.js file

// const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api"
const API_BASE_URL = "https://dream-homes-backend.onrender.com/api"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.adminToken = localStorage.getItem("adminAuth") === "true" ? "admin-authenticated" : null
  }

  // Helper method for making requests
  async makeRequest(url, options = {}) {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      }

      // Add admin auth header if available
      if (this.adminToken && url.includes("/admin/")) {
        headers.Authorization = `Bearer ${this.adminToken}`
      }

      const response = await fetch(`${this.baseURL}${url}`, {
        headers,
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Request failed")
      }

      return data
    } catch (error) {
      console.error(`API Error (${url}):`, error)
      throw error
    }
  }

  // Helper method for form data requests
  async makeFormRequest(url, formData, options = {}) {
    try {
      const headers = {}

      // Add admin auth header if available
      if (this.adminToken && url.includes("/admin/")) {
        headers.Authorization = `Bearer ${this.adminToken}`
      }

      const response = await fetch(`${this.baseURL}${url}`, {
        method: "POST",
        body: formData,
        headers,
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Request failed")
      }

      return data
    } catch (error) {
      console.error(`API Error (${url}):`, error)
      throw error
    }
  }

  // User Authentication Methods
  async registerUser(userData) {
    return this.makeRequest("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async loginUser(email, password) {
    return this.makeRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async updateUserProfile(userId, userData) {
    return this.makeRequest(`/users/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async updateUserPassword(userId, passwordData) {
    return this.makeRequest(`/users/password/${userId}`, {
      method: "PUT",
      body: JSON.stringify(passwordData),
    })
  }

  async getUserProfile(userId) {
    return this.makeRequest(`/users/profile/${userId}`)
  }

  // User Liked Properties Methods
  async getUserLikedProperties(userId) {
    return this.makeRequest(`/users/liked-properties/${userId}`)
  }

  async addLikedProperty(userId, propertyId) {
    return this.makeRequest(`/users/liked-properties/${userId}`, {
      method: "POST",
      body: JSON.stringify({ propertyId }),
    })
  }

  async removeLikedProperty(userId, propertyId) {
    return this.makeRequest(`/users/liked-properties/${userId}/${propertyId}`, {
      method: "DELETE",
    })
  }

  async togglePropertyLike(userId, propertyId) {
    return this.makeRequest(`/users/toggle-like/${userId}`, {
      method: "POST",
      body: JSON.stringify({ propertyId }),
    })
  }

  // Public API methods
  async getProperties(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/properties${queryString ? `?${queryString}` : ""}`
    return this.makeRequest(url)
  }

  async deletePropertyImage(propertyId, imageUrl) {
    return this.makeRequest(`/admin/properties/${propertyId}/image`, {
      method: "DELETE",
      body: JSON.stringify({ imageUrl }),
    })
  }

  async getProperty(id) {
    return this.makeRequest(`/properties/${id}`)
  }

  async searchProperties(query, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/properties/search/${encodeURIComponent(query)}${queryString ? `?${queryString}` : ""}`
    return this.makeRequest(url)
  }

  // Inquiry methods
  async submitInquiry(inquiryData) {
    return this.makeRequest("/inquiries", {
      method: "POST",
      body: JSON.stringify(inquiryData),
    })
  }

  // Admin API methods
  async adminLogin(password) {
    const response = await this.makeRequest("/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    })

    if (response.success) {
      this.adminToken = "admin-authenticated"
      localStorage.setItem("adminAuth", "true")
    }

    return response
  }

  async getAdminStats() {
    return this.makeRequest("/admin/stats")
  }

  async getAdminProperties(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/admin/properties${queryString ? `?${queryString}` : ""}`
    return this.makeRequest(url)
  }

  async createProperty(propertyData, images = []) {
    const formData = new FormData()
    formData.append("propertyData", JSON.stringify(propertyData))

    images.forEach((image) => {
      formData.append("images", image)
    })

    return this.makeFormRequest("/admin/properties", formData)
  }

  async updateProperty(id, propertyData, images = []) {
    const formData = new FormData()
    formData.append("propertyData", JSON.stringify(propertyData))

    images.forEach((image) => {
      formData.append("images", image)
    })

    return this.makeFormRequest(`/admin/properties/${id}`, formData, {
      method: "PUT",
    })
  }

  async deleteProperty(id) {
    return this.makeRequest(`/admin/properties/${id}`, {
      method: "DELETE",
    })
  }

  async uploadImage(imageFile) {
    const formData = new FormData()
    formData.append("image", imageFile)
    return this.makeFormRequest("/upload", formData)
  }

  async getInquiries(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/admin/inquiries${queryString ? `?${queryString}` : ""}`
    return this.makeRequest(url)
  }

  async updateInquiry(id, updateData) {
    return this.makeRequest(`/admin/inquiries/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    })
  }

  // Health check
  async healthCheck() {
    return this.makeRequest("/health")
  }

  // Logout admin
  adminLogout() {
    this.adminToken = null
    localStorage.removeItem("adminAuth")
  }
}

export default new ApiService()

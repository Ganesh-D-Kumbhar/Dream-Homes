// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"
const API_BASE_URL = "http://localhost:5000/api" || "http://localhost:5000/api"

class ApiService {
  // Helper method for making requests
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
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
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        body: formData,
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

  // Public API methods
  async getProperties() {
    return this.makeRequest("/properties")
  }

  async getProperty(id) {
    return this.makeRequest(`/properties/${id}`)
  }

  // Admin API methods
  async adminLogin(password) {
    return this.makeRequest("/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    })
  }

  async getAdminStats() {
    return this.makeRequest("/admin/stats")
  }

  async createProperty(propertyData, images = []) {
    const formData = new FormData()
    formData.append("propertyData", JSON.stringify(propertyData))

    images.forEach((image, index) => {
      formData.append("images", image)
    })

    return this.makeFormRequest("/admin/properties", formData)
  }

  async updateProperty(id, propertyData, images = []) {
    const formData = new FormData()
    formData.append("propertyData", JSON.stringify(propertyData))

    images.forEach((image, index) => {
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

  // Health check
  async healthCheck() {
    return this.makeRequest("/health")
  }
}

export default new ApiService()

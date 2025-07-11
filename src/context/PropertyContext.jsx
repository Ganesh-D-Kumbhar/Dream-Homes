import { createContext, useContext, useState, useEffect } from "react"
import { propertiesData } from "../data/globalData.js"
import toast from "react-hot-toast"
import apiService from "../lib/api.js"

const PropertyContext = createContext(undefined)

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(propertiesData) // Start with global data
  const [apiProperties, setApiProperties] = useState([])
  const [likedProperties, setLikedProperties] = useState([])
  const [isLoadingApi, setIsLoadingApi] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Load API properties on mount (after initial render with global data)
  useEffect(() => {
    // Small delay to ensure global data is shown first
    const timer = setTimeout(() => {
      loadApiProperties()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Load liked properties from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.id) {
      const liked = JSON.parse(localStorage.getItem(`liked_${user.id}`) || "[]")
      setLikedProperties(liked)
    }
  }, [])

  const loadApiProperties = async () => {
    try {
      setIsLoadingApi(true)
      const response = await apiService.getProperties()
      if (response.success) {
        setApiProperties(response.data)
        console.log(`✅ Loaded ${response.data.length} properties from API`)
      }
    } catch (error) {
      console.error("Failed to load API properties:", error)
      // Gracefully handle API failure - continue with local data
      toast.error("Some properties may not be available", { duration: 3000 })
    } finally {
      setIsLoadingApi(false)
      setIsInitialLoad(false)
    }
  }

  // Refresh properties (for admin updates)
  const refreshProperties = async () => {
    await loadApiProperties()
    toast.success("Properties refreshed!")
  }

  // Get all properties (local + API) with proper ID handling
  const getAllProperties = () => {
    // Combine local properties with API properties
    const combinedProperties = [
      ...properties, // Global data properties
      ...apiProperties.map((prop) => ({
        ...prop,
        id: `api_${prop._id}`, // Prefix API properties with 'api_'
        _id: prop._id, // Keep original MongoDB ID for admin operations
        // Ensure all required fields are present
        images: prop.images && prop.images.length > 0 ? prop.images : ["/placeholder.svg"],
        amenities: prop.amenities || [],
        features: prop.features || ["Modern Design", "Prime Location"],
        nearbyPlaces: prop.nearbyPlaces || ["Shopping Center", "Public Transport"],
        dealer: prop.dealer || {
          name: "Dream Homes",
          phone: "+1 (555) 123-4567",
          email: "contact@dreamhomes.com",
          image: "/placeholder.svg",
        },
        yearBuilt: prop.yearBuilt || new Date().getFullYear(),
        parking: prop.parking || 0,
      })),
    ]

    return combinedProperties
  }

  const toggleLike = (propertyId) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (!user.id) {
      toast.error("Please login to save favorites")
      return
    }

    const isLiked = likedProperties.includes(propertyId)
    let newLiked

    if (isLiked) {
      newLiked = likedProperties.filter((id) => id !== propertyId)
      toast.success("Removed from favorites")
    } else {
      newLiked = [...likedProperties, propertyId]
      toast.success("Added to favorites")
    }

    setLikedProperties(newLiked)
    localStorage.setItem(`liked_${user.id}`, JSON.stringify(newLiked))
  }

  const getLikedProperties = () => {
    const allProperties = getAllProperties()
    return allProperties.filter((property) => likedProperties.includes(property.id))
  }

  const getPropertyById = (id) => {
    const allProperties = getAllProperties()
    return allProperties.find((property) => property.id === id)
  }

  const filterProperties = (filters) => {
    const allProperties = getAllProperties()
    return allProperties.filter((property) => {
      // Type filter (all, buy, rent)
      if (filters.type && filters.type !== "all" && property.type !== filters.type) {
        return false
      }

      // Property type filter (1BHK, 2BHK, etc.)
      if (
        filters.propertyType &&
        filters.propertyType.length > 0 &&
        !filters.propertyType.includes(property.propertyType)
      ) {
        return false
      }

      // Price range filter
      if (filters.priceRange) {
        if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
          return false
        }
      }

      // Location filter
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase()
        const cityMatch = property.location.city.toLowerCase().includes(searchTerm)
        const addressMatch = property.location.address.toLowerCase().includes(searchTerm)
        if (!cityMatch && !addressMatch) {
          return false
        }
      }

      // Pets allowed filter
      if (filters.petsAllowed !== undefined && filters.petsAllowed && !property.petsAllowed) {
        return false
      }

      // Swimming pool filter
      if (filters.swimmingPool !== undefined && filters.swimmingPool) {
        if (
          !property.amenities ||
          !property.amenities.some(
            (amenity) => amenity.toLowerCase().includes("swimming") || amenity.toLowerCase().includes("pool"),
          )
        ) {
          return false
        }
      }

      // Parking filter
      if (filters.parking !== undefined && filters.parking) {
        if (
          !property.amenities ||
          !property.amenities.some(
            (amenity) => amenity.toLowerCase().includes("parking") || amenity.toLowerCase().includes("garage"),
          )
        ) {
          return false
        }
      }

      // Availability filter
      if (filters.availability && filters.availability !== "all" && property.availability !== filters.availability) {
        return false
      }

      return true
    })
  }

  return (
    <PropertyContext.Provider
      value={{
        properties: getAllProperties(), // Return combined properties
        likedProperties,
        isLoadingApi,
        isInitialLoad,
        toggleLike,
        getLikedProperties,
        getPropertyById,
        filterProperties,
        refreshProperties, // For admin to refresh after changes
        apiProperties, // Separate access to API properties for admin
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperty() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider")
  }
  return context
}

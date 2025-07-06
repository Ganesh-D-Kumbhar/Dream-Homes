// import { createContext, useContext, useState, useEffect } from "react"
// import { propertiesData } from "../data/globalData"
// import toast from "react-hot-toast"


// const PropertyContext = createContext(undefined)

// export function PropertyProvider({ children }) {
//   const [properties] = useState(propertiesData)
//   const [likedProperties, setLikedProperties] = useState([])

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}")
//     if (user.id) {
//       const liked = JSON.parse(localStorage.getItem(`liked_${user.id}`) || "[]")
//       setLikedProperties(liked)
//     }
//   }, [])

//   const toggleLike = (propertyId) => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}")
//     if (!user.id) return

//     const isLiked = likedProperties.includes(propertyId)
//     let newLiked;

//     if (isLiked) {
//       newLiked = likedProperties.filter((id) => id !== propertyId)
//       toast.success("Removed from favorites")
//     } else {
//       newLiked = [...likedProperties, propertyId]
//       toast.success("Added to favorites")
//     }

//     setLikedProperties(newLiked)
//     localStorage.setItem(`liked_${user.id}`, JSON.stringify(newLiked))
//   }

//   const getLikedProperties = () => {
//     return properties.filter((property) => likedProperties.includes(property.id))
//   }

//   const getPropertyById = (id) => {
//     return properties.find((property) => property.id === id)
//   }

//   const filterProperties = (filters)=> {
//     return properties.filter((property) => {
//       if (filters.type && filters.type !== "all" && property.type !== filters.type) {
//         return false
//       }

//       if (
//         filters.propertyType &&
//         filters.propertyType.length > 0 &&
//         !filters.propertyType.includes(property.propertyType)
//       ) {
//         return false
//       }

//       if (filters.priceRange) {
//         if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
//           return false
//         }
//       }

//       if (
//         filters.location &&
//         !property.location.city.toLowerCase().includes(filters.location.toLowerCase()) &&
//         !property.location.address.toLowerCase().includes(filters.location.toLowerCase())
//       ) {
//         return false
//       }

//       if (filters.petsAllowed !== undefined && property.petsAllowed !== filters.petsAllowed) {
//         return false
//       }

//       if (filters.availability && filters.availability !== "all" && property.availability !== filters.availability) {
//         return false
//       }

//       return true
//     })
//   }

//   return (
//     <PropertyContext.Provider
//       value={{
//         properties,
//         likedProperties,
//         toggleLike,
//         getLikedProperties,
//         getPropertyById,
//         filterProperties,
//       }}
//     >
//       {children}
//     </PropertyContext.Provider>
//   )
// }

// export function useProperty() {
//   const context = useContext(PropertyContext)
//   if (context === undefined) {
//     throw new Error("useProperty must be used within a PropertyProvider")
//   }
//   return context
// }


















import { createContext, useContext, useState, useEffect } from "react"
import { propertiesData } from "../data/globalData"
import toast from "react-hot-toast"

const PropertyContext = createContext(undefined)

export function PropertyProvider({ children }) {
  const [properties] = useState(propertiesData)
  const [likedProperties, setLikedProperties] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.id) {
      const liked = JSON.parse(localStorage.getItem(`liked_${user.id}`) || "[]")
      setLikedProperties(liked)
    }
  }, [])

  const toggleLike = (propertyId) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (!user.id) return

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
    return properties.filter((property) => likedProperties.includes(property.id))
  }

  const getPropertyById = (id) => {
    return properties.find((property) => property.id === id)
  }

  const filterProperties = (filters) => {
    return properties.filter((property) => {
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
      if (
        filters.location &&
        !property.location.city.toLowerCase().includes(filters.location.toLowerCase()) &&
        !property.location.address.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false
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
        properties,
        likedProperties,
        toggleLike,
        getLikedProperties,
        getPropertyById,
        filterProperties,
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

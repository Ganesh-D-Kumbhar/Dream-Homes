import { useState, useEffect } from "react"
import { Button } from "../ui/Button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx"
import { Input } from "../ui/Input.jsx"
import { Badge } from "../ui/Badge.jsx"
import { Search, Edit, Trash2, ArrowLeft, Home, MapPin, Calendar, RefreshCw } from "lucide-react"
import toast from "react-hot-toast"
import apiService from "../../lib/api.js"
import AdminLogin from "./AdminLogin.jsx"
import AdminDashboard from "./AdminDashboard.jsx"
import PropertyForm from "./PropertyForm.jsx"
import { useProperty } from "../../context/PropertyContext.jsx"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard") // dashboard, add, edit, manage
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { refreshProperties } = useProperty()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && (currentView === "manage" || currentView === "dashboard")) {
      loadProperties()
    }
  }, [isAuthenticated, currentView])

  useEffect(() => {
    // Filter properties based on search term
    if (searchTerm.trim()) {
      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.propertyType?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProperties(filtered)
    } else {
      setFilteredProperties(properties)
    }
  }, [searchTerm, properties])

  const loadProperties = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getProperties()
      if (response.success) {
        setProperties(response.data)
        setFilteredProperties(response.data)
      }
    } catch (error) {
      toast.error("Failed to load properties")
      console.error("Load properties error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    setCurrentView("dashboard")
    toast.success("Logged out successfully")
  }

  const handlePropertySave = async (savedProperty) => {
    await loadProperties()
    await refreshProperties() // Refresh the main app properties
    setCurrentView("manage")
    setSelectedProperty(null)
  }

  const handleEditProperty = (property) => {
    setSelectedProperty(property)
    setCurrentView("edit")
  }

  const handleDeleteProperty = async (property) => {
    if (!window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
      return
    }

    try {
      const response = await apiService.deleteProperty(property._id)
      if (response.success) {
        toast.success("Property deleted successfully")
        await loadProperties()
        await refreshProperties() // Refresh the main app properties
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete property")
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gold-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            {currentView !== "dashboard" && (
              <Button onClick={() => setCurrentView("dashboard")} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Real Estate Admin</h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Super Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setCurrentView("dashboard")}
              variant={currentView === "dashboard" ? "default" : "outline"}
              size="sm"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => setCurrentView("manage")}
              variant={currentView === "manage" ? "default" : "outline"}
              size="sm"
            >
              Manage
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Content */}
        {currentView === "dashboard" && <AdminDashboard onNavigate={setCurrentView} />}

        {currentView === "add" && (
          <PropertyForm onSave={handlePropertySave} onCancel={() => setCurrentView("dashboard")} />
        )}

        {currentView === "edit" && selectedProperty && (
          <PropertyForm
            property={selectedProperty}
            onSave={handlePropertySave}
            onCancel={() => setCurrentView("manage")}
          />
        )}

        {currentView === "manage" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center text-slate-800 dark:text-white">
                    <Home className="w-5 h-5 mr-2 text-gold-500" />
                    Manage Properties ({filteredProperties.length})
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button onClick={loadProperties} variant="outline" size="sm" disabled={isLoading}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                    <Button
                      onClick={() => setCurrentView("add")}
                      className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white"
                      size="sm"
                    >
                      Add Property
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search properties by title, location, or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-300">Loading properties...</p>
                </div>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property._id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Property Image */}
                        <div className="lg:w-64 h-48 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                          {property.images && property.images.length > 0 ? (
                            <img
                              src={property.images[0] || "/placeholder.svg"}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Home className="w-12 h-12 text-slate-400" />
                            </div>
                          )}
                        </div>

                        {/* Property Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                                {property.title}
                              </h3>
                              <div className="flex items-center text-slate-600 dark:text-slate-300 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.location?.address}, {property.location?.city}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                                <span>{property.bedrooms} bed</span>
                                <span>{property.bathrooms} bath</span>
                                <span>{property.area} sq ft</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                                {formatPrice(property.price)}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={property.type === "buy" ? "default" : "secondary"}>
                                  {property.type === "buy" ? "For Sale" : "For Rent"}
                                </Badge>
                                <Badge
                                  variant={
                                    property.availability === "available"
                                      ? "default"
                                      : property.availability === "sold"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {property.availability}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <Calendar className="w-4 h-4 mr-1" />
                              Created {formatDate(property.createdAt)}
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button onClick={() => handleEditProperty(property)} variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteProperty(property)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Home className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2">
                    {searchTerm ? "No properties found" : "No properties yet"}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    {searchTerm
                      ? `No properties match "${searchTerm}". Try a different search term.`
                      : "Start by adding your first property to the system."}
                  </p>
                  {!searchTerm && (
                    <Button
                      onClick={() => setCurrentView("add")}
                      className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white"
                    >
                      Add Your First Property
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import { motion } from "framer-motion"
import { Button } from "../ui/Button.jsx"
import { Input } from "../ui/Input.jsx"
import { Card, CardContent } from "../ui/Card.jsx"
import { Badge } from "../ui/Badge.jsx"
import { Search, Edit, Trash2, RefreshCw, MapPin, Calendar, DollarSign, Home } from "lucide-react"

const PropertyList = ({ properties, loading, filters, onFiltersChange, onEdit, onDelete, onRefresh }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }))
  }

  const formatPrice = (price, type) => {
    if (type === "rent") {
      return `₹${price.toLocaleString()}/month`
    }
    return `₹${(price / 100000).toFixed(1)}L`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search properties..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>

              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange("availability", e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>

              <Button
                onClick={onRefresh}
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <RefreshCw className="h-8 w-8 text-blue-600" />
          </motion.div>
        </div>
      ) : properties.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Home className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Properties Found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No properties match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {properties.map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Property Image */}
                    <div className="lg:w-64 h-48 lg:h-32 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={typeof property.images[0] === "string" ? property.images[0] : property.images[0].url}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home className="h-8 w-8 text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Property Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm line-clamp-1">
                              {property.location.address}, {property.location.city}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge
                            className={`${
                              property.type === "buy"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                            }`}
                          >
                            {property.type === "buy" ? "For Sale" : "For Rent"}
                          </Badge>
                          <Badge
                            className={`${
                              property.availability === "available"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : property.availability === "sold"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                            }`}
                          >
                            {property.availability.charAt(0).toUpperCase() + property.availability.slice(1)}
                          </Badge>
                          {!property.isActive && <Badge variant="destructive">Inactive</Badge>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {formatPrice(property.price, property.type)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-blue-600" />
                          <span className="text-slate-600 dark:text-slate-400">{property.propertyType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="text-slate-600 dark:text-slate-400">{property.yearBuilt}</span>
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 text-xs">
                          Created: {formatDate(property.createdAt)}
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{property.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:w-32">
                      <Button
                        onClick={() => onEdit(property)}
                        variant="outline"
                        size="sm"
                        className="flex-1 lg:flex-none flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete(property._id, false)}
                        variant="outline"
                        size="sm"
                        className="flex-1 lg:flex-none flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertyList

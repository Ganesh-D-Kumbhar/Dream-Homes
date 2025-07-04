import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, SlidersHorizontal, MapPin, Home, DollarSign, Filter, X, ChevronDown } from "lucide-react"

export default function PropertyFilters({ filters, onFiltersChange }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchLocation, setSearchLocation] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  const propertyTypes = ["1BHK", "2BHK", "3BHK", "Bungalow", "Villa"]

  const handleTypeChange = (type) => {
    onFiltersChange({ ...filters, type })
  }

  const handlePropertyTypeChange = (propertyType) => {
    const currentTypes = filters.propertyType || []
    const newTypes = currentTypes.includes(propertyType)
      ? currentTypes.filter((t) => t !== propertyType)
      : [...currentTypes, propertyType]

    onFiltersChange({ ...filters, propertyType: newTypes })
  }

  const handleLocationSearch = () => {
    onFiltersChange({ ...filters, location: searchLocation })
  }

  const handlePriceFilter = () => {
    const min = priceRange.min ? Number.parseInt(priceRange.min) : undefined
    const max = priceRange.max ? Number.parseInt(priceRange.max) : undefined

    if (min || max) {
      onFiltersChange({
        ...filters,
        priceRange: { min: min || 0, max: max || Number.POSITIVE_INFINITY },
      })
    } else {
      onFiltersChange({ ...filters, priceRange: undefined })
    }
  }

  const clearFilters = () => {
    onFiltersChange({
      type: "all",
      propertyType: [],
      availability: "available",
    })
    setSearchLocation("")
    setPriceRange({ min: "", max: "" })
  }

  const activeFiltersCount =
    (filters.type !== "all" ? 1 : 0) +
    (filters.propertyType?.length || 0) +
    (filters.location ? 1 : 0) +
    (filters.priceRange ? 1 : 0) +
    (filters.petsAllowed ? 1 : 0)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-20">
      <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border-0 shadow-2xl shadow-gold-500/10">
        {/* Main Filter Bar */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Location */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 " />
              <Input
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLocationSearch()}
                className="pl-12 h-12 text-lg border-0 bg-slate-50 dark:bg-slate-700 ring-1 ring-gold-200 focus:ring-2 focus:ring-gold-400"
              />
            </div>

            {/* Property Type Buttons */}
            <div className="flex gap-2">
              <Button
                variant={filters.type === "all" ? "default" : "outline"}
                onClick={() => handleTypeChange("all")}
                className={`h-12 px-6 ${
                  filters.type === "all"
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg"
                    : "border-slate-200 hover:border-gold-400 hover:text-gold-600"
                }`}
              >
                All
              </Button>
              <Button
                variant={filters.type === "buy" ? "default" : "outline"}
                onClick={() => handleTypeChange("buy")}
                className={`h-12 px-6 ${
                  filters.type === "buy"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                    : "border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Buy
              </Button>
              <Button
                variant={filters.type === "rent" ? "default" : "outline"}
                onClick={() => handleTypeChange("rent")}
                className={`h-12 px-6 ${
                  filters.type === "rent"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "border-slate-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Rent
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-12 px-6 border-slate-200 hover:border-gold-400 hover:text-gold-600 relative"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs px-2 py-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              <Button
                onClick={handleLocationSearch}
                className="h-12 px-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="p-6 space-y-6">
                {/* Property Types */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-gold-500" />
                    Property Type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <Button
                        key={type}
                        variant={filters.propertyType?.includes(type) ? "default" : "outline"}
                        onClick={() => handlePropertyTypeChange(type)}
                        className={`${
                          filters.propertyType?.includes(type)
                            ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg"
                            : "border-slate-200 hover:border-gold-400 hover:text-gold-600"
                        }`}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-gold-500" />
                    Price Range
                  </h3>
                  <div className="flex gap-4 items-center">
                    <Input
                      placeholder="Min Price"
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="flex-1 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400"
                    />
                    <span className="text-slate-400">to</span>
                    <Input
                      placeholder="Max Price"
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="flex-1 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400"
                    />
                    <Button
                      onClick={handlePriceFilter}
                      className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-gold-500" />
                    Additional Options
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filters.petsAllowed ? "default" : "outline"}
                      onClick={() => onFiltersChange({ ...filters, petsAllowed: !filters.petsAllowed })}
                      className={`${
                        filters.petsAllowed
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                          : "border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
                      }`}
                    >
                      🐕 Pets Allowed
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-200 hover:border-blue-400 hover:text-blue-600 bg-transparent"
                    >
                      🏊 Swimming Pool
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-200 hover:border-purple-400 hover:text-purple-600 bg-transparent"
                    >
                      🚗 Parking
                    </Button>
                  </div>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

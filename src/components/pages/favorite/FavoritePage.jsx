import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card.jsx"
import { Button } from "@/components/ui/Button.jsx"
import { Badge } from "@/components/ui/Badge.jsx"
import { Input } from "@/components/ui/Input.jsx"
import PropertyCard from "@/components/property/PropertyCard.jsx"
import { useProperty } from "@/context/PropertyContext.jsx"
import { useAuth } from "@/context/AuthContext.jsx"
import {
  Heart,
  Search,
  Grid3X3,
  List,
  Home,
  MapPin,
  Calendar,
  Star,
  Trash2,
  Share2,
  Download,
  Sparkles,
  Filter,
  SortAsc,
  Eye,
  TrendingUp,
} from "lucide-react"

export default function Favorites() {
  const { getLikedProperties, toggleLike } = useProperty()
  const { user } = useAuth()
  const [likedProperties, setLikedProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedType, setSelectedType] = useState("all")

  useEffect(() => {
    const properties = getLikedProperties()
    setLikedProperties(properties)
    setFilteredProperties(properties)
  }, [getLikedProperties])

  useEffect(() => {
    let filtered = [...likedProperties]

    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((property) => property.type === selectedType)
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.yearBuilt) - new Date(a.yearBuilt))
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.yearBuilt) - new Date(b.yearBuilt))
        break
      case "size-large":
        filtered.sort((a, b) => b.size - a.size)
        break
      case "size-small":
        filtered.sort((a, b) => a.size - b.size)
        break
      default:
        break
    }

    setFilteredProperties(filtered)
  }, [likedProperties, searchTerm, sortBy, selectedType])

  const handleRemoveAll = () => {
    if (window.confirm("Are you sure you want to remove all properties from favorites?")) {
      likedProperties.forEach((property) => {
        toggleLike(property.id)
      })
      setLikedProperties([])
      setFilteredProperties([])
    }
  }

  const handleExportFavorites = () => {
    const data = filteredProperties.map((property) => ({
      title: property.title,
      price: property.price,
      type: property.type,
      location: property.location.address,
      size: property.size,
    }))

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-favorite-properties.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const stats = [
    {
      icon: Heart,
      label: "Total Favorites",
      value: likedProperties.length,
      color: "text-red-500",
      bgColor: "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20",
      change: "+12%",
    },
    {
      icon: Home,
      label: "For Sale",
      value: likedProperties.filter((p) => p.type === "buy").length,
      color: "text-emerald-500",
      bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20",
      change: "+8%",
    },
    {
      icon: MapPin,
      label: "For Rent",
      value: likedProperties.filter((p) => p.type === "rent").length,
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20",
      change: "+15%",
    },
    {
      icon: Star,
      label: "Avg. Rating",
      value: "4.8",
      color: "text-gold-500",
      bgColor: "bg-gradient-to-br from-gold-100 to-gold-200 dark:from-gold-900/20 dark:to-gold-800/20",
      change: "+0.2",
    },
  ]

  if (likedProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gold-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-32 overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-mesh opacity-30"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gold-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-5xl mx-auto"
            >
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 text-lg font-semibold shadow-lg mb-6">
                <Heart className="w-5 h-5 mr-2" />
                My Favorites
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Your Favorite
                <span className="block text-gradient bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Properties
                </span>
              </h1>
            </motion.div>
          </div>
        </motion.section>

        {/* Empty State */}
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="relative mb-12">
              <div className="w-40 h-40 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Heart className="w-20 h-20 text-red-400" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold-400 rounded-full animate-bounce"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-6">No Favorites Yet</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
              Start exploring our amazing properties and add them to your favorites to see them here. Your dream home is
              waiting!
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-10 py-4 text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Home className="mr-2 h-6 w-6" />
              Explore Properties
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gold-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-32 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gold-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-5xl mx-auto"
          >
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 text-lg font-semibold shadow-lg mb-6">
              <Heart className="w-5 h-5 mr-2" />
              My Favorites
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Your Favorite
              <span className="block text-gradient bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Properties
              </span>
            </h1>
            <p className="text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Welcome back, <span className="text-gold-600 font-semibold">{user?.name}</span>! Here are all your
              carefully curated properties.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 relative -mt-16 z-10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-4 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
                  <CardContent className="p-0">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 ${stat.bgColor} rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className={`w-10 h-10 ${stat.color}`} />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{stat.value}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">{stat.label}</p>
                    <div className="flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                      <span className="text-sm text-emerald-600 font-semibold">{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Filters and Controls */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <Card className="p-8 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search your favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400"
                />
              </div>

              {/* Type Filter */}
              <div className="flex gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  onClick={() => setSelectedType("all")}
                  className={`h-12 px-6 ${selectedType === "all"
                      ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg"
                      : "border-slate-200 hover:border-gold-400 hover:text-gold-600"
                    }`}
                >
                  All
                </Button>
                <Button
                  variant={selectedType === "buy" ? "default" : "outline"}
                  onClick={() => setSelectedType("buy")}
                  className={`h-12 px-6 ${selectedType === "buy"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                      : "border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
                    }`}
                >
                  Buy
                </Button>
                <Button
                  variant={selectedType === "rent" ? "default" : "outline"}
                  onClick={() => setSelectedType("rent")}
                  className={`h-12 px-6 ${selectedType === "rent"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "border-slate-200 hover:border-blue-400 hover:text-blue-600"
                    }`}
                >
                  Rent
                </Button>
              </div>

              {/* Sort & View Controls */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <SortAsc className="w-5 h-5 text-slate-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border-0 bg-slate-50 dark:bg-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-gold-400"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="size-large">Size: Large to Small</option>
                    <option value="size-small">Size: Small to Large</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={`h-12 w-12 ${viewMode === "grid"
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white"
                        : "border-slate-200 hover:border-gold-400 hover:text-gold-600"
                      }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={`h-12 w-12 ${viewMode === "list"
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white"
                        : "border-slate-200 hover:border-gold-400 hover:text-gold-600"
                      }`}
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleExportFavorites}
                    className="h-12 px-6 border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRemoveAll}
                    className="h-12 px-6 border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-slate-600 dark:text-slate-400">
                Showing{" "}
                <span className="font-semibold text-slate-800 dark:text-white">{filteredProperties.length}</span> of{" "}
                <span className="font-semibold text-slate-800 dark:text-white">{likedProperties.length}</span> favorite
                properties
              </div>
              <Badge className="bg-gold-100 text-gold-700 px-4 py-2">
                <Eye className="w-4 h-4 mr-2" />
                Recently Viewed
              </Badge>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Properties Grid */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="py-16">
        <div className="container mx-auto px-4">
          {filteredProperties.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Search className="w-16 h-16 text-slate-400" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">No Properties Found</h3>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedType("all")
                  setSortBy("newest")
                }}
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-3"
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8"}>
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-r from-red-500 via-red-600 to-gold-500 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="bg-white/20 text-white px-6 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready for the Next Step?
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Turn Dreams Into Reality!</h2>
            <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Contact our experts to schedule viewings for your favorite properties and make your dream home a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Schedule Viewing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 bg-transparent px-10 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <Share2 className="mr-2 h-6 w-6" />
                Share Favorites
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

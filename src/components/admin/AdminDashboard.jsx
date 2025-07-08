import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card.jsx"
import { Button } from "../ui/Button.jsx"
import { Badge } from "../ui/Badge.jsx"
import { Home, Plus, TrendingUp, DollarSign, Building, Key, MapPin, Clock } from "lucide-react"
import toast from "react-hot-toast"
import apiService from "../../lib/api.js"

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getAdminStats()
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      toast.error("Failed to load dashboard statistics")
      console.error("Stats error:", error)
    } finally {
      setIsLoading(false)
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Manage your real estate properties and monitor performance
          </p>
        </div>
        <Button
          onClick={() => onNavigate("add")}
          className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Property
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.totalProperties || 0}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">All properties in system</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Available</CardTitle>
            <Key className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.availableProperties || 0}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ready for clients</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gold-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">For Sale</CardTitle>
            <DollarSign className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.forSale || 0}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Purchase properties</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">For Rent</CardTitle>
            <Building className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.forRent || 0}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rental properties</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800 dark:text-white">
            <Clock className="w-5 h-5 mr-2 text-gold-500" />
            Recent Properties
          </CardTitle>
          <CardDescription>Latest properties added to the system</CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.recentProperties && stats.recentProperties.length > 0 ? (
            <div className="space-y-4">
              {stats.recentProperties.map((property) => (
                <div
                  key={property._id}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-white">{property.title}</h4>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location?.city}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 dark:text-white">{formatPrice(property.price)}</div>
                    <Badge variant={property.type === "buy" ? "default" : "secondary"}>
                      {property.type === "buy" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 ml-4">
                    {formatDate(property.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No properties found</p>
              <Button onClick={() => onNavigate("add")} variant="outline" className="mt-4">
                Add Your First Property
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() => onNavigate("add")}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gold-50 dark:hover:bg-gold-900/20 hover:border-gold-300"
            >
              <Plus className="w-6 h-6 text-gold-500" />
              <span>Add Property</span>
            </Button>

            <Button
              onClick={() => onNavigate("manage")}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300"
            >
              <Home className="w-6 h-6 text-blue-500" />
              <span>Manage Properties</span>
            </Button>

            <Button
              onClick={loadStats}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 bg-transparent"
            >
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span>Refresh Stats</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

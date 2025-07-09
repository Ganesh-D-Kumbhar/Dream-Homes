import { useState, useEffect } from "react"
import { Button } from "../ui/Button.jsx"
import { Input } from "../ui/Input.jsx"
import { Label } from "../ui/Label.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select.jsx"
import { Checkbox } from "../ui/CheckBox.jsx"
import { Badge } from "../ui/Badge.jsx"
import { Save, Upload, X, Plus, Home, MapPin, DollarSign, ImageIcon } from "lucide-react"
import toast from "react-hot-toast"
import apiService from "../../lib/api.js"

export default function PropertyForm({ property, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: "buy",
    propertyType: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    bedrooms: "",
    bathrooms: "",
    size: "",
    description: "",
    availability: "available",
    petsAllowed: false,
    featured: false,
    agent: {
      name: "",
      phone: "",
      email: "",
    },
    amenities: [],
    images: [],
  })

  const [newAmenity, setNewAmenity] = useState("")
  const [selectedImages, setSelectedImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState([])

  // Property types
  const propertyTypes = ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "Studio", "Penthouse", "Villa", "Duplex", "Townhouse"]

  // Common amenities
  const commonAmenities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "Garden",
    "Balcony",
    "Air Conditioning",
    "Heating",
    "Internet",
    "Cable TV",
    "Laundry",
    "Elevator",
    "Terrace",
    "Storage",
    "Pet Friendly",
  ]

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        price: property.price?.toString() || "",
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        size: property.size?.toString() || "",
        location: property.location || {
          address: "",
          city: "",
          state: "",
          zipCode: "",
        },
        agent: property.agent || {
          name: "",
          phone: "",
          email: "",
        },
        amenities: property.amenities || [],
        images: property.images || [],
      })
      setImagePreview(property.images || [])
    }
  }, [property])

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setSelectedImages((prev) => [...prev, ...files])

      // Create preview URLs
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview((prev) => [...prev, e.target.result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index))
    if (index < formData.images.length) {
      // Removing existing image
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    } else {
      // Removing new image
      const newImageIndex = index - formData.images.length
      setSelectedImages((prev) => prev.filter((_, i) => i !== newImageIndex))
    }
  }

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }))
      setNewAmenity("")
    }
  }

  const removeAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }))
  }

  const addCommonAmenity = (amenity) => {
    if (!formData.amenities.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      toast.error("Property title is required")
      return
    }
    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required")
      return
    }
    if (!formData.location.address.trim() || !formData.location.city.trim()) {
      toast.error("Address and city are required")
      return
    }

    setIsLoading(true)
    try {
      const propertyData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        bedrooms: Number.parseInt(formData.bedrooms) || 0,
        bathrooms: Number.parseInt(formData.bathrooms) || 0,
        size: Number.parseInt(formData.size) || 0,
      }

      let response
      if (property) {
        // Update existing property
        response = await apiService.updateProperty(property._id, propertyData, selectedImages)
      } else {
        // Create new property
        response = await apiService.createProperty(propertyData, selectedImages)
      }

      if (response.success) {
        toast.success(property ? "Property updated successfully!" : "Property created successfully!")
        onSave(response.data)
      }
    } catch (error) {
      toast.error(error.message || "Failed to save property")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {property ? "Edit Property" : "Add New Property"}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {property ? "Update property information" : "Create a new property listing"}
          </p>
        </div>
        <Button onClick={onCancel} variant="outline" className="text-slate-600 dark:text-slate-300 bg-transparent">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800 dark:text-white">
              <Home className="w-5 h-5 mr-2 text-amber-500" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Beautiful 3BHK Apartment"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="500000"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Listing Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => handleInputChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                  placeholder="3"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                  placeholder="2"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="size">Area (sq ft)</Label>
                <Input
                  id="size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  placeholder="1200"
                  min="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the property features, location benefits, etc."
                className="w-full min-h-[100px] px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-background text-foreground resize-vertical"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="petsAllowed"
                  checked={formData.petsAllowed}
                  onCheckedChange={(checked) => handleInputChange("petsAllowed", checked)}
                />
                <Label htmlFor="petsAllowed">Pets Allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange("featured", checked)}
                />
                <Label htmlFor="featured">Featured Property</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800 dark:text-white">
              <MapPin className="w-5 h-5 mr-2 text-amber-500" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.location.address}
                onChange={(e) => handleInputChange("location.address", e.target.value)}
                placeholder="123 Main Street"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange("location.city", e.target.value)}
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.location.state}
                  onChange={(e) => handleInputChange("location.state", e.target.value)}
                  placeholder="NY"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.location.zipCode}
                  onChange={(e) => handleInputChange("location.zipCode", e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Agent Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="agentName">Agent Name</Label>
                <Input
                  id="agentName"
                  value={formData.agent.name}
                  onChange={(e) => handleInputChange("agent.name", e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label htmlFor="agentPhone">Phone</Label>
                <Input
                  id="agentPhone"
                  value={formData.agent.phone}
                  onChange={(e) => handleInputChange("agent.phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="agentEmail">Email</Label>
                <Input
                  id="agentEmail"
                  type="email"
                  value={formData.agent.email}
                  onChange={(e) => handleInputChange("agent.email", e.target.value)}
                  placeholder="john@realestate.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800 dark:text-white">
              <ImageIcon className="w-5 h-5 mr-2 text-amber-500" />
              Property Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="images">Upload Images</Label>
              <div className="mt-2">
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("images").click()}
                  className="w-full h-20 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-amber-400"
                >
                  <Upload className="w-6 h-6 mr-2 text-slate-400" />
                  Click to upload images or drag and drop
                </Button>
              </div>
            </div>

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreview.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Property ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Quick Add Common Amenities</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {commonAmenities.map((amenity) => (
                  <Button
                    key={amenity}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addCommonAmenity(amenity)}
                    disabled={formData.amenities.includes(amenity)}
                    className="text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {amenity}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="newAmenity">Add Custom Amenity</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="newAmenity"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Enter amenity name"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                />
                <Button type="button" onClick={addAmenity} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {formData.amenities.length > 0 && (
              <div>
                <Label>Selected Amenities</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      {amenity}
                      <button type="button" onClick={() => removeAmenity(amenity)} className="ml-1 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{property ? "Updating..." : "Creating..."}</span>
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {property ? "Update Property" : "Create Property"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
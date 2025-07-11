import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useFormik } from "formik"
import * as yup from "yup"
import { Button } from "../ui/Button.jsx"
import { Input } from "../ui/Input.jsx"
import { Label } from "../ui/Label.jsx"
import { Card, CardContent } from "../ui/Card.jsx"
import { Badge } from "../ui/Badge.jsx"
import axios from "axios"
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  Star,
  MessageSquare,
  Building2
} from "lucide-react"
import toast from "react-hot-toast"

const validationSchema = yup.object({
  fullname: yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  phoneno: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  city: yup.string().min(2, "City must be at least 2 characters").required("City is required"),
})

export default function PropertyEnquiryForm({ isOpen, onClose, propertyTitle = "Premium Property" }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phoneno: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const response = await axios.post("https://dream-homes-backend.onrender.com/api/main-form", {
          ...values,
          propertyTitle,
          type: "contact-type",
          timestamp: new Date().toISOString(),
        })

        if (response.status === 200) {
          setIsSuccess(true)
          toast.success("Thank you! We'll contact you soon!", {
            duration: 4000,
            style: {
              background: "white",
              color: "black",
              fontWeight: "600",
              borderRadius: "12px",
              padding: "16px",
            },
          })

          setTimeout(() => {
            resetForm()
            setIsSuccess(false)
            onClose()
          }, 2000)
        } else {
          throw new Error("Failed to submit form")
        }
      } catch (error) {
        console.error("Form submission error:", error); // Add this
        toast.error("Something went wrong! Please try again.", {
          duration: 4000,
          style: {
            background: "white",
            color: "black",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "16px",
          },
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  const handleClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isSubmitting) {
      onClose()
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-lg max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12 px-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      >
                        <CheckCircle className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Thank You!</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        We'll contact you within 24 hours with detailed information.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Compact Header */}
                      <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleClose}
                          className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full h-8 w-8 z-10"
                        >
                          <X className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <MessageSquare className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-white">Quick Inquiry</h2>
                            <p className="text-white/90 text-xs">Get property details instantly</p>
                          </div>
                        </div>
                      </div>

                      {/* Compact Form */}
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-4 w-4 text-gold-500" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                              {propertyTitle}
                            </span>
                          </div>
                          <Badge className="bg-gold-100 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400 text-xs px-2 py-1">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Premium Service
                          </Badge>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                          {/* Two Column Layout for Desktop */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="fullname"
                                className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block"
                              >
                                Full Name *
                              </Label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  id="fullname"
                                  name="fullname"
                                  type="text"
                                  placeholder="Your name"
                                  value={formik.values.fullname}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className={`pl-10 h-10 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-lg text-sm ${formik.touched.fullname && formik.errors.fullname ? "ring-2 ring-red-400" : ""
                                    }`}
                                />
                              </div>
                              {formik.touched.fullname && formik.errors.fullname && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.fullname}</p>
                              )}
                            </div>

                            <div>
                              <Label
                                htmlFor="email"
                                className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block"
                              >
                                Email *
                              </Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="your@email.com"
                                  value={formik.values.email}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className={`pl-10 h-10 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-lg text-sm ${formik.touched.email && formik.errors.email ? "ring-2 ring-red-400" : ""
                                    }`}
                                />
                              </div>
                              {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="phoneno"
                                className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block"
                              >
                                Phone *
                              </Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  id="phoneno"
                                  name="phoneno"
                                  type="tel"
                                  placeholder="10-digit number"
                                  value={formik.values.phoneno}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className={`pl-10 h-10 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-lg text-sm ${formik.touched.phoneno && formik.errors.phoneno ? "ring-2 ring-red-400" : ""
                                    }`}
                                />
                              </div>
                              {formik.touched.phoneno && formik.errors.phoneno && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.phoneno}</p>
                              )}
                            </div>

                            <div>
                              <Label
                                htmlFor="city"
                                className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block"
                              >
                                City *
                              </Label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  id="city"
                                  name="city"
                                  type="text"
                                  placeholder="Your city"
                                  value={formik.values.city}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className={`pl-10 h-10 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-lg text-sm ${formik.touched.city && formik.errors.city ? "ring-2 ring-red-400" : ""
                                    }`}
                                />
                              </div>
                              {formik.touched.city && formik.errors.city && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
                              )}
                            </div>
                          </div>

                          <Button
                            type="submit"
                            disabled={isSubmitting || !formik.isValid}
                            className="w-full h-10 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg disabled:opacity-50 text-sm"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Inquiry
                              </>
                            )}
                          </Button>
                        </form>

                        {/* Footer */}
                        <div className="mt-4 text-center">
                          <div className="flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span>🔒 Secure</span>
                            <span>⚡ Quick Response</span>
                            <span>🏆 Expert Help</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

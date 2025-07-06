import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { motion } from "framer-motion"
import { Button } from "../ui/Button.jsx"
import { Input } from "../ui/Input.jsx"
import { Label } from "../ui/Label.jsx"
import { Eye, EyeOff, Loader2, User, Mail, Phone, Lock, ArrowRight, CheckCircle } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"
import toast from "react-hot-toast"

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})

export default function SignupForm({ onSuccess, setIsLoading }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signup } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const password = watch("password")

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setIsLoading(true)

    try {
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const { confirmPassword, ...userData } = data
      const success = await signup(userData)

      if (success) {
        toast.success("🎉 Account created successfully! Welcome to Dream Homes!", {
          duration: 5000,
          style: {
            background: "#10B981",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "16px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        })
        onSuccess()
      } else {
        toast.error("❌ Account creation failed! Email might already exist.", {
          duration: 4000,
          style: {
            background: "#EF4444",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "16px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#EF4444",
          },
        })
      }
    } catch (error) {
      toast.error("🚨 Something went wrong! Please try again.", {
        duration: 4000,
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "16px",
        },
      })
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" }
    if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-red-500" }
    if (password.length < 8) return { strength: 50, label: "Fair", color: "bg-yellow-500" }
    if (password.length < 12) return { strength: 75, label: "Good", color: "bg-blue-500" }
    return { strength: 100, label: "Strong", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
            className={`pl-12 h-14 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-xl text-lg ${
              errors.name ? "ring-2 ring-red-400" : ""
            }`}
          />
        </div>
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-2 font-medium"
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`pl-12 h-14 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-xl text-lg ${
                errors.email ? "ring-2 ring-red-400" : ""
              }`}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 font-medium"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              {...register("phone")}
              className={`pl-12 h-14 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-xl text-lg ${
                errors.phone ? "ring-2 ring-red-400" : ""
              }`}
            />
          </div>
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 font-medium"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            {...register("password")}
            className={`pl-12 pr-12 h-14 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-xl text-lg ${
              errors.password ? "ring-2 ring-red-400" : ""
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            )}
          </Button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Password Strength</span>
              <span className={`text-sm font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${passwordStrength.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength.strength}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-2 font-medium"
          >
            {errors.password.message}
          </motion.p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className={`pl-12 pr-12 h-14 bg-slate-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-gold-400 rounded-xl text-lg ${
              errors.confirmPassword ? "ring-2 ring-red-400" : ""
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-2 font-medium"
          >
            {errors.confirmPassword.message}
          </motion.p>
        )}
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="terms"
          required
          className="mt-1 rounded border-slate-300 text-gold-600 focus:ring-gold-500 focus:ring-offset-0"
        />
        <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          I agree to the{" "}
          <button type="button" className="text-gold-600 hover:text-gold-700 font-semibold">
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="text-gold-600 hover:text-gold-700 font-semibold">
            Privacy Policy
          </button>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full h-14 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            <CheckCircle className="mr-3 h-5 w-5" />
            Create Account
            <ArrowRight className="ml-3 h-5 w-5" />
          </>
        )}
      </Button>
    </motion.form>
  )
}

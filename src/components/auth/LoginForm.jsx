import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { motion } from "framer-motion"
import { Button } from "../ui/Button.jsx"
import { Input } from "../ui/Input.jsx"
import { Label } from "../ui/Label.jsx"
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"
import toast from "react-hot-toast"

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export default function LoginForm({ onSuccess, setIsLoading }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setIsLoading(true)

    try {
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const success = await login(data.email, data.password)

      if (success) {
        toast.success("🎉 Welcome back! Login successful!", {
          duration: 4000,
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
        toast.error("❌ Login failed! Please check your credentials.", {
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

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
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
        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-gold-600 focus:ring-gold-500 focus:ring-offset-0"
          />
          <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Remember me</span>
        </label>
        <button type="button" className="text-sm text-gold-600 hover:text-gold-700 font-semibold transition-colors">
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full h-14 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Signing In...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight className="ml-3 h-5 w-5" />
          </>
        )}
      </Button>
    </motion.form>
  )
}

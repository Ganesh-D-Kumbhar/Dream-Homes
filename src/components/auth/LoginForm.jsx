// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"
// import { motion } from "framer-motion"
// import { Button } from "../ui/Button.jsx"
// import { Input } from "../ui/Input.jsx"
// import { Label } from "../ui/Label.jsx"
// import { Eye, EyeOff, Loader2 } from "lucide-react"
// import { useAuth } from "../../context/AuthContext.jsx"

// const schema = yup.object({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// })



// export default function LoginForm({ onSuccess }) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const { login } = useAuth()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   })

//   const onSubmit = async (data) => {
//     setIsLoading(true)
//     const success = await login(data.email, data.password)
//     setIsLoading(false)

//     if (success) {
//       onSuccess()
//     }
//   }

//   return (
//     <motion.form
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4"
//     >
//       <div>
//         <Label htmlFor="email">Email</Label>
//         <Input
//           id="email"
//           type="email"
//           placeholder="Enter your email"
//           {...register("email")}
//           className={errors.email ? "border-red-500" : ""}
//         />
//         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//       </div>

//       <div>
//         <Label htmlFor="password">Password</Label>
//         <div className="relative">
//           <Input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//             {...register("password")}
//             className={errors.password ? "border-red-500" : ""}
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             size="sm"
//             className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//           </Button>
//         </div>
//         {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//       </div>

//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Logging in...
//           </>
//         ) : (
//           "Login"
//         )}
//       </Button>

//       <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//         <p>Demo credentials:</p>
//         <p>Email: demo@example.com | Password: demo123</p>
//       </div>
//     </motion.form>
//   )
// }













import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/Button.jsx"
import { Input } from "../ui/Input.jsx"
import { Label } from "../ui/Label.jsx"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"
import { toast } from "react-hot-toast"

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})


export default function LoginForm({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    const success = await login(data.email, data.password)
    setIsLoading(false)

    if (success) {
      toast.success("Successfully logged in!", {
        duration: 3000,
        style: {
          background: "#f59e0b",
          color: "#fff",
        },
      })
      onSuccess()
    } else {
      toast.error("Login failed. Please check your credentials.", {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const errorVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <motion.div variants={itemVariants} className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Lock className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-black dark:text-white">Welcome Back</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
      </motion.div>

      <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
            Email Address
          </Label>
          <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`pl-10 h-12 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white ${errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-amber-500 focus:ring-amber-500/20"
                }`}
            />
          </motion.div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
            Password
          </Label>
          <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={`pl-10 pr-12 h-12 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white ${errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-amber-500 focus:ring-amber-500/20"
                }`}
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          </motion.div>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border-0"
              disabled={isLoading}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </motion.div>
                ) : (
                  <motion.span key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Demo Credentials</p>
            <div className="space-y-1 text-sm">
              <p className="text-amber-600 dark:text-amber-400">📧 demo@example.com</p>
              <p className="text-amber-700 dark:text-amber-300">🔑 demo123</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

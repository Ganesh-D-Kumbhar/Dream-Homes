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
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password")], "Passwords must match")
//     .required("Confirm password is required"),
// })


// export default function SignupForm({ onSuccess }) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const { signup } = useAuth()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   })

//   const onSubmit = async (data) => {
//     setIsLoading(true)
//     const { confirmPassword, ...userData } = data
//     const success = await signup(userData)
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
//         <Label htmlFor="name">Full Name</Label>
//         <Input
//           id="name"
//           type="text"
//           placeholder="Enter your full name"
//           {...register("name")}
//           className={errors.name ? "border-red-500" : ""}
//         />
//         {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//       </div>

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
//         <Label htmlFor="phone">Phone Number</Label>
//         <Input
//           id="phone"
//           type="tel"
//           placeholder="Enter your phone number"
//           {...register("phone")}
//           className={errors.phone ? "border-red-500" : ""}
//         />
//         {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
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

//       <div>
//         <Label htmlFor="confirmPassword">Confirm Password</Label>
//         <div className="relative">
//           <Input
//             id="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Confirm your password"
//             {...register("confirmPassword")}
//             className={errors.confirmPassword ? "border-red-500" : ""}
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             size="sm"
//             className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//           </Button>
//         </div>
//         {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
//       </div>

//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Creating Account...
//           </>
//         ) : (
//           "Create Account"
//         )}
//       </Button>
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
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone, UserPlus } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-hot-toast"

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


export default function SignupForm({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    const { confirmPassword, ...userData } = data
    const success = await signup(userData)
    setIsLoading(false)

    if (success) {
      toast.success("Account created successfully!", {
        duration: 3000,
        style: {
          background: "#f59e0b",
          color: "#fff",
        },
      })
      onSuccess()
    } else {
      toast.error("Failed to create account. Please try again.", {
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
        staggerChildren: 0.08,
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
          <UserPlus className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-black dark:text-white">Create Account</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Join us today and get started</p>
      </motion.div>

      <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-black dark:text-white">
            Full Name
          </Label>
          <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
              className={`pl-10 h-12 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white ${errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-amber-500 focus:ring-amber-500/20"
                }`}
            />
          </motion.div>
          <AnimatePresence>
            {errors.name && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

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
          <Label htmlFor="phone" className="text-sm font-medium text-black dark:text-white">
            Phone Number
          </Label>
          <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
              className={`pl-10 h-12 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white ${errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-amber-500 focus:ring-amber-500/20"
                }`}
            />
          </motion.div>
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.phone.message}
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

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-black dark:text-white">
            Confirm Password
          </Label>
          <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`pl-10 pr-12 h-12 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white ${errors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-amber-500 focus:ring-amber-500/20"
                }`}
            />
            <motion.button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          </motion.div>
          <AnimatePresence>
            {errors.confirmPassword && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.confirmPassword.message}
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
                    Creating Account...
                  </motion.div>
                ) : (
                  <motion.span key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Create Account
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

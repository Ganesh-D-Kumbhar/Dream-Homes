import { useState } from "react"
import { motion } from "framer-motion"
import LoginForm from "./LoginForm.jsx"
import SignupForm from "./SignUpForm.jsx"
import { Card, CardContent } from "../ui/Card.jsx"
import { Button } from "../ui/Button.jsx"
import { Building2 } from "lucide-react"

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4"
          >
            <Building2 className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dream Homes</h1>
          <p className="text-gray-600 dark:text-gray-300">Find your dream home with us</p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="flex mb-6">
              <Button variant={isLogin ? "default" : "ghost"} className="flex-1 mr-2" onClick={() => setIsLogin(true)}>
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                className="flex-1 ml-2"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </Button>
            </div>

            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? <LoginForm onSuccess={onAuthSuccess} /> : <SignupForm onSuccess={onAuthSuccess} />}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

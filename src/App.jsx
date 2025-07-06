import { useEffect, useState } from "react"
import AuthPage from "./components/auth/AuthPage.jsx"
import HomePage from "./components/home/HomePage.jsx"
import { PropertyProvider } from "./context/PropertyContext.jsx"
import { Routes, Route } from "react-router-dom"
import AboutPage from "./components/pages/about/About.jsx"
import ContactPage from "./components/pages/contact/Contact.jsx"
import Favoritespage from "./components/pages/favorite/FavoritePage.jsx"
import Wrapper from "./components/wrapper/wrapper.jsx"
import ScrollToTop from "./utility/ScrollToTop.jsx"
import { ThemeProvider } from "./components/ThemeProvider.jsx"
import ProfilePage from "./components/pages/profilepage/ProfilePage.jsx"
import { Toaster } from "react-hot-toast"

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const user = localStorage.getItem("user")
//     setIsAuthenticated(!!user)
//     setIsLoading(false)
//   }, [])

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
//   }

//   return (
//     <ThemeProvider>
//       <PropertyProvider>
//         <ScrollToTop />
//         <Routes>
//           <Route path="/" element={<Wrapper />}>
//             <Route index element={<HomePage />} />
//             <Route path="about" element={<AboutPage />} />
//             <Route path="contact" element={<ContactPage />} />
//             <Route path="favorites" element={<Favoritespage />} />
//           </Route>
//         </Routes>
//       </PropertyProvider>
//     </ThemeProvider>
//   )
// }




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsAuthenticated(!!user)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gold-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gold-500 mx-auto mb-8"></div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Loading Dream Homes</h2>
            <p className="text-slate-600 dark:text-slate-300">Please wait while we prepare your experience...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
        <Toaster
          position="top-right"
          toastOptions={{
            className: "dark:bg-slate-800 dark:text-white",
            duration: 4000,
            style: {
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "600",
            },
          }}
        />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <PropertyProvider>
        <div className="App min-h-screen bg-background text-foreground">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Wrapper />} >
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="favorites" element={<Favoritespage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "dark:bg-slate-800 dark:text-white",
            duration: 4000,
            style: {
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "600",
            },
          }}
        />
      </PropertyProvider>
    </ThemeProvider>
  )
}

export default App

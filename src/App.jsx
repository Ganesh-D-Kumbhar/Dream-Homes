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

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsAuthenticated(!!user)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <ThemeProvider>
      <PropertyProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="favorites" element={<Favoritespage />} />
          </Route>
        </Routes>
      </PropertyProvider>
    </ThemeProvider>
  )
}
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { useState, useEffect } from "react"

export default function Layout() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setShowFooter(true)
  }, [])

  return (
    <div className="page-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
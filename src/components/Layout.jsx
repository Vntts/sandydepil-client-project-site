import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import MobileActionBar from './MobileActionBar'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.__sandydepilLoaded) {
      setLoading(false)
      return
    }
    // No celular a espera incomoda mais: 1,2s em vez de 2s
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const timer = setTimeout(
      () => {
        setLoading(false)
        if (typeof window !== 'undefined') window.__sandydepilLoaded = true
      },
      isMobile ? 1200 : 1900
    )
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <ScrollToTop />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFloat />
      <MobileActionBar />
    </>
  )
}

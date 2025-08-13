import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@components/atoms/Icon'
import ThemeToggle from '@components/molecules/ThemeToggle'
import ProfileDropdown from '@components/molecules/ProfileDropdown'
import Footer from './Footer'
import './MainLayout.css'

const MainLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navigationItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/bookworm', icon: 'bookworm', label: 'Bookworm' },
    { path: '/bingescape', icon: 'bingescape', label: 'Bingescape' },
    { path: '/film-frenzy', icon: 'filmFrenzy', label: 'Film Frenzy' },
    { path: '/otaku-hub', icon: 'otakuHub', label: 'Otaku Hub' },
    { path: '/wanderlog', icon: 'wanderlog', label: 'Wanderlog' },
    { path: '/scribbles', icon: 'scribbles', label: 'Scribbles' },
    { path: '/shutter-tales', icon: 'shutterTales', label: 'Shutter Tales' },
    { path: '/spot-light', icon: 'spotLight', label: 'Spot Light' }
  ]

  // Get current page name
  const getCurrentPageName = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname)
    return currentItem ? currentItem.label : ''
  }

  const currentPage = getCurrentPageName()

  const handleNavigation = (path) => {
    navigate(path)
    setMobileMenuOpen(false) // Close mobile menu after navigation
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="header__left">
          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <button 
              className="header__hamburger"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={24} />
            </button>
          )}
          
          <div className="header__logo">
            <div className="logo__text">ViRa's Lobby</div>
            {currentPage && <div className="header__page-title">{currentPage}</div>}
          </div>
        </div>
        
        <div className="header__actions">
          <button 
            className="header__action"
            onClick={() => navigate('/')}
            title="Home"
          >
            <Icon name="home" size={20} />
          </button>
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <aside 
        className={`main-layout__sidebar ${sidebarExpanded ? 'sidebar--expanded' : ''} ${mobileMenuOpen ? 'sidebar--mobile-open' : ''}`}
        onMouseEnter={() => !isMobile && setSidebarExpanded(true)}
        onMouseLeave={() => !isMobile && setSidebarExpanded(false)}
      >
        <nav className="sidebar__nav">
          {navigationItems.map((item) => (
            <div
              key={item.path}
              className={`sidebar__nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
              title={item.label}
            >
              <div className="sidebar__nav-icon">
                <Icon name={item.icon} size={20} />
              </div>
              <span className="sidebar__nav-text">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
      
      <main className="main-layout__content">
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default MainLayout 
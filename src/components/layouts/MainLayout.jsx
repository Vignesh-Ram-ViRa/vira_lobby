import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@components/atoms/Icon'
import ThemeToggle from '@components/molecules/ThemeToggle'
import ProfileDropdown from '@components/molecules/ProfileDropdown'
import './MainLayout.css'

const MainLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

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
  }

  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="header__logo">
          <span className="logo__text">
            ViRa's Lobby
            {currentPage && <span className="logo__page"> - {currentPage}</span>}
          </span>
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
      
      <aside 
        className={`main-layout__sidebar ${sidebarExpanded ? 'sidebar--expanded' : ''}`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <nav className="sidebar__nav">
          {navigationItems.map((item) => (
            <div
              key={item.path}
              className={`nav__item ${location.pathname === item.path ? 'nav__item--active' : ''}`}
              onClick={() => handleNavigation(item.path)}
              title={item.label}
            >
              <div className="nav__icon">
                <Icon name={item.icon} size={20} />
              </div>
              <span className="nav__label">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
      
      <main className="main-layout__content">
        {children}
      </main>
    </div>
  )
}

export default MainLayout 
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@components/atoms/Icon'
import { useAuth } from '@hooks/useAuth'
import { text } from '@constants/language'
import './ProfileDropdown.css'

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const dropdownRef = useRef(null)
  const { user, isGuest, logout } = useAuth()
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
    setIsOpen(false)
  }

  const handleAbout = () => {
    setShowAboutModal(true)
    setIsOpen(false)
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (isGuest) return 'G'
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  // Get user display name
  const getUserDisplayName = () => {
    if (isGuest) return 'Guest User'
    return user?.email?.split('@')[0] || 'User'
  }

  return (
    <>
      <div className="profile-dropdown" ref={dropdownRef}>
        <button
          className="profile-dropdown__trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="User menu"
          aria-expanded={isOpen}
        >
          <div className="profile-dropdown__avatar">
            {getUserInitials()}
          </div>
          <Icon name="chevron-down" size={14} className={`profile-dropdown__chevron ${isOpen ? 'open' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="profile-dropdown__menu"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* User Info */}
              <div className="profile-dropdown__user-info">
                <div className="profile-dropdown__user-avatar">
                  {getUserInitials()}
                </div>
                <div className="profile-dropdown__user-details">
                  <div className="profile-dropdown__user-name">
                    {getUserDisplayName()}
                  </div>
                  <div className="profile-dropdown__user-role">
                    {isGuest ? 'Guest' : user?.email}
                  </div>
                </div>
              </div>

              <div className="profile-dropdown__divider" />

              {/* Menu Items */}
              <div className="profile-dropdown__items">
                <button
                  className="profile-dropdown__item"
                  onClick={handleAbout}
                >
                  <Icon name="info" size={16} />
                  <span>About</span>
                </button>

                <button
                  className="profile-dropdown__item profile-dropdown__item--danger"
                  onClick={handleLogout}
                >
                  <Icon name="logout" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Modal - Placeholder for future implementation */}
      {showAboutModal && (
        <div className="about-modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal__header">
              <h2>About</h2>
              <button 
                className="about-modal__close"
                onClick={() => setShowAboutModal(false)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>
            <div className="about-modal__content">
              {isGuest ? (
                <div className="about-modal__guest">
                  <div className="guest-badge">Guest User</div>
                  <p>You're browsing as a guest. Create an account to manage your own hobby collections!</p>
                  <button 
                    className="about-modal__register-btn"
                    onClick={() => {
                      setShowAboutModal(false)
                      navigate('/login')
                    }}
                  >
                    Sign Up / Register
                  </button>
                </div>
              ) : (
                <div className="about-modal__user">
                  <div className="about-modal__lanyard">
                    <div className="lanyard-header">
                      <div className="lanyard-avatar">{getUserInitials()}</div>
                      <div className="lanyard-info">
                        <h3>{getUserDisplayName()}</h3>
                        <p>{user?.email}</p>
                        <span className="lanyard-role">Member</span>
                      </div>
                    </div>
                    <div className="lanyard-details">
                      <p>Welcome to ViRa's Lobby - your personal hobby management portal!</p>
                      {/* TODO: Add social media links, photo upload, additional details */}
                      <p><small>More details coming soon...</small></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileDropdown 
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@hooks/useAuth'
import { Icon } from '@components/atoms/Icon'
import { text } from '@constants/language'
import './ProfileDropdown.css'

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, isGuest, signOut, getUserRole, isOwner, isSuperAdmin } = useAuth()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut()
      setIsOpen(false)
      // Redirect will be handled by router protection
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Get user display info
  const getUserInfo = () => {
    if (isGuest) {
      return {
        name: 'Guest User',
        email: 'guest@vira-lobby.com',
        role: 'Guest',
        roleColor: 'var(--text-secondary)'
      }
    }

    if (user) {
      const role = getUserRole()
      const roleDisplay = role === 'super_admin' ? 'Super Admin' : 
                         role === 'owner' ? 'Owner' : 'User'
      
      return {
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        email: user.email,
        role: roleDisplay,
        roleColor: isSuperAdmin() ? '#FF6B6B' : 
                  isOwner() ? '#4ECDC4' : 'var(--text-secondary)'
      }
    }

    return null
  }

  const userInfo = getUserInfo()

  if (!userInfo) return null

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-dropdown__trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Profile Menu"
      >
        <div className="profile-avatar">
          {userInfo.name.charAt(0).toUpperCase()}
        </div>
        <Icon name="chevron-down" size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="profile-dropdown__menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* User Info Section */}
            <div className="profile-dropdown__header">
              <div className="profile-avatar profile-avatar--large">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <div className="profile-name">{userInfo.name}</div>
                <div className="profile-email">{userInfo.email}</div>
                <div 
                  className="profile-role"
                  style={{ color: userInfo.roleColor }}
                >
                  {userInfo.role}
                </div>
              </div>
            </div>

            <div className="profile-dropdown__divider" />

            {/* Menu Items */}
            <div className="profile-dropdown__items">
              {/* Profile Settings */}
              <button
                className="profile-dropdown__item"
                onClick={() => {
                  setIsOpen(false)
                  // Add profile settings navigation
                }}
              >
                <Icon name="user" size={16} />
                <span>Profile Settings</span>
              </button>

              {/* Preferences */}
              <button
                className="profile-dropdown__item"
                onClick={() => {
                  setIsOpen(false)
                  // Add preferences navigation
                }}
              >
                <Icon name="settings" size={16} />
                <span>Preferences</span>
              </button>

              {/* Help & Support */}
              <button
                className="profile-dropdown__item"
                onClick={() => {
                  setIsOpen(false)
                  // Add help navigation
                }}
              >
                <Icon name="help-circle" size={16} />
                <span>Help & Support</span>
              </button>

              {/* Super Admin Panel (only for super admin) */}
              {isSuperAdmin() && (
                <>
                  <div className="profile-dropdown__divider" />
                  <button
                    className="profile-dropdown__item profile-dropdown__item--admin"
                    onClick={() => {
                      setIsOpen(false)
                      // Add admin panel navigation
                    }}
                  >
                    <Icon name="shield" size={16} />
                    <span>Admin Panel</span>
                  </button>
                </>
              )}
            </div>

            <div className="profile-dropdown__divider" />

            {/* Logout */}
            <button
              className="profile-dropdown__item profile-dropdown__item--logout"
              onClick={handleLogout}
            >
              <Icon name="log-out" size={16} />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileDropdown 
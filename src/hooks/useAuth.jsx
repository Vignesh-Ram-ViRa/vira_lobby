import { useState, useEffect, useContext, createContext } from 'react'
import { supabase } from '@utils/supabase'

// Session timeout duration (30 minutes in milliseconds)
const SESSION_TIMEOUT = 30 * 60 * 1000

// Auth Context
const AuthContext = createContext()

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sessionTimer, setSessionTimer] = useState(null)

  // Session timeout management
  const startSessionTimer = () => {
    // Clear existing timer
    if (sessionTimer) {
      clearTimeout(sessionTimer)
    }
    
    // Set new timer
    const timer = setTimeout(async () => {
      console.log('Session expired - logging out')
      await signOut()
    }, SESSION_TIMEOUT)
    
    setSessionTimer(timer)
  }

  const clearSessionTimer = () => {
    if (sessionTimer) {
      clearTimeout(sessionTimer)
      setSessionTimer(null)
    }
  }

  // Reset session timer on user activity
  const resetSessionTimer = () => {
    if (user && !isGuest) {
      startSessionTimer()
    }
  }

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
          
          // Start session timer if user is logged in
          if (session?.user) {
            startSessionTimer()
          }
        }
      } catch (error) {
        if (mounted) {
          console.error('Error getting session:', error)
          setError(error.message)
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
          
          // Clear guest mode when user logs in
          if (session?.user) {
            setIsGuest(false)
            startSessionTimer()
          } else {
            clearSessionTimer()
          }
        }
      }
    )

    // Listen for user activity to reset session timer
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    
    const handleUserActivity = () => {
      resetSessionTimer()
    }

    activityEvents.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true })
    })

    // Handle page visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (tab switched, minimized, etc.)
        console.log('Page hidden - maintaining session')
      } else {
        // Page is visible again
        resetSessionTimer()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Handle beforeunload (tab/window close)
    const handleBeforeUnload = () => {
      // Note: In modern browsers, you can't make async calls here
      // The session will expire naturally due to timeout
      clearSessionTimer()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      mounted = false
      subscription.unsubscribe()
      clearSessionTimer()
      
      // Clean up event listeners
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleUserActivity)
      })
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) throw error
      
      // Clear guest mode on successful login
      setIsGuest(false)
      
      return { data, error: null }
    } catch (error) {
      setError(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign up function
  const signUp = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
            const { data, error } = await supabase.auth.signUp({ email, password })

      if (error) throw error
      
      return { data, error: null }
    } catch (error) {
      setError(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      // Clear all auth state
      setUser(null)
      setIsGuest(false)
      
      return { error: null }
    } catch (error) {
      setError(error.message)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Guest mode function
  const continueAsGuest = () => {
    setIsGuest(true)
    setUser(null)
    setError(null)
  }

  // Clear guest mode
  const clearGuestMode = () => {
    setIsGuest(false)
  }

  // Check user permissions
  const isOwner = () => {
    return user?.email === 'vickyram.vira@gmail.com'
  }

  const isSuperAdmin = () => {
    return user?.email === 'vigneshuramu@gmail.com'
  }

  const hasWriteAccess = () => {
    return isOwner() || isSuperAdmin()
  }

  const hasReadAccess = () => {
    return user || isGuest
  }

  // Get user role
  const getUserRole = () => {
    if (isSuperAdmin()) return 'super_admin'
    if (isOwner()) return 'owner'
    if (isGuest) return 'guest'
    return 'unauthenticated'
  }

  const value = {
    user,
    isGuest,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    continueAsGuest,
    clearGuestMode,
    isOwner,
    isSuperAdmin,
    hasWriteAccess,
    hasReadAccess,
    getUserRole,
    isAuthenticated: !!user || isGuest
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

export default useAuth 
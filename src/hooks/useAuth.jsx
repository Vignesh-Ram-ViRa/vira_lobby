import { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '@utils/supabase'

// Auth Context
const AuthContext = createContext()

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { session, error } = await auth.getSession()
        if (error) throw error
        
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
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
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
          
          // Clear guest mode when user logs in
          if (session?.user) {
            setIsGuest(false)
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await auth.signIn(email, password)
      
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
      
      const { data, error } = await auth.signUp(email, password)
      
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
      
      const { error } = await auth.signOut()
      
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
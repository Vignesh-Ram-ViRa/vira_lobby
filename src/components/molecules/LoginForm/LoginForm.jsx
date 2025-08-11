import React, { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import Button from '@components/atoms/Button'
import { Icon } from '@components/atoms/Icon'
import './LoginForm.css'

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, continueAsGuest, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await signIn(email, password)
    } catch (err) {
      console.error('Login failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestAccess = () => {
    continueAsGuest()
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-container">
          <div className="form-header">
            <h1>Welcome to ViRa's Lobby</h1>
            <p>Your personal hobbies portal</p>
            
            <div className="form-tabs">
              <button 
                className={`tab ${!isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
              <button 
                className={`tab ${isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? 'close' : 'theme'} size={18} />
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="signup-extras">
                <div className="checkbox-group">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                    I agree to the Terms and Conditions and Privacy Policy
                  </label>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
              className="submit-btn"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            <div className="divider">
              <span>or</span>
            </div>

            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={handleGuestAccess}
              className="guest-btn"
            >
              Continue as Guest
            </Button>

            <div className="form-footer">
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button 
                  type="button" 
                  className="link-btn"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm 
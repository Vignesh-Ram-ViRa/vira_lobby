
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

// Layouts
import AuthLayout from '@components/layouts/AuthLayout'
import MainLayout from '@components/layouts/MainLayout'

// Pages
import Login from '@pages/Login'
import Dashboard from '@pages/Dashboard'
import Bookworm from '@pages/Bookworm'
import Bingescape from '@pages/Bingescape'
import FilmFrenzy from '@pages/FilmFrenzy'
import OtakuHub from '@pages/OtakuHub'
import Wanderlog from '@pages/Wanderlog'
import Scribbles from '@pages/Scribbles'
import ShutterTales from '@pages/ShutterTales'
import SpotLight from '@pages/SpotLight'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isGuest } = useAuth()
  
  if (!user && !isGuest) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const AppRouter = () => {
  const { user, isGuest } = useAuth()

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/login" element={
        user || isGuest ? <Navigate to="/" replace /> : (
          <AuthLayout>
            <Login />
          </AuthLayout>
        )
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Hobby Category Routes */}
      <Route path="/bookworm" element={
        <ProtectedRoute>
          <MainLayout>
            <Bookworm />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/bingescape" element={
        <ProtectedRoute>
          <MainLayout>
            <Bingescape />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/film-frenzy" element={
        <ProtectedRoute>
          <MainLayout>
            <FilmFrenzy />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/otaku-hub" element={
        <ProtectedRoute>
          <MainLayout>
            <OtakuHub />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/wanderlog" element={
        <ProtectedRoute>
          <MainLayout>
            <Wanderlog />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/scribbles" element={
        <ProtectedRoute>
          <MainLayout>
            <Scribbles />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/shutter-tales" element={
        <ProtectedRoute>
          <MainLayout>
            <ShutterTales />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/spot-light" element={
        <ProtectedRoute>
          <MainLayout>
            <SpotLight />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './hooks/useAuth'
import AppRouter from './router'
import './styles/globals.css'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="app">
              <AppRouter />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
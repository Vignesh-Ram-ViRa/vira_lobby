import { createClient } from '@supabase/supabase-js'

// Supabase configuration - shared with ViRa Verse
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uqrlvppsnppobzowlcqw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcmx2cHBzbnBwb2J6b3dsY3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNjM3MTQsImV4cCI6MjA1MTkzOTcxNH0.h8VXhW2x9fSYqJMxOsHHK4w1K9oJ5kZ2eJGRpA8VwxI'

// Create Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      // Session will expire when browser closes
      persistSession: false,
      // Auto refresh tokens
      autoRefreshToken: true,
      // Detect session in URL
      detectSessionInUrl: true
    }
  }
)

/**
 * Upload image to Cloudinary via Supabase Edge Function
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} Cloudinary URL
 */
export const uploadImage = async (file) => {
  try {
    console.log('🔄 Starting image upload...', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    })

    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw new Error('User must be authenticated to upload images')
    }

    console.log('✅ User authenticated, uploading to Edge Function...')

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cloudinary-upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: formData,
    })

    console.log('📥 Edge Function Response Status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }))
      console.error('❌ Edge Function Error:', { status: response.status, errorData })
      
      // Provide helpful error messages based on status
      if (response.status === 404) {
        throw new Error('Upload service not found. The Edge Function may not be deployed yet.')
      } else if (response.status === 401) {
        throw new Error('Authentication failed. Please log in again.')
      } else if (response.status === 500) {
        throw new Error(`Server error: ${errorData.error || 'Internal server error'}`)
      } else {
        throw new Error(errorData.error || `Upload failed with status ${response.status}`)
      }
    }

    const data = await response.json()
    console.log('✅ Upload successful:', data)
    
    if (!data.url) {
      throw new Error('Invalid response: No URL returned from upload service')
    }
    
    return data.url
  } catch (error) {
    console.error('💥 Image upload failed:', error)
    throw error
  }
}

// Helper functions for authentication
export const auth = {
  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign up new user
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database query helpers
export const db = {
  // Generic select query
  select: (table, columns = '*') => {
    return supabase.from(table).select(columns)
  },

  // Generic insert query
  insert: (table, data) => {
    return supabase.from(table).insert(data)
  },

  // Generic update query
  update: (table, data, match) => {
    return supabase.from(table).update(data).match(match)
  },

  // Generic delete query
  delete: (table, match) => {
    return supabase.from(table).delete().match(match)
  },

  // Count records
  count: (table, column = '*') => {
    return supabase.from(table).select(column, { count: 'exact', head: true })
  }
}

// Hobby-specific database helpers
export const hobbyDb = {
  // Bookworm (Books)
  bookworm: {
    getAll: () => db.select('bookworm').order('created_at', { ascending: false }),
    getById: (id) => db.select('bookworm').eq('id', id).single(),
    create: (data) => db.insert('bookworm', data),
    update: (id, data) => db.update('bookworm', data, { id }),
    delete: (id) => db.delete('bookworm', { id }),
    search: (query) => db.select('bookworm').or(`title.ilike.%${query}%,authors.cs.{${query}},genres.cs.{${query}}`),
  },

  // Bingescape (Web Series)
  bingescape: {
    getAll: () => db.select('bingescape').order('created_at', { ascending: false }),
    getById: (id) => db.select('bingescape').eq('id', id).single(),
    create: (data) => db.insert('bingescape', data),
    update: (id, data) => db.update('bingescape', data, { id }),
    delete: (id) => db.delete('bingescape', { id }),
    search: (query) => db.select('bingescape').or(`title.ilike.%${query}%,description.ilike.%${query}%,genres.cs.{${query}}`),
  },

  // Film Frenzy (Movies)
  filmFrenzy: {
    getAll: () => db.select('film_frenzy').order('created_at', { ascending: false }),
    getById: (id) => db.select('film_frenzy').eq('id', id).single(),
    create: (data) => db.insert('film_frenzy', data),
    update: (id, data) => db.update('film_frenzy', data, { id }),
    delete: (id) => db.delete('film_frenzy', { id }),
    search: (query) => db.select('film_frenzy').or(`title.ilike.%${query}%,genres.cs.{${query}}`),
  },

  // Otaku Hub (Anime)
  otakuHub: {
    getAll: () => db.select('otaku_hub').order('created_at', { ascending: false }),
    getById: (id) => db.select('otaku_hub').eq('id', id).single(),
    create: (data) => db.insert('otaku_hub', data),
    update: (id, data) => db.update('otaku_hub', data, { id }),
    delete: (id) => db.delete('otaku_hub', { id }),
    search: (query) => db.select('otaku_hub').or(`title.ilike.%${query}%,genres.cs.{${query}}`),
  },

  // Wanderlog (Travel)
  wanderlog: {
    getAll: () => db.select('wanderlog').order('created_at', { ascending: false }),
    getById: (id) => db.select('wanderlog').eq('id', id).single(),
    create: (data) => db.insert('wanderlog', data),
    update: (id, data) => db.update('wanderlog', data, { id }),
    delete: (id) => db.delete('wanderlog', { id }),
    search: (query) => db.select('wanderlog').or(`city.ilike.%${query}%,country.ilike.%${query}%,attractions.cs.{${query}}`),
  },

  // Scribbles (Doodles & Sketches)
  scribbles: {
    getAll: () => db.select('scribbles').order('created_at', { ascending: false }),
    getById: (id) => db.select('scribbles').eq('id', id).single(),
    create: (data) => db.insert('scribbles', data).select(),
    update: (id, data) => db.update('scribbles', data, { id }).select(),
    delete: (id) => db.delete('scribbles', { id }),
    search: (query) => db.select('scribbles').or(`name.ilike.%${query}%,genre.ilike.%${query}%,category.ilike.%${query}%`),
  },

  // Shutter Tales (Photography)
  shutterTales: {
    getAll: () => db.select('shutter_tales').order('created_at', { ascending: false }),
    getById: (id) => db.select('shutter_tales').eq('id', id).single(),
    create: (data) => db.insert('shutter_tales', data),
    update: (id, data) => db.update('shutter_tales', data, { id }),
    delete: (id) => db.delete('shutter_tales', { id }),
    search: (query) => db.select('shutter_tales').or(`name.ilike.%${query}%,location.ilike.%${query}%,genre.ilike.%${query}%`),
  },

  // Spot Light (Personal Portfolio)
  spotLight: {
    getAll: () => db.select('spot_light').order('created_at', { ascending: false }),
    getById: (id) => db.select('spot_light').eq('id', id).single(),
    create: (data) => db.insert('spot_light', data),
    update: (id, data) => db.update('spot_light', data, { id }),
    delete: (id) => db.delete('spot_light', { id }),
    search: (query) => db.select('spot_light').or(`location.ilike.%${query}%,genre.ilike.%${query}%,category.ilike.%${query}%`),
  }
}

// File upload helper (for future Cloudinary integration)
export const storage = {
  upload: async (file, path) => {
    // This will be implemented with Cloudinary Edge Function
    console.log('File upload placeholder:', { file, path })
    return { data: null, error: new Error('File upload not implemented yet') }
  },

  delete: async (path) => {
    // This will be implemented with Cloudinary Edge Function
    console.log('File delete placeholder:', { path })
    return { error: new Error('File delete not implemented yet') }
  }
}

export default supabase 
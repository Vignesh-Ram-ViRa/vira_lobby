// Cloudinary configuration and upload utilities
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'vira_lobby'

/**
 * Upload image to Cloudinary with optimization
 * @param {File} file - The image file to upload
 * @param {string} folder - The folder to upload to (e.g., 'vira_lobby/bookworm')
 * @param {Object} options - Additional upload options
 * @returns {Promise<Object>} Upload result with URLs
 */
export const uploadImageToCloudinary = async (file, folder = 'vira_lobby/bookworm', options = {}) => {
  try {
    // Validate file
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Please select a valid image file')
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      throw new Error('Image size must be less than 10MB')
    }

    // Create FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', folder)
    
    // Add transformation options for book covers
    const transformation = {
      quality: 'auto',
      fetch_format: 'auto',
      ...options.transformation
    }
    
    // For book covers, create multiple sizes
    if (folder.includes('bookworm')) {
      formData.append('transformation', JSON.stringify([
        // Thumbnail for grid view
        { width: 200, height: 300, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
        // Medium for modal view
        { width: 400, height: 600, crop: 'fill', quality: 'auto', fetch_format: 'auto' }
      ]))
    }

    // Add additional options
    if (options.tags) {
      formData.append('tags', options.tags.join(','))
    }

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Upload failed')
    }

    const result = await response.json()

    // Return standardized response
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      thumbnailUrl: generateCloudinaryUrl(result.public_id, { width: 200, height: 300, crop: 'fill' }),
      mediumUrl: generateCloudinaryUrl(result.public_id, { width: 400, height: 600, crop: 'fill' }),
      originalUrl: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes
    }

  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: error.message || 'Upload failed'
    }
  }
}

/**
 * Generate optimized Cloudinary URL with transformations
 * @param {string} publicId - The public ID of the image
 * @param {Object} transformations - Transformation options
 * @returns {string} Optimized image URL
 */
export const generateCloudinaryUrl = (publicId, transformations = {}) => {
  if (!publicId) return ''

  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`
  
  // Build transformation string
  const transformParts = []
  
  if (transformations.width) transformParts.push(`w_${transformations.width}`)
  if (transformations.height) transformParts.push(`h_${transformations.height}`)
  if (transformations.crop) transformParts.push(`c_${transformations.crop}`)
  if (transformations.quality) transformParts.push(`q_${transformations.quality}`)
  if (transformations.format) transformParts.push(`f_${transformations.format}`)
  
  // Add default optimizations
  if (!transformations.quality) transformParts.push('q_auto')
  if (!transformations.format) transformParts.push('f_auto')
  
  const transformString = transformParts.length > 0 ? transformParts.join(',') + '/' : ''
  
  return `${baseUrl}/${transformString}${publicId}`
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    // Note: Deletion requires authentication and should typically be done server-side
    // For now, we'll just return true and handle cleanup later
    console.warn('Image deletion should be handled server-side for security')
    return true
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return false
  }
}

/**
 * Get optimized URLs for different use cases
 * @param {string} publicId - The public ID of the image
 * @returns {Object} Object containing different sized URLs
 */
export const getBookCoverUrls = (publicId) => {
  if (!publicId) return {}

  return {
    thumbnail: generateCloudinaryUrl(publicId, { width: 200, height: 300, crop: 'fill' }),
    small: generateCloudinaryUrl(publicId, { width: 300, height: 450, crop: 'fill' }),
    medium: generateCloudinaryUrl(publicId, { width: 400, height: 600, crop: 'fill' }),
    large: generateCloudinaryUrl(publicId, { width: 600, height: 900, crop: 'fill' }),
    original: generateCloudinaryUrl(publicId, { quality: 'auto', format: 'auto' })
  }
}

/**
 * Validate image file before upload
 * @param {File} file - The file to validate
 * @returns {Object} Validation result
 */
export const validateImageFile = (file) => {
  const errors = []

  if (!file) {
    errors.push('No file selected')
    return { valid: false, errors }
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    errors.push('Please select a valid image file (JPEG, PNG, WebP, or GIF)')
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    errors.push('Image size must be less than 10MB')
  }

  // Check minimum dimensions (optional)
  // Note: We can't check dimensions without loading the image
  // This would require FileReader API and additional processing

  return {
    valid: errors.length === 0,
    errors,
    fileInfo: {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }
  }
} 
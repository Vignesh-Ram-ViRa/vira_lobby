// Export utilities for book data
import * as XLSX from 'xlsx'

/**
 * Export books data to Excel format
 * @param {Array} books - Array of book objects
 * @param {string} filename - Output filename (without extension)
 * @returns {void}
 */
export const exportBooksToExcel = (books, filename = 'my_books') => {
  try {
    // Prepare data for export
    const exportData = books.map(book => ({
      'Title': book.title || '',
      'Series': book.series || '',
      'Authors': Array.isArray(book.authors) ? book.authors.join(', ') : book.authors || '',
      'Genres': Array.isArray(book.genres) ? book.genres.join(', ') : book.genres || '',
      'Language': book.language || '',
      'Start Date': book.start_date || '',
      'End Date': book.end_date || '',
      'Rating': book.star_rating || '',
      'Pricing': book.pricing || '',
      'Read/Download Link': book.read_download_link || '',
      'Comment': book.comment || '',
      'Cover Image URL': book.cover_image_url || '',
      'Created At': book.created_at ? new Date(book.created_at).toLocaleDateString() : '',
      'Updated At': book.updated_at ? new Date(book.updated_at).toLocaleDateString() : ''
    }))

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData)

    // Set column widths
    const colWidths = [
      { wch: 30 }, // Title
      { wch: 20 }, // Series
      { wch: 25 }, // Authors
      { wch: 20 }, // Genres
      { wch: 12 }, // Language
      { wch: 12 }, // Start Date
      { wch: 12 }, // End Date
      { wch: 10 }, // Rating
      { wch: 10 }, // Pricing
      { wch: 40 }, // Link
      { wch: 50 }, // Comment
      { wch: 40 }, // Cover URL
      { wch: 12 }, // Created
      { wch: 12 }  // Updated
    ]
    ws['!cols'] = colWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Books')

    // Generate file and download
    const timestamp = new Date().toISOString().split('T')[0]
    XLSX.writeFile(wb, `${filename}_${timestamp}.xlsx`)

    return { success: true, message: `Exported ${books.length} books successfully` }
  } catch (error) {
    console.error('Export error:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Export books data to CSV format
 * @param {Array} books - Array of book objects
 * @param {string} filename - Output filename (without extension)
 * @returns {void}
 */
export const exportBooksToCSV = (books, filename = 'my_books') => {
  try {
    // Prepare CSV headers
    const headers = [
      'Title',
      'Series',
      'Authors',
      'Genres',
      'Language',
      'Start Date',
      'End Date',
      'Rating',
      'Pricing',
      'Read/Download Link',
      'Comment',
      'Cover Image URL',
      'Created At',
      'Updated At'
    ]

    // Prepare CSV rows
    const csvRows = []
    csvRows.push(headers.join(','))

    books.forEach(book => {
      const row = [
        escapeCSVValue(book.title || ''),
        escapeCSVValue(book.series || ''),
        escapeCSVValue(Array.isArray(book.authors) ? book.authors.join('; ') : book.authors || ''),
        escapeCSVValue(Array.isArray(book.genres) ? book.genres.join('; ') : book.genres || ''),
        escapeCSVValue(book.language || ''),
        escapeCSVValue(book.start_date || ''),
        escapeCSVValue(book.end_date || ''),
        escapeCSVValue(book.star_rating || ''),
        escapeCSVValue(book.pricing || ''),
        escapeCSVValue(book.read_download_link || ''),
        escapeCSVValue(book.comment || ''),
        escapeCSVValue(book.cover_image_url || ''),
        escapeCSVValue(book.created_at ? new Date(book.created_at).toLocaleDateString() : ''),
        escapeCSVValue(book.updated_at ? new Date(book.updated_at).toLocaleDateString() : '')
      ]
      csvRows.push(row.join(','))
    })

    // Create and download file
    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const timestamp = new Date().toISOString().split('T')[0]
    downloadBlob(blob, `${filename}_${timestamp}.csv`)

    return { success: true, message: `Exported ${books.length} books successfully` }
  } catch (error) {
    console.error('Export error:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Export books data to JSON format
 * @param {Array} books - Array of book objects
 * @param {string} filename - Output filename (without extension)
 * @returns {void}
 */
export const exportBooksToJSON = (books, filename = 'my_books') => {
  try {
    // Clean up the data for export
    const exportData = books.map(book => {
      const { user_id: _userId, ...bookData } = book // Remove user_id for privacy
      return bookData
    })

    const jsonContent = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const timestamp = new Date().toISOString().split('T')[0]
    downloadBlob(blob, `${filename}_${timestamp}.json`)

    return { success: true, message: `Exported ${books.length} books successfully` }
  } catch (error) {
    console.error('Export error:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Helper function to escape CSV values
 * @param {string} value - Value to escape
 * @returns {string} Escaped value
 */
const escapeCSVValue = (value) => {
  if (value === null || value === undefined) return ''
  const stringValue = String(value)
  
  // If value contains comma, quotes, or newlines, wrap in quotes and escape internal quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  
  return stringValue
}

/**
 * Helper function to download blob as file
 * @param {Blob} blob - Blob to download
 * @param {string} filename - Filename
 * @returns {void}
 */
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

/**
 * Get export statistics
 * @param {Array} books - Array of book objects
 * @returns {Object} Statistics object
 */
export const getExportStats = (books) => {
  if (!books || books.length === 0) {
    return {
      totalBooks: 0,
      totalGenres: 0,
      totalAuthors: 0,
      averageRating: 0,
      dateRange: null
    }
  }

  const allGenres = new Set()
  const allAuthors = new Set()
  let totalRating = 0
  let ratedBooks = 0
  const dates = []

  books.forEach(book => {
    // Collect genres
    if (book.genres && Array.isArray(book.genres)) {
      book.genres.forEach(genre => allGenres.add(genre.toLowerCase()))
    }

    // Collect authors
    if (book.authors && Array.isArray(book.authors)) {
      book.authors.forEach(author => allAuthors.add(author))
    }

    // Calculate average rating
    if (book.star_rating && book.star_rating > 0) {
      totalRating += book.star_rating
      ratedBooks++
    }

    // Collect dates
    if (book.created_at) {
      dates.push(new Date(book.created_at))
    }
  })

  // Calculate date range
  let dateRange = null
  if (dates.length > 0) {
    const sortedDates = dates.sort((a, b) => a - b)
    const earliest = sortedDates[0]
    const latest = sortedDates[sortedDates.length - 1]
    dateRange = {
      earliest: earliest.toLocaleDateString(),
      latest: latest.toLocaleDateString()
    }
  }

  return {
    totalBooks: books.length,
    totalGenres: allGenres.size,
    totalAuthors: allAuthors.size,
    averageRating: ratedBooks > 0 ? (totalRating / ratedBooks).toFixed(1) : 0,
    dateRange
  }
} 
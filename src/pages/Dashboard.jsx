import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FeaturedCard from '@components/molecules/FeaturedCard'
import { text } from '@constants/language'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import './Dashboard.css'

const Dashboard = () => {
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const [hobbyStats, setHobbyStats] = useState({})

  const hobbyCategories = [
    'bookworm',
    'bingescape', 
    'filmFrenzy',
    'otakuHub',
    'wanderlog',
    'scribbles',
    'shutterTales',
    'spotLight'
  ]

  const getTableName = (hobby) => {
    const tableMap = {
      bookworm: 'bookworm',
      bingescape: 'bingescape',
      filmFrenzy: 'film_frenzy',
      otakuHub: 'otaku_hub',
      wanderlog: 'wanderlog',
      scribbles: 'scribbles',
      shutterTales: 'shutter_tales',
      spotLight: 'spot_light'
    }
    return tableMap[hobby]
  }

  const getUserId = () => {
    if (isSuperAdmin()) {
      // Super admin can see all records, return null to fetch all
      return null
    }
    if (isOwner() && user?.id) {
      return user.id
    }
    if (isGuest) {
      // For guests, we'll use the owner's ID to show their public records
      // TODO: Replace with actual owner's UUID after running the SQL
      return null // Return null for now until UUID is updated
    }
    return user?.id
  }

  const fetchHobbyStatistics = async () => {
    const stats = {}

    try {
      for (const hobby of hobbyCategories) {
        const tableName = getTableName(hobby)
        const userId = getUserId()

        // Skip if no user ID (guest without owner lookup)
        if (!userId) {
          stats[hobby] = {
            count: 0,
            topGenres: [],
            averageRating: 0,
            recentActivity: null
          }
          continue
        }

        // Count total items
        const { count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)

        // Get genres and ratings for calculations
        const { data: items } = await supabase
          .from(tableName)
          .select('genres, star_rating, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(100) // Limit for performance

        // Calculate statistics
        let topGenres = []
        let averageRating = 0
        let recentActivity = null

        if (items && items.length > 0) {
          // Calculate top genres
          const genreCount = {}
          items.forEach(item => {
            if (item.genres && Array.isArray(item.genres)) {
              item.genres.forEach(genre => {
                genreCount[genre] = (genreCount[genre] || 0) + 1
              })
            }
          })
          
          topGenres = Object.entries(genreCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([genre]) => genre)

          // Calculate average rating
          const ratingsSum = items
            .filter(item => item.star_rating)
            .reduce((sum, item) => sum + item.star_rating, 0)
          const ratingsCount = items.filter(item => item.star_rating).length
          averageRating = ratingsCount > 0 ? ratingsSum / ratingsCount : 0

          // Get most recent activity
          recentActivity = items[0] || null
        }

        stats[hobby] = {
          count: count || 0,
          topGenres,
          averageRating,
          recentActivity
        }
      }

      setHobbyStats(stats)
    } catch (error) {
      console.error('Error fetching hobby statistics:', error)
      // Set empty stats for all hobbies on error
      hobbyCategories.forEach(hobby => {
        stats[hobby] = {
          count: 0,
          topGenres: [],
          averageRating: 0,
          recentActivity: null
        }
      })
      setHobbyStats(stats)
    } finally {
      // Loading complete
    }
  }

  useEffect(() => {
    if (user || isGuest) {
      fetchHobbyStatistics()
    }
  }, [user, isGuest])



  return (
    <div className="dashboard-page">
      {/* Simple Title Section */}
      <section className="dashboard-header">
        <motion.div
          className="dashboard-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1>{text.dashboard.hero.title}</h1>
        </motion.div>
      </section>

      <div className="dashboard-content">
        {/* Featured Cards Row - Like the main cards in sample */}
        <section className="dashboard-section dashboard-featured">
          <motion.div 
            className="dashboard-featured__grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FeaturedCard
              hobby="bookworm"
              count={hobbyStats.bookworm?.count || 0}
              topGenres={hobbyStats.bookworm?.topGenres || []}
              averageRating={hobbyStats.bookworm?.averageRating || 0}
              recentActivity={hobbyStats.bookworm?.recentActivity}
              variant="large"
            />
            <FeaturedCard
              hobby="bingescape"
              count={hobbyStats.bingescape?.count || 0}
              topGenres={hobbyStats.bingescape?.topGenres || []}
              averageRating={hobbyStats.bingescape?.averageRating || 0}
              recentActivity={hobbyStats.bingescape?.recentActivity}
              variant="medium"
            />
            <FeaturedCard
              hobby="filmFrenzy"
              count={hobbyStats.filmFrenzy?.count || 0}
              topGenres={hobbyStats.filmFrenzy?.topGenres || []}
              averageRating={hobbyStats.filmFrenzy?.averageRating || 0}
              recentActivity={hobbyStats.filmFrenzy?.recentActivity}
              variant="medium"
            />
          </motion.div>
        </section>



        {/* Creative Cards Row - Like the colorful cards in sample */}
        <section className="dashboard-section dashboard-creative">
          <motion.div 
            className="dashboard-creative__grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FeaturedCard
              hobby="otakuHub"
              count={hobbyStats.otakuHub?.count || 0}
              topGenres={hobbyStats.otakuHub?.topGenres || []}
              averageRating={hobbyStats.otakuHub?.averageRating || 0}
              recentActivity={hobbyStats.otakuHub?.recentActivity}
              variant="medium"
            />
            <FeaturedCard
              hobby="wanderlog"
              count={hobbyStats.wanderlog?.count || 0}
              topGenres={hobbyStats.wanderlog?.topGenres || []}
              averageRating={hobbyStats.wanderlog?.averageRating || 0}
              recentActivity={hobbyStats.wanderlog?.recentActivity}
              variant="medium"
            />
            <FeaturedCard
              hobby="scribbles"
              count={hobbyStats.scribbles?.count || 0}
              topGenres={hobbyStats.scribbles?.topGenres || []}
              averageRating={hobbyStats.scribbles?.averageRating || 0}
              recentActivity={hobbyStats.scribbles?.recentActivity}
              variant="medium"
            />
          </motion.div>
        </section>

        {/* Prominent Photography Section */}
        <section className="dashboard-section dashboard-photography">
          <motion.div 
            className="dashboard-photography__grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FeaturedCard
              hobby="shutterTales"
              count={hobbyStats.shutterTales?.count || 0}
              topGenres={hobbyStats.shutterTales?.topGenres || []}
              averageRating={hobbyStats.shutterTales?.averageRating || 0}
              recentActivity={hobbyStats.shutterTales?.recentActivity}
              variant="medium"
            />
            <FeaturedCard
              hobby="spotLight"
              count={hobbyStats.spotLight?.count || 0}
              topGenres={hobbyStats.spotLight?.topGenres || []}
              averageRating={hobbyStats.spotLight?.averageRating || 0}
              recentActivity={hobbyStats.spotLight?.recentActivity}
              variant="medium"
            />
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard 
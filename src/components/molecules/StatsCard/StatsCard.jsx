import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@components/atoms/Icon'
import './StatsCard.css'

const StatsCard = ({ 
  title,
  value,
  subtitle,
  icon,
  trend = 0,
  chartData = [],
  className = '',
  variant = 'default' // 'default', 'featured', 'minimal', 'chart'
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  }

  const renderMiniChart = () => {
    if (chartData.length === 0) return null
    
    const max = Math.max(...chartData)
    const min = Math.min(...chartData)
    const range = max - min || 1

    return (
      <div className="stats-card__chart">
        {chartData.map((value, index) => {
          const height = ((value - min) / range) * 40 + 10
          return (
            <motion.div
              key={index}
              className="stats-card__chart-bar"
              initial={{ height: 0 }}
              animate={{ height: `${height}px` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{ height: `${height}px` }}
            />
          )
        })}
      </div>
    )
  }

  const renderTrendIndicator = () => {
    if (trend === 0) return null
    
    const isPositive = trend > 0
    return (
      <div className={`stats-card__trend ${isPositive ? 'stats-card__trend--up' : 'stats-card__trend--down'}`}>
        <Icon name={isPositive ? 'chevron-up' : 'chevron-down'} size={12} />
        <span>{Math.abs(trend)}%</span>
      </div>
    )
  }

  return (
    <motion.div
      className={`stats-card stats-card--${variant} ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="stats-card__background">
        <div className="stats-card__glow" />
        <div className="stats-card__pattern" />
      </div>

      <div className="stats-card__content">
        <div className="stats-card__header">
          {icon && (
            <motion.div 
              className="stats-card__icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name={icon} size={24} />
            </motion.div>
          )}
          <div className="stats-card__title-section">
            <h3 className="stats-card__title">{title}</h3>
            {subtitle && <p className="stats-card__subtitle">{subtitle}</p>}
          </div>
          {renderTrendIndicator()}
        </div>

        <div className="stats-card__body">
          <motion.div 
            className="stats-card__value"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {value}
          </motion.div>
          {renderMiniChart()}
        </div>
      </div>

      <div className="stats-card__decoration">
        <div className="stats-card__orb stats-card__orb--1" />
        <div className="stats-card__orb stats-card__orb--2" />
        <div className="stats-card__orb stats-card__orb--3" />
      </div>
    </motion.div>
  )
}

export default StatsCard 
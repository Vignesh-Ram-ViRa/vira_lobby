import React from 'react'
import { Icon } from '@components/atoms/Icon'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
    { name: 'Discord', icon: 'discord', url: 'https://discord.com' }
  ]

  return (
    <footer className="app-footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <h3 className="footer__brand-name">ViRa's Lobby</h3>
            <p className="footer__brand-tagline">Your Personal Entertainment Hub</p>
          </div>

          <div className="footer__social">
            <h4 className="footer__social-title">Connect with us</h4>
            <div className="footer__social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  title={link.name}
                  aria-label={`Visit our ${link.name}`}
                >
                  <Icon name={link.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer__info">
            <div className="footer__links">
              <a href="/privacy" className="footer__link">Privacy Policy</a>
              <a href="/terms" className="footer__link">Terms of Service</a>
              <a href="/support" className="footer__link">Support</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; {currentYear} ViRa's Lobby. All rights reserved.</p>
          </div>
          <div className="footer__version">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
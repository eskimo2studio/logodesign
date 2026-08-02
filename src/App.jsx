import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Menu, X, Mail } from 'lucide-react'
import './App.css'

const ANIMATION_EASE = [0.16, 1, 0.3, 1]

const MENU_ITEMS = [
  { path: '/', label: 'หน้าแรก' },
  { path: '/about', label: 'เกี่ยวกับเรา' },
  { path: '/portfolio', label: 'ผลงาน' },
  { path: '/services', label: 'บริการ' },
  { path: '/blog', label: 'บทความ' },
  { path: '/contact', label: 'ติดต่อเรา' },
]

const SOCIAL_LINKS = [
  { 
    href: 'https://www.facebook.com/eskimostudio', 
    label: 'Facebook', 
    icon: 'https://www.svgrepo.com/show/447133/facebook-fill.svg' 
  },
  { 
    href: 'https://lin.ee/pr7LIDO', 
    label: 'Line', 
    icon: 'https://www.svgrepo.com/show/81685/line-logo.svg' 
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app-container">
      {/* Background Video */}
      <motion.div
        className="video-wrapper"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: ANIMATION_EASE }}
        aria-hidden="true"
      >
        <video
          src="https://framerusercontent.com/assets/HQj5wQFNVEzimSwH0aJ2D3OIgvs.mp4"
          autoPlay
          muted
          playsInline
          loop
          aria-label="Background video"
        />
      </motion.div>

      {/* Navbar */}
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: ANIMATION_EASE }}
      >
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/" className="logo-link">
              <div className="logo">
                <img 
                  src="https://framerusercontent.com/images/eqYpXCpT1ZqOX4nZ9UXtG8cx0A.png?width=300&height=300" 
                  alt="Eskimo Logo - รับออกแบบโลโก้และแบรนด์" 
                  className="logo-image"
                  width="56"
                  height="56"
                />
                <span className="brand-text">eskimo</span>
              </div>
            </Link>

            <div className="tags-pill">
              <span className="tag-label">Logo Design</span>
              <span className="tag-label">Brand Identity</span>
            </div>
          </div>

          <div className="nav-right">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-button"
              aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={16} strokeWidth={2} className="menu-icon" />
              ) : (
                <Menu size={16} strokeWidth={2} className="menu-icon" />
              )}
              <span className="menu-text">{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Menu Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: ANIMATION_EASE }}
          className="menu-dropdown"
        >
          <div className="menu-content">
            {MENU_ITEMS.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="menu-item"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <motion.footer
        className="footer-wrapper"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: ANIMATION_EASE }}
      >
        <div className="footer-content">
          <div className="footer-left">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: ANIMATION_EASE }}
              className="subtitle-container"
            >
              <div className="dot" />
              <span className="subtitle">รับออกแบบโลโก้และแบรนด์มืออาชีพ</span>
            </motion.div>

            <motion.h1
              className="heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: ANIMATION_EASE }}
            >
              โลโก้บริษัท
              <br />
              โลโก้ร้าน แบรนด์
            </motion.h1>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: ANIMATION_EASE }}
              className="button-container"
            >
              <Link to="/portfolio" className="primary-button">ดูผลงาน</Link>
              <Link to="/contact" className="secondary-button">ติดต่อเรา</Link>
            </motion.div>
          </div>

          <div className="footer-right">
            <div className="social-container footer-social">
              {SOCIAL_LINKS.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-button"
                  aria-label={link.label}
                >
                  <img 
                    src={link.icon} 
                    alt={link.label} 
                    className="social-icon"
                  />
                  <span className="social-text">{link.label}</span>
                </a>
              ))}
              <a 
                href="mailto:eskimosendfile@gmail.com"
                className="social-button"
                aria-label="Email"
              >
                <Mail size={16} strokeWidth={2} />
                <span className="social-text">Email</span>
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App

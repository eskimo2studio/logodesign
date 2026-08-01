import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Menu, X, Mail } from 'lucide-react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // ตรวจจับการ scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={styles.container}>
      {/* Background Video */}
      <motion.div
        className="video-wrapper"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <video
          src="https://framerusercontent.com/assets/yE3wvxOcnLRjqC1MI8WwnNfzWwc.mp4"
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-content">
          <div style={styles.leftNav}>
            <a href="#/" style={styles.logoLink} aria-label="กลับหน้าแรก">
              <div style={styles.logo}>
                <img 
                  src="https://framerusercontent.com/images/eqYpXCpT1ZqOX4nZ9UXtG8cx0A.png?width=300&height=300" 
                  alt="Eskimo Logo - รับออกแบบโลโก้และแบรนด์" 
                  style={styles.logoImage}
                  width="56"
                  height="56"
                />
                <span className="brand-text">eskimo</span>
              </div>
            </a>

            <div className="tags-pill" role="text" aria-label="Services">
              <span style={styles.tagLabel}>Logo Design</span>
              <span style={styles.tagLabel}>Brand Identity</span>
            </div>
          </div>

          <div style={styles.rightNav}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={styles.menuButton}
              aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={16} strokeWidth={2} style={styles.menuIcon} aria-hidden="true" />
              ) : (
                <Menu size={16} strokeWidth={2} style={styles.menuIcon} aria-hidden="true" />
              )}
              <span style={styles.menuText}>{menuOpen ? 'Close' : 'Menu'}</span>
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
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="menu-dropdown"
          role="menu"
        >
          <div style={styles.menuContent}>
            <a href="#/" className="menu-item" style={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>หน้าแรก</a>
            <a href="#/about" className="menu-item" style={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>เกี่ยวกับเรา</a>
            <a href="#/portfolio" className="menu-item" style={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>ผลงาน</a>
            <a href="#/services" className="menu-item" style={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>บริการ</a>
            <a href="#/blog" className="menu-item" style={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>บทความ</a>
            <a href="#/contact" className="menu-item" style={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>ติดต่อเรา</a>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <motion.footer
        className="footer-wrapper"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        role="contentinfo"
      >
        <div className="footer-content">
          <div className="footer-left">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={styles.subtitleContainer}
            >
              <div style={styles.dot} aria-hidden="true" />
              <span style={styles.subtitle}>รับออกแบบโลโก้และแบรนด์มืออาชีพ</span>
            </motion.div>

            <motion.h1
              className="heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              โลโก้บริษัท
              <br />
              โลโก้ร้าน แบรนด์
            </motion.h1>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={styles.buttonContainer}
              role="group"
              aria-label="Call to action buttons"
            >
              <a href="#/portfolio" style={styles.primaryButton} aria-label="ดูผลงานของเรา">ดูผลงาน</a>
              <a href="#/contact" style={styles.secondaryButton} aria-label="ติดต่อเราเพื่อขอคำปรึกษา">ติดต่อเรา</a>
            </motion.div>
          </div>

          <div className="footer-right">
            <div style={styles.socialContainer} className="footer-social" role="list" aria-label="Social media links">
              <a 
                href="https://www.facebook.com/eskimostudio" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialButton}
                role="listitem"
                aria-label="Facebook"
              >
                <img 
                  src="https://www.svgrepo.com/show/447133/facebook-fill.svg" 
                  alt="Facebook" 
                  style={styles.socialIcon}
                />
                <span style={styles.socialText}>Facebook</span>
              </a>
              <a 
                href="https://lin.ee/pr7LIDO" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialButton}
                role="listitem"
                aria-label="Line"
              >
                <img
                  src="https://www.svgrepo.com/show/81685/line-logo.svg"
                  alt="Line"
                  style={styles.socialIcon}
                />
                <span style={styles.socialText}>Line</span>
              </a>
              <a 
                href="mailto:eskimosendfile@gmail.com"
                style={styles.socialButton}
                role="listitem"
                aria-label="Email"
              >
                <Mail size={16} strokeWidth={2} />
                <span style={styles.socialText}>Email</span>
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    background: '#ffffff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  leftNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoImage: {
    width: '56px',
    height: '56px',
    objectFit: 'contain',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#000000',
    borderRadius: '9999px',
    padding: '12px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  menuIcon: {
    color: '#ffffff',
  },
  menuText: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: 500,
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  menuContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '8px',
  },
  menuItem: {
    padding: '16px 20px',
    color: '#000000',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
    borderRadius: '8px',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
  tagLabel: {
    fontSize: '11px',
    color: '#000000',
    fontWeight: 400,
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  subtitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#000000',
  },
  subtitle: {
    fontSize: '13px',
    color: 'rgba(0, 0, 0, 0.55)',
    fontWeight: 400,
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  buttonContainer: {
    display: 'flex',
    gap: '12px',
  },
  primaryButton: {
    background: '#000000',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 500,
    padding: '14px 28px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
    textDecoration: 'none',
    display: 'inline-block',
  },
  secondaryButton: {
    background: 'transparent',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 500,
    padding: '14px 28px',
    borderRadius: '9999px',
    border: '1px solid rgba(0, 0, 0, 0.35)',
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
    textDecoration: 'none',
    display: 'inline-block',
  },
  copyright: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: 400,
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
    marginTop: '8px',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    flexWrap: 'wrap',
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: '#ffffff',
    color: '#000000',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  socialIcon: {
    width: '16px',
    height: '16px',
  },
  socialText: {
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
}

export default App

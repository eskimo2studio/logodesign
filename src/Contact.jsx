import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { Menu, X, Mail, Clock } from 'lucide-react'
import Footer from './components/Footer'
import './Contact.css'

// Animation counter component
function AnimatedCounter({ target, duration = 2 }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(target)
    }
  }, [motionValue, isInView, target])

  useEffect(() => {
    springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [springValue])

  return <span ref={ref}>{displayValue.toLocaleString()}</span>
}

function Contact() {
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
            <Link to="/" style={styles.logoLink} aria-label="กลับหน้าแรก">
              <div style={styles.logo}>
                <img 
                  src="https://framerusercontent.com/images/eqYpXCpT1ZqOX4nZ9UXtG8cx0A.png?width=300&height=300" 
                  alt="Eskimo Logo" 
                  style={styles.logoImage}
                  width="56"
                  height="56"
                />
                <span className="brand-text">eskimo</span>
              </div>
            </Link>

            <div className="tags-pill">
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
            <Link to="/" className="menu-item" style={styles.menuItem} role="menuitem">หน้าแรก</Link>
            <Link to="/about" className="menu-item" style={styles.menuItem} role="menuitem">เกี่ยวกับเรา</Link>
            <Link to="/portfolio" className="menu-item" style={styles.menuItem} role="menuitem">ผลงาน</Link>
            <Link to="/services" className="menu-item" style={styles.menuItem} role="menuitem">บริการ</Link>
            <Link to="/blog" className="menu-item" style={styles.menuItem} role="menuitem">บทความ</Link>
            <Link to="/contact" className="menu-item" style={styles.menuItem} role="menuitem">ติดต่อเรา</Link>
          </div>
        </motion.div>
      )}

      {/* Contact Content */}
      <main style={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={styles.header}
        >
          <h1 style={styles.title}>ติดต่อเรา</h1>
          <p style={styles.subtitle}>พร้อมช่วยคุณสร้างสรรค์แบรนด์ที่โดดเด่น</p>
        </motion.div>

        <div className="content-grid" style={styles.contentGrid}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={styles.formSection}
          >
            <h2 style={styles.sectionTitle}>ส่งข้อความถึงเรา</h2>
            <p style={styles.tagline}>
              บอกรายละเอียดงานที่ต้องการ เราจะเสนอแพ็คเก็จราคาให้เลือก คุณเลือกราคาที่เหมาะกับงบได้เลย
            </p>
            <div style={styles.buttonGroup}>
              <a 
                href="https://lin.ee/pr7LIDO" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.contactButton}
                className="contact-button"
              >
                <img 
                  src="https://www.svgrepo.com/show/81685/line-logo.svg" 
                  alt="Line" 
                  style={styles.lineIcon}
                />
                <div style={styles.buttonContent}>
                  <div style={styles.buttonTitle}>ติดต่อผ่าน Line</div>
                  <div style={styles.buttonDescription}>แชทกับเราได้ทันที</div>
                </div>
              </a>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSddLzS_wu97DYGS3CgAfQzpZQqtlWdHP5zd8XbEdT2PAJBosg/viewform?usp=dialog" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.contactButton}
                className="contact-button"
              >
                <Mail size={24} />
                <div style={styles.buttonContent}>
                  <div style={styles.buttonTitle}>กรอกฟอร์ม</div>
                  <div style={styles.buttonDescription}>ส่งข้อความถึงเราผ่านฟอร์ม</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={styles.infoSection}
          >
            <h2 style={styles.sectionTitle}>ข้อมูลการติดต่อ</h2>
            
            <div style={styles.infoCards}>
              <div style={styles.infoCard}>
                <div style={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 style={styles.infoTitle}>อีเมล</h3>
                  <a href="mailto:eskimosendfile@gmail.com" style={styles.infoText}>
                    eskimosendfile@gmail.com
                  </a>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.iconWrapper}>
                  <img 
                    src="https://www.svgrepo.com/show/81685/line-logo.svg" 
                    alt="Line" 
                    style={styles.lineIcon}
                  />
                </div>
                <div>
                  <h3 style={styles.infoTitle}>Line</h3>
                  <a href="https://lin.ee/pr7LIDO" target="_blank" rel="noopener noreferrer" style={styles.infoText}>
                    @eskimostudio
                  </a>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.iconWrapper}>
                  <img 
                    src="https://www.svgrepo.com/show/447133/facebook-fill.svg" 
                    alt="Facebook" 
                    style={styles.fbIcon}
                  />
                </div>
                <div>
                  <h3 style={styles.infoTitle}>Facebook</h3>
                  <a href="https://www.facebook.com/eskimostudio" target="_blank" rel="noopener noreferrer" style={styles.infoText}>
                    Eskimo Studio
                  </a>
                  <p style={styles.followers}>
                    ผู้ติดตาม <AnimatedCounter target={100000} />+
                  </p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.iconWrapper}>
                  <Clock size={24} />
                </div>
                <div>
                  <h3 style={styles.infoTitle}>เวลาทำการ</h3>
                  <p style={styles.infoText}>จันทร์ - ศุกร์: 9:00 - 18:00</p>
                  <p style={styles.infoText}>เสาร์ - อาทิตย์: 9:00 - 23:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    background: '#ffffff',
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
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '120px 16px 80px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    marginBottom: '16px',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '40px',
  },
  formSection: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  contactButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '32px',
    background: '#ffffff',
    border: '2px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    textDecoration: 'none',
    color: '#000000',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  buttonContent: {
    flex: 1,
    textAlign: 'left',
  },
  buttonTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '4px',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  buttonDescription: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  infoSection: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '12px',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  tagline: {
    fontSize: '15px',
    color: 'rgba(0, 0, 0, 0.6)',
    lineHeight: '1.6',
    marginBottom: '30px',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  infoCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  infoCard: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fbIcon: {
    width: '24px',
    height: '24px',
  },
  lineIcon: {
    width: '24px',
    height: '24px',
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  infoText: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.7)',
    textDecoration: 'none',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
    display: 'inline-block',
    marginBottom: '4px',
    marginRight: '8px',
  },
  followers: {
    fontSize: '14px',
    color: '#000000',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
    fontWeight: 500,
    display: 'inline-block',
    margin: 0,
  },
}

export default Contact

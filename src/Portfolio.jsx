import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Footer from './components/Footer'
import './Portfolio.css'

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [portfolioItems, setPortfolioItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  const sheetId = '1Im_TkYknVB1zOsqJlInAAv7PQyHYZfuh-K6mRNWXaxg'
  const gid = '0'

  const parseGvizResponse = (text) => {
    const jsonText = text.replace(/^.*?\(/s, '').replace(/\);?\s*$/, '')
    const json = JSON.parse(jsonText)
    const rows = json.table.rows || []

    return rows.map((row, index) => {
      const cells = row.c || []
      const image = cells[0]?.v || ''
      const title = cells[1]?.v || ''
      const tag = cells[2]?.v || ''

      return {
        id: index,
        image,
        title,
        tag,
      }
    }).filter(item => item.image || item.title || item.tag)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`
        const response = await fetch(url)
        const text = await response.text()
        const items = parseGvizResponse(text)
        setPortfolioItems(items)
      } catch (err) {
        setError('มีปัญหาในการโหลดผลงาน โปรดลองใหม่อีกครั้ง')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
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
            <a href="/" style={styles.logoLink} aria-label="กลับหน้าแรก">
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
            </a>

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
            <a href="/" className="menu-item" style={styles.menuItem} role="menuitem">หน้าแรก</a>
            <a href="/about" className="menu-item" style={styles.menuItem} role="menuitem">เกี่ยวกับเรา</a>
            <a href="/portfolio" className="menu-item" style={styles.menuItem} role="menuitem">ผลงาน</a>
            <a href="/services" className="menu-item" style={styles.menuItem} role="menuitem">บริการ</a>
            <a href="/blog" className="menu-item" style={styles.menuItem} role="menuitem">บทความ</a>
            <a href="/contact" className="menu-item" style={styles.menuItem} role="menuitem">ติดต่อเรา</a>
          </div>
        </motion.div>
      )}

      {/* Portfolio Content */}
      <main style={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={styles.header}
        >
          <h1 style={styles.title}>ผลงาน</h1>
          <p style={styles.subtitle}>รวมผลงานการออกแบบโลโก้และแบรนด์</p>
        </motion.div>

        {/* Masonry Grid */}
        {error ? (
          <div style={styles.errorMessage}>{error}</div>
        ) : (
          <div className="masonry-grid">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: (index % 10) * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={styles.card}
                whileHover={{ y: -8 }}
              >
                <div style={styles.cardImage}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={styles.image}
                    loading="lazy"
                  />
                </div>
                <div style={styles.cardContent}>
                  <span style={styles.category}>{item.tag}</span>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>กำลังโหลด...</p>
          </div>
        )}

        {!loading && !error && portfolioItems.length === 0 && (
          <div style={styles.endMessage}>
            <p>ยังไม่มีผลงานให้แสดง</p>
          </div>
        )}
      </main>

      {/* Footer */}
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
    maxWidth: '1400px',
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
  card: {
    breakInside: 'avoid',
    marginBottom: '20px',
    background: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  cardImage: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  cardContent: {
    padding: '20px',
  },
  category: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginTop: '8px',
    fontFamily: "'IBM Plex Sans Thai', sans-serif",
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#000000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  errorMessage: {
    padding: '40px',
    color: '#b00020',
    fontSize: '16px',
    textAlign: 'center',
  },
  endMessage: {
    textAlign: 'center',
    padding: '40px',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '14px',
  },
}

// Media queries in CSS
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @media (min-width: 640px) {
    .masonry-grid { column-count: 2; }
  }
  @media (min-width: 1024px) {
    .masonry-grid { column-count: 3; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`
document.head.appendChild(styleSheet)

export default Portfolio

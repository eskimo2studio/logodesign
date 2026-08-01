import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Footer from './components/Footer'
import './Services.css'

function Services() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [serviceItems, setServiceItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  const sheetId = '1CLrkwAO3cItnOnIe-1q8Vl88gkSZ4y8oqmcjSIolAuc'
  const gid = '0'

  const parseGvizResponse = (text) => {
    const jsonText = text.replace(/^.*?\(/s, '').replace(/\);?\s*$/, '')
    const json = JSON.parse(jsonText)
    const rows = json.table.rows || []

    return rows.map((row, index) => {
      const cells = row.c || []
      const image = cells[0]?.v || ''
      const title = cells[1]?.v || ''
      const description = cells[2]?.v || ''
      const price = cells[3]?.v || ''

      return {
        id: index,
        image,
        title,
        description,
        price,
      }
    }).filter(item => item.title || item.description || item.price || item.image)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`
        const response = await fetch(url)
        const text = await response.text()
        const items = parseGvizResponse(text)
        setServiceItems(items)
      } catch (err) {
        setError('มีปัญหาในการโหลดข้อมูลบริการ โปรดลองใหม่อีกครั้ง')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

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
      marginBottom: '80px',
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
      maxWidth: '600px',
      margin: '0 auto',
    },
    servicesGrid: {
      width: '100%',
    },
    serviceCard: {
      padding: '40px',
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '16px',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    serviceImageWrapper: {
      width: '100%',
      overflow: 'hidden',
      borderRadius: '16px',
      marginBottom: '24px',
      minHeight: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9fafb',
    },
    serviceImage: {
      width: '100%',
      height: 'auto',
      display: 'block',
      objectFit: 'cover',
    },
    serviceTitle: {
      fontSize: '24px',
      fontWeight: 700,
      marginBottom: '12px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    serviceDescription: {
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.6)',
      marginBottom: '24px',
      lineHeight: '1.6',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      marginBottom: '24px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '12px',
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.7)',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    checkIcon: {
      color: '#000000',
      flexShrink: 0,
      marginTop: '2px',
    },
    price: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#000000',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    errorMessage: {
      padding: '40px',
      color: '#b00020',
      fontSize: '16px',
      textAlign: 'center',
    },
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-content">
          <div style={styles.leftNav}>
            <a href="/" style={styles.logoLink}>
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
            <button onClick={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
              {menuOpen ? <X size={16} strokeWidth={2} style={styles.menuIcon} /> : <Menu size={16} strokeWidth={2} style={styles.menuIcon} />}
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
          className="menu-dropdown"
        >
          <div style={styles.menuContent}>
            <a href="/" className="menu-item" style={styles.menuItem}>หน้าแรก</a>
            <a href="/about" className="menu-item" style={styles.menuItem}>เกี่ยวกับเรา</a>
            <a href="/portfolio" className="menu-item" style={styles.menuItem}>ผลงาน</a>
            <a href="/services" className="menu-item" style={styles.menuItem}>บริการ</a>
            <a href="/blog" className="menu-item" style={styles.menuItem}>บทความ</a>
            <a href="/contact" className="menu-item" style={styles.menuItem}>ติดต่อเรา</a>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main style={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <h1 style={styles.title}>บริการของเรา</h1>
          <p style={styles.subtitle}>
            บริการออกแบบที่ครบวงจร ตอบโจทย์ทุกความต้องการของแบรนด์คุณ
          </p>
        </motion.div>

        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>กำลังโหลดข้อมูลบริการ...</p>
          </div>
        )}

        {error && (
          <div style={styles.errorMessage}>{error}</div>
        )}

        {!loading && !error && (
          <div className="services-masonry">
            {serviceItems.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card"
                style={styles.serviceCard}
                whileHover={{ y: -8, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              >
                {service.image && (
                  <div style={styles.serviceImageWrapper}>
                    <img src={service.image} alt={service.title} style={styles.serviceImage} />
                  </div>
                )}
                <h2 style={styles.serviceTitle}>{service.title}</h2>
                <p style={styles.serviceDescription}>{service.description}</p>
                {service.price && <div style={styles.price}>{service.price}</div>}
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Services

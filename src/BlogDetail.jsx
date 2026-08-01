import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Footer from './components/Footer'
import './BlogDetail.css'

// ฟังก์ชันดึงข้อมูลจาก Google Sheets
const fetchBlogPost = async (id) => {
  try {
    const sheetId = '1GhRZzTX3EwwZ3H-QnzljkepkUCOdddNLif0H3kRtmBM'
    const gid = '0'
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`
    
    const response = await fetch(url)
    const text = await response.text()
    const json = JSON.parse(text.substring(47).slice(0, -2))
    
    const row = json.table.rows[parseInt(id)]
    if (!row) return null
    
    const cells = row.c
    return {
      id: parseInt(id),
      date: cells[0]?.v || '',
      image: cells[1]?.v || '',
      title: cells[2]?.v || '',
      excerpt: cells[3]?.v || '',
      category: cells[4]?.v || '',
      content: [
        cells[5]?.v || '',
        cells[6]?.v || '',
        cells[7]?.v || '',
        cells[8]?.v || '',
        cells[9]?.v || '',
        cells[10]?.v || '',
        cells[11]?.v || '',
      ].filter(c => c) // กรองเฉพาะที่มีเนื้อหา
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// ฟังก์ชันแปลงวันที่จาก Google Sheets (รูปแบบ DD/MM/YY) เป็น Date object
const parseSheetDate = (dateString) => {
  if (!dateString) return new Date()
  
  // รูปแบบ: 31/7/26 หรือ 31/07/2026
  const parts = dateString.split('/')
  if (parts.length !== 3) return new Date()
  
  let day = parseInt(parts[0])
  let month = parseInt(parts[1]) - 1 // เดือนใน JS เริ่มที่ 0
  let year = parseInt(parts[2])
  
  // ถ้าปีเป็น 2 หลัก เช่น 26 = 2026
  if (year < 100) {
    year += 2000
  }
  
  return new Date(year, month, day)
}

// ฟังก์ชันแปลงวันที่เป็น relative time
const getRelativeTime = (dateString) => {
  const date = parseSheetDate(dateString)
  const today = new Date()
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.floor((normalizedToday - normalizedDate) / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)

  if (diffDays === 0) return ''
  if (diffDays === 1) return 'เมื่อวาน'
  if (diffDays === -1) return 'พรุ่งนี้'
  if (diffDays < 0) return `อีก ${Math.abs(diffDays)} วัน`
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`
  if (diffDays < 14) return 'สัปดาห์ที่แล้ว'
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return weeks === 1 ? 'สัปดาห์ที่แล้ว' : `${weeks} สัปดาห์ที่แล้ว`
  }
  if (diffMonths === 1) return 'เดือนที่แล้ว'
  if (diffMonths < 12) return `${diffMonths} เดือนที่แล้ว`

  const diffYears = Math.floor(diffMonths / 12)
  return diffYears === 1 ? 'ปีที่แล้ว' : `${diffYears} ปีที่แล้ว`
}

const isImageUrl = (value) => {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  return /^https?:\/\/.+\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(trimmed)
}

function BlogDetail() {
  const { id } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      const postData = await fetchBlogPost(id)
      setPost(postData)
      setLoading(false)
    }
    loadPost()
  }, [id])

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
      maxWidth: '800px',
      margin: '0 auto',
      padding: '120px 16px 80px',
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: 'rgba(0, 0, 0, 0.6)',
      textDecoration: 'none',
      fontSize: '14px',
      marginBottom: '32px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    category: {
      display: 'inline-block',
      padding: '6px 16px',
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: 500,
      marginBottom: '16px',
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 800,
      marginBottom: '16px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
      lineHeight: '1.2',
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '32px',
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.6)',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    featuredImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '16px',
      marginBottom: '40px',
    },
    content: {
      fontSize: '18px',
      lineHeight: '1.8',
      color: 'rgba(0, 0, 0, 0.8)',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
      marginBottom: '40px',
    },
    contentParagraph: {
      marginBottom: '24px',
      whiteSpace: 'pre-wrap',
    },
    contentImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '16px',
      marginBottom: '24px',
      objectFit: 'cover',
    },
    contactSection: {
      background: 'rgba(0, 0, 0, 0.02)',
      borderRadius: '16px',
      padding: '40px',
      marginBottom: '60px',
      textAlign: 'center',
    },
    contactTitle: {
      fontSize: '24px',
      fontWeight: 700,
      marginBottom: '12px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    contactDescription: {
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.6)',
      marginBottom: '24px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    contactButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    contactButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '14px 28px',
      background: '#000000',
      color: '#ffffff',
      borderRadius: '9999px',
      fontSize: '15px',
      fontWeight: 500,
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
      border: 'none',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
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
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    notFound: {
      textAlign: 'center',
      padding: '80px 20px',
    },
    notFoundTitle: {
      fontSize: '24px',
      fontWeight: 700,
      marginBottom: '16px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    notFoundText: {
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.6)',
      marginBottom: '24px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
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
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>กำลังโหลด...</p>
          </div>
        ) : !post ? (
          <div style={styles.notFound}>
            <h1 style={styles.notFoundTitle}>ไม่พบบทความ</h1>
            <p style={styles.notFoundText}>ขออภัย ไม่พบบทความที่คุณกำลังค้นหา</p>
            <a href="/blog" style={styles.contactButton}>กลับไปหน้าบทความ</a>
          </div>
        ) : (
          <>
            <a href="/blog" style={styles.backLink}>← กลับไปหน้าบทความ</a>
            
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={styles.category}>{post.category}</div>
              <h1 style={styles.title}>{post.title}</h1>
              
              <div style={styles.meta}>
                <span>{getRelativeTime(post.date)}</span>
              </div>

              <img 
                src={post.image} 
                alt={post.title}
                style={styles.featuredImage}
              />

              <div style={styles.content}>
                <p style={styles.contentParagraph}>{post.excerpt}</p>
                {post.content.map((paragraph, index) => (
                  isImageUrl(paragraph) ? (
                    <img
                      key={index}
                      src={paragraph.trim()}
                      alt={`blog-image-${index}`}
                      style={styles.contentImage}
                    />
                  ) : (
                    <p key={index} style={styles.contentParagraph}>{paragraph}</p>
                  )
                ))}
              </div>

              {/* Contact Section */}
              <div style={styles.contactSection}>
                <h3 style={styles.contactTitle}>สนใจบริการออกแบบของเรา?</h3>
                <p style={styles.contactDescription}>
                  ติดต่อเราวันนี้เพื่อขอคำปรึกษาและใบเสนอราคาฟรี
                </p>
                <div style={styles.contactButtons}>
                  <a href="https://lin.ee/pr7LIDO" target="_blank" rel="noopener noreferrer" style={styles.contactButton}>
                    ติดต่อผ่าน Line
                  </a>
                  <a href="/contact" style={{...styles.contactButton, background: 'transparent', color: '#000000', border: '1px solid rgba(0, 0, 0, 0.2)'}}>
                    ดูข้อมูลการติดต่อ
                  </a>
                </div>
              </div>
            </motion.article>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default BlogDetail

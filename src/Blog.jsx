import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Footer from './components/Footer'
import './Blog.css'

// ฟังก์ชันแปลง title เป็น URL slug
const titleToSlug = (title) => {
  return encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())
}

// ฟังก์ชันดึงข้อมูลจาก Google Sheets
const fetchBlogPosts = async () => {
  try {
    const sheetId = '1GhRZzTX3EwwZ3H-QnzljkepkUCOdddNLif0H3kRtmBM'
    const gid = '0' // Sheet แรก, เปลี่ยนถ้าใช้ sheet อื่น
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`
    
    const response = await fetch(url)
    const text = await response.text()
    
    // แปลง response จาก Google (มี prefix ที่ต้องตัดออก)
    const json = JSON.parse(text.substring(47).slice(0, -2))
    
    // แปลงข้อมูลเป็น array ของ blog posts
    const posts = json.table.rows.slice(1).map((row, index) => {
      const cells = row.c
      return {
        id: index + 1,
        date: cells[0]?.v || '',
        image: cells[1]?.v || '',
        title: cells[2]?.v || '',
        excerpt: cells[3]?.v || '',
        category: cells[4]?.v || '',
        content: {
          section1: cells[5]?.v || '',
          section2: cells[6]?.v || '',
          section3: cells[7]?.v || '',
          section4: cells[8]?.v || '',
          section5: cells[9]?.v || '',
          section6: cells[10]?.v || '',
          section7: cells[11]?.v || '',
        }
      }
    }).filter(post => post.title) // กรองเฉพาะที่มี title
    
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
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

function Blog() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      const posts = await fetchBlogPosts()
      setArticles(posts)
      setLoading(false)
    }
    loadPosts()
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
    articleCard: {
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
    },
    articleImage: {
      width: '100%',
      height: '240px',
      objectFit: 'cover',
    },
    articleContent: {
      padding: '24px',
    },
    articleMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '16px',
      fontSize: '13px',
      color: 'rgba(0, 0, 0, 0.5)',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    category: {
      display: 'inline-block',
      padding: '4px 12px',
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '9999px',
      fontSize: '11px',
      fontWeight: 500,
      marginBottom: '12px',
    },
    articleTitle: {
      fontSize: '20px',
      fontWeight: 700,
      marginBottom: '12px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
      lineHeight: '1.4',
    },
    articleExcerpt: {
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.6)',
      lineHeight: '1.6',
      marginBottom: '16px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
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
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      color: 'rgba(0, 0, 0, 0.5)',
      fontSize: '16px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    articleLink: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
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
            <Link to="/" style={styles.logoLink}>
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
            <Link to="/" className="menu-item" style={styles.menuItem}>หน้าแรก</Link>
            <Link to="/about" className="menu-item" style={styles.menuItem}>เกี่ยวกับเรา</Link>
            <Link to="/portfolio" className="menu-item" style={styles.menuItem}>ผลงาน</Link>
            <Link to="/services" className="menu-item" style={styles.menuItem}>บริการ</Link>
            <Link to="/blog" className="menu-item" style={styles.menuItem}>บทความ</Link>
            <Link to="/contact" className="menu-item" style={styles.menuItem}>ติดต่อเรา</Link>
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
          <h1 style={styles.title}>บทความ</h1>
          <p style={styles.subtitle}>
            เรียนรู้เทคนิคการออกแบบและแนวคิดในการสร้างแบรนด์ที่โดดเด่น
          </p>
        </motion.div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>กำลังโหลดบทความ...</p>
          </div>
        ) : articles.length === 0 ? (
          <div style={styles.emptyState}>
            <p>ยังไม่มีบทความในขณะนี้</p>
          </div>
        ) : (
          <div className="articles-grid-masonry">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={styles.articleCard}
                whileHover={{ y: -8, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              >
                <Link to={`/blog/${titleToSlug(article.title)}`} style={styles.articleLink}>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    style={styles.articleImage}
                  />
                  <div style={styles.articleContent}>
                    <div style={styles.category}>{article.category}</div>
                    <h2 style={styles.articleTitle}>{article.title}</h2>
                    <p style={styles.articleExcerpt}>{article.excerpt}</p>
                    <div style={styles.articleMeta}>
                      <span>{getRelativeTime(article.date)}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Blog

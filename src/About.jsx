import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Menu, X, Award, Users, Target, Zap } from 'lucide-react'
import Footer from './components/Footer'
import './About.css'

function About() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [stats, setStats] = useState({ clients: 0, followers: 0, years: 0 })
  const [countStarted, setCountStarted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!statsRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!countStarted) return

    let animationFrame
    const start = performance.now()
    const duration = 1200
    const target = { clients: 10000, followers: 100000, years: 10 }

    const animate = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      setStats({
        clients: Math.floor(target.clients * progress),
        followers: Math.floor(target.followers * progress),
        years: Math.floor(target.years * progress),
      })
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [countStarted])

  const faqs = [
    {
      question: 'Eskimo Studio ออกแบบอะไรบ้าง?',
      answer: 'เราเชี่ยวชาญงานออกแบบโลโก้ ฉลาก แพคเกจจิ้ง บรรจุภัณฑ์ และสื่อออนไลน์ครบวงจร เพื่อให้แบรนด์ของคุณโดดเด่นทั้งบนหน้าร้านและออนไลน์'
    },
    {
      question: 'ใช้เวลาทำงานกี่วันถึงจะได้งาน?',
      answer: 'เราทำงานรวดเร็วและเป็นระบบ ปกติเริ่มต้นด้วยการส่งคอนเซ็ปต์ภายใน 1-2 วัน ขึ้นกับขอบเขตงานและจำนวนรอบแก้ไข'
    },
    {
      question: 'มีบริการออกแบบแบรนด์ใหม่ทั้งหมดไหม?',
      answer: 'มีครบทั้งชื่อแบรนด์ โลโก้ แพคเกจจิ้ง สื่อออนไลน์ เว็บไซต์ และไกด์ไลน์การใช้งาน เพื่อให้แบรนด์เดินหน้าต่อได้อย่างมั่นใจ'
    },
    {
      question: 'รับงานทั้งลูกค้าไทยและต่างชาติหรือไม่?',
      answer: 'ใช่ เรามีผลงานออกแบบให้ลูกค้าทั้งไทยและต่างชาติ ด้วยประสบการณ์การทำงานที่เข้าใจทั้งตลาดไทยและสากล'
    },
    {
      question: 'ทำไมต้องเป็นชื่อ Eskimo?',
      answer: 'ชื่อและมาสคอตของเราได้แรงบันดาลใจจากความต่างสุดขั้ว เพื่อสื่อว่าการสร้างแบรนด์ต้องไม่เหมือนใคร และโอกาสต้องคว้าเร็วเหมือนไอศกรีมที่กำลังละลาย'
    }
  ]

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const features = [
    {
      icon: <Award size={32} />,
      title: 'มืออาชีพ',
      description: 'ทีมดีไซเนอร์มากประสบการณ์กว่า 10 ปี'
    },
    {
      icon: <Users size={32} />,
      title: 'ลูกค้ามากกว่า 1000+',
      description: 'ความไว้วางใจจากลูกค้าทั่วประเทศ'
    },
    {
      icon: <Target size={32} />,
      title: 'ตรงใจทุกความต้องการ',
      description: 'ออกแบบตามสไตล์และเอกลักษณ์ของคุณ'
    },
    {
      icon: <Zap size={32} />,
      title: 'ส่งงานรวดเร็ว',
      description: 'ทำงานเร็ว คุณภาพสูง ตรงเวลา'
    }
  ]

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
    content: {
      marginBottom: '80px',
    },
    section: {
      marginBottom: '60px',
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '24px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    paragraph: {
      fontSize: '18px',
      lineHeight: '1.8',
      color: 'rgba(0, 0, 0, 0.7)',
      marginBottom: '16px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    storyGrid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '40px',
      alignItems: 'center',
      marginBottom: '40px',
    },
    storyText: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    videoWrapper: {
      width: '100%',
      aspectRatio: '1 / 1',
      maxWidth: '520px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    },
    storyVideo: {
      width: '100%',
      height: '100%',
      display: 'block',
      objectFit: 'cover',
    },
    statGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    statCard: {
      background: '#f9fafb',
      borderRadius: '20px',
      padding: '28px',
      textAlign: 'center',
      boxShadow: '0 16px 40px rgba(0,0,0,0.04)',
    },
    statNumber: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 800,
      color: '#000000',
      marginBottom: '12px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    statLabel: {
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.7)',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    faqGrid: {
      display: 'grid',
      gap: '16px',
    },
    faqItem: {
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '18px',
      overflow: 'hidden',
    },
    faqQuestion: {
      width: '100%',
      padding: '20px',
      background: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer',
      border: 'none',
      textAlign: 'left',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    faqAnswer: {
      padding: '20px',
      background: '#fbfbfb',
      fontSize: '15px',
      lineHeight: 1.8,
      color: 'rgba(0, 0, 0, 0.75)',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginTop: '60px',
    },
    featureCard: {
      padding: '32px',
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '16px',
      textAlign: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    featureIcon: {
      marginBottom: '16px',
      color: '#000000',
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '12px',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    featureDescription: {
      fontSize: '15px',
      color: 'rgba(0, 0, 0, 0.6)',
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <h1 style={styles.title}>เกี่ยวกับเรา</h1>
          <p style={styles.subtitle}>
            เราคือทีมดีไซเนอร์มืออาชีพที่ช่วยสร้างสรรค์แบรนด์ที่โดดเด่นให้กับธุรกิจของคุณ
          </p>
        </motion.div>

        <div style={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={styles.section}
          >
            <h2 style={styles.sectionTitle}>เรื่องราวของ Eskimo Studio</h2>
            <div style={styles.storyGrid}>
              <div style={styles.storyText}>
                <p style={styles.paragraph}>
                  Eskimo Studio ก่อตั้งขึ้นจากไอเดียที่อยากสร้างชื่อและตัวการ์ตูนที่ตรงข้ามกับบรรยากาศเมืองไทย
                  เราเลือกใช้ความหนาวสุดขั้วเป็นแรงบันดาลใจ เพื่อให้แบรนด์ของลูกค้าดูโดดเด่น และมีความจำง่ายในตลาด
                </p>
                <p style={styles.paragraph}>
                  มาสคอตของเราเป็นน้อง Eskimo ที่หัวเป็นไอศกรีม ที่กำลังละลาย เปรียบเหมือนโอกาสทางธุรกิจ
                  ที่ต้องรีบคว้าไว้ก่อนจะละลายไป
                </p>
                <p style={styles.paragraph}>
                  เราเป็นสตูดิโอออกแบบที่รับทำทั้งโลโก้ ฉลาก แพคเกจจิ้ง เว็บไซต์ และสื่อออนไลน์
                  เพื่อช่วยให้แบรนด์ใหม่เริ่มต้นได้อย่างมั่นใจและเป็นมืออาชีพ
                </p>
                <p style={styles.paragraph}>
                  ด้วยประสบการณ์ 10 ปี เราออกแบบมากกว่า 10,000 โลโก้ ให้ทั้งลูกค้าชาวไทยและต่างชาติ
                  พร้อมคว้ารางวัลการประกวดจากหลายเวที
                </p>
              </div>
              <div style={styles.videoWrapper}>
                <video
                  style={styles.storyVideo}
                  src="https://framerusercontent.com/assets/yE3wvxOcnLRjqC1MI8WwnNfzWwc.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={styles.section}
          >
            <h2 style={styles.sectionTitle}>ตัวเลขที่พิสูจน์ผลงาน</h2>
            <div style={styles.statGrid}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{stats.clients.toLocaleString()}+</div>
                <div style={styles.statLabel}>ลูกค้ามากกว่า</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{stats.followers.toLocaleString()}+</div>
                <div style={styles.statLabel}>ผู้ติดตาม</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{stats.years}+ ปี</div>
                <div style={styles.statLabel}>ประสบการณ์</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={styles.section}
          >
            <h2 style={styles.sectionTitle}>ทำไมต้องเลือก Eskimo Studio</h2>
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  style={styles.featureCard}
                  whileHover={{ y: -8, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                >
                  <div style={styles.featureIcon}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={styles.section}
          >
            <h2 style={styles.sectionTitle}>คำถามที่พบบ่อย</h2>
            <div style={styles.faqGrid}>
              {faqs.map((item, index) => (
                <div key={index} style={styles.faqItem}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    style={styles.faqQuestion}
                    aria-expanded={openFaq === index}
                  >
                    <span>{item.question}</span>
                    <span>{openFaq === index ? '-' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div style={styles.faqAnswer}>{item.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default About

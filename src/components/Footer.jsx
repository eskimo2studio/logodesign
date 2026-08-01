import { Mail } from 'lucide-react'

function Footer() {
  const styles = {
    footer: {
      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      background: '#ffffff',
    },
    footerContent: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    copyright: {
      fontSize: '12px',
      color: 'rgba(0, 0, 0, 0.5)',
      fontFamily: "'IBM Plex Sans Thai', sans-serif",
    },
    socialContainer: {
      display: 'flex',
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
  }

  return (
    <footer className="page-footer" style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.copyright} className="footer-copyright">
          © {new Date().getFullYear()} eskimo all rights reserved.
        </div>
        <div style={styles.socialContainer} className="footer-social">
          <a 
            href="https://www.facebook.com/eskimostudio" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialButton}
            className="social-button"
          >
            <img 
              src="https://www.svgrepo.com/show/447133/facebook-fill.svg" 
              alt="Facebook" 
              style={styles.socialIcon}
            />
            <span>Facebook</span>
          </a>
          <a 
            href="https://lin.ee/pr7LIDO" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialButton}
            className="social-button"
          >
            <img 
              src="https://www.svgrepo.com/show/81685/line-logo.svg" 
              alt="Line" 
              style={styles.socialIcon}
            />
            <span>Line</span>
          </a>
          <a 
            href="mailto:eskimosendfile@gmail.com"
            style={styles.socialButton}
            className="social-button"
          >
            <Mail size={16} strokeWidth={2} />
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

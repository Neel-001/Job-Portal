import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Twitter, Linkedin, Github } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Browse Jobs', to: '/jobs' },
        { label: 'Find Talent', to: '/browse' },
        { label: 'Post a Job', to: '/admin/jobs/create' },
        { label: 'Companies', to: '/admin/companies' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/' },
        { label: 'Careers', to: '/' },
        { label: 'Blog', to: '/' },
        { label: 'Contact', to: '/' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '/' },
        { label: 'Terms of Service', to: '/' },
        { label: 'Cookie Policy', to: '/' },
        { label: 'Security', to: '/' },
      ]
    },
  ];

  return (
    <footer style={{
      backgroundColor: '#0F172A',
      borderTop: '1px solid #1E293B',
      paddingTop: '64px',
      paddingBottom: '32px',
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '48px',
          marginBottom: '64px',
        }}>
          {/* Brand column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#2563EB',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Briefcase size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#F8FAFC', letterSpacing: '-0.02em' }}>
                Talent<span style={{ color: '#2563EB' }}>Nest</span>
              </span>
            </Link>
            <p style={{
              color: '#64748B',
              fontSize: '14px',
              lineHeight: '1.6',
              maxWidth: '220px',
              marginBottom: '24px',
            }}>
              The professional hiring platform connecting top talent with world-class companies.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748B',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#F8FAFC'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748B'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h3 style={{
                color: '#F8FAFC',
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
                marginTop: 0,
              }}>
                {title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{
                        color: '#64748B',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => e.target.style.color = '#94A3B8'}
                      onMouseLeave={e => e.target.style.color = '#64748B'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #1E293B',
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
            © {currentYear} TalentNest, Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a
                key={item}
                href="#"
                style={{ color: '#475569', textDecoration: 'none', fontSize: '13px', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#94A3B8'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

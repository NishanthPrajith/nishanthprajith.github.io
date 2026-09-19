import './footer.scss';

import { Link } from 'react-router-dom';
import FooterLogo from '../footer-logo/footer-logo';
import { Fragment } from 'react/jsx-runtime';

export default function Footer() {
  const footerLinks = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nishanth-prajith/',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/NishanthPrajith',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/nishanthprajith/',
    },
  ];

  return (
    <div className="footer" id="footer">
      <FooterLogo />
      <div className="footer-section">
        <p>51° 30' 26.67" N, 0° 7' 39.72" W</p>
        <div className="footer-links">
          {footerLinks.map((link, idx) => (
            <Fragment key={link.label}>
              <Link to={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Link>
              {idx < footerLinks.length - 1 && (
                <span key={`${link.label}-separator`}> · </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

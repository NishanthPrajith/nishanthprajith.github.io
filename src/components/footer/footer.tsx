import './footer.scss';

import { Link } from 'react-router-dom';

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
    <footer>
      <div>
        <p className="footer-center-email">
          <Link to="mailto:nishanth.prajith@gmail.com" className="email-pill">
            nishanth.prajith@gmail.com
          </Link>
        </p>
      </div>
      <div className="footer-grid">
        {footerLinks.map((link) => (
          <Link to={link.url} key={link.label}>
            {link.label}
          </Link>
        ))}
      </div>
      <p className="footer-copy">
        Copyright &copy; {new Date().getFullYear()} Nishanth Prajith
      </p>
    </footer>
  );
}

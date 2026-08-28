import Button from '../button/button';
import './footer.scss';

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <p className="footer-center-email">
        <Link to="mailto:nishanth.prajith@gmail.com" className="email-pill">
          nishanth.prajith@gmail.com
        </Link>
      </p>
      <p className="footer-center-copyright">
        &copy; {new Date().getFullYear()} Nishanth Prajith •{' '}
        <Link to="https://www.linkedin.com/in/nishanth-prajith/">LinkedIn</Link>{' '}
        • <Link to="https://github.com/NishanthPrajith">GitHub</Link> •{' '}
        <Link to="https://www.instagram.com/nishanthprajith/">Instagram</Link>
      </p>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="socials">
        <Link to="https://www.linkedin.com/in/nishanth-prajith/">
          <i className="fa-brands fa-linkedin"></i>
        </Link>
        <Link to="https://github.com/NishanthPrajith">
          <i className="fa-brands fa-github"></i>
        </Link>
        <Link to="https://www.instagram.com/nishanthprajith/">
          <i className="fa-brands fa-instagram"></i>
        </Link>
        <Link to="mailto:nishanthprajith@gmail.com">
          <i className="fa-solid fa-envelope"></i>
        </Link>
      </div>
      <p className="footer-center-copyright">
        Nishanth Prajith &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

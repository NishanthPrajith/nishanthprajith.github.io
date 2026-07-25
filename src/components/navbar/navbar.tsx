import Logo from '../logo/logo.component';
import './navbar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="logo">
      <Link to="/">
        <Logo />
      </Link>
    </nav>
  );
}

import './navbar.scss';

import Logo from '../logo/logo';
import { Link } from 'react-router-dom';

export default function NavBar({
  color = 'var(--black-color)',
}: {
  color?: string;
}) {
  return (
    <nav className="logo">
      <Link to="/">
        <Logo color={color} />
      </Link>
    </nav>
  );
}

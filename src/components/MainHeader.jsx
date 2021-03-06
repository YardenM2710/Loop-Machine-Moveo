import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToggleButton } from '@mui/material';
import { Audiotrack, Home, Menu } from '@mui/icons-material';

export function MainHeader() {
  const [letters, setLetters] = useState([
    'L',
    'O',
    'O',
    'P',
    'M',
    'A',
    'C',
    'H',
    'I',
    'N',
    'E',
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <header className="app-header">
      <div className="logo bounce">
        {letters.map((letter, idx) => (
          <span key={idx} className="letter">
            {letter}
          </span>
        ))}
      </div>

      <ToggleButton
        className="hamburger"
        onClick={toggleNavBar}
        value="menu"
        aria-label="menu"
      >
        <Menu />
      </ToggleButton>

      <div
        onClick={toggleNavBar}
        className={isOpen ? 'screen' : 'invisible'}
      ></div>

      <nav className={isOpen ? 'nav-bar open' : 'nav-bar'}>
        <Link to="/">
          <Button
            value="hpme"
            aria-label="home"
            style={{ textTransform: 'none' }}
            variant="text"
          >
            Home <Home />
          </Button>
        </Link>
        <Link to="/audio">
          <Button
            value="loop"
            aria-label="loop"
            style={{ textTransform: 'none' }}
            variant="text"
          >
            Looper <Audiotrack />
          </Button>
        </Link>
      </nav>
    </header>
  );
}

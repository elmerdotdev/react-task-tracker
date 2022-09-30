import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/completed">Completed Tasks</Link>
      </div>
      <p>Copyright &copy; 2022</p>
    </footer>
  );
};

export default Footer;

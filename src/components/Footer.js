import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <p>Copyright &copy; 2022</p>
        <Link to="/about">About</Link>
        <Link to="/completed">Completed Tasks</Link>
    </footer>
  )
}

export default Footer
import { Link } from "react-router-dom";
export default function Footer() {

  return (
    <footer>
      <p>&copy; 2023 Beluga. All rights reserved.</p>
      <Link to='/'>
        <img src="../public/beluga.png" alt="Beluga" />
      </Link>
    </footer>
  )
}
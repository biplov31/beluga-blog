import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../src/UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const { setUserInfo } = useContext(UserContext); // setting context information
 
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch('/home/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include', // if we have any cookie, it will be considered a credential and included in the subsequent requests
        mode: 'cors',
      })
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setUserInfo(data);
        setRedirect(true);
      } else {
        setError(data);
      }
    } catch (err) {
      console.error(err.message);
    }  
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <div className="error-container">{error}</div>}
      <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button>Login</button>
    </form>
  )
}
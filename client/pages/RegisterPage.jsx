import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../src/UserContext";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const { setUserInfo } = useContext(UserContext);

  async function handleRegister(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      mode: 'cors'
    })
    const data = await response.json();
    console.log(data)
    if (response.ok) {
      setUserInfo(data);
      setRedirect(true);
    } else {
      setError(data);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  function comparePasswords() {
    if (password !== rePassword) {
      setError('Passwords do not match.');
    } else {
      setError(null);
    }
  }
  
  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <div className="error-container">{error}</div>}
      <label>Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <label>Confirm password: <input type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} onBlur={comparePasswords} /></label>
      <button>Register</button>
    </form>
  )
}
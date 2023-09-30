import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../src/UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  // useEffect expects a cleanup function or 'undefined' to be returned, not a Promise so we should not mark the callback function as 'async'
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost:4000/profile', {
  //       credentials: 'include'
  //     });
  //     const userInfo = await response.json();
  // setUsername may not wait for userInfo to be fully resolved and may update the state with incomplete data
  //     if (userInfo) {
  //       setUsername(userInfo.username);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetch('/user/profile', {
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        response.json().then(info => {
          setUserInfo(info);
        })
      }
    })
  }, [])

  function handleLogout() {
    fetch('/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(response => {
      setUserInfo(null);
      response.json().then(message => {
        console.log(message);
        // window.location.reload()
      })
    })
  }

  const username = userInfo?.username; // userInfo can sometimes be null, so we use optional chaining

  return (
    <header>
      <Link to="/" className="logo">
        Beluga
        <img src="/beluga (1).png" alt="Beluga" />
      </Link>
      <nav>
        {username && (
          <>
            <span className="username">{username}</span>
            <Link to="/createpost">Create new post</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
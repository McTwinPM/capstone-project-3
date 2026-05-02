import { useState, useEffect } from 'react'
import Login from './pages/Login'
import CharacterVault from './pages/CharacterVault'
import Initiative from './pages/Initiative'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/me", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
        }
      });
    }, []);

  const onLogin = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user);
  }

  if (!user) return <Login onLogin={onLogin} />

  return (
    <>
      <Navbar setUser={setUser} />
      <main>
        <h1>Welcome, {user.username}!</h1>
        <Routes>
          <Route path='/' element={<Initiative />} />
          <Route path='/characters' element={<CharacterVault />} />
        </Routes>
      </main>
    </>
  )
}

export default App

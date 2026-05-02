import { useState } from 'react';


function SignupForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch('api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
        .then((res) => {
          if (res.ok) {
            return res.json().then(({ access_token }) => {
                fetch('api/me', {
                    headers: { Authorization: `Bearer ${access_token}` 
                },
                })
                    .then(userRes => {
                        if (userRes.ok) {
                            return userRes.json();
                        }
                        throw new Error('Failed to fetch user data');
                    })
                    .then(user => {
                        onLogin(user, access_token);
                    })
                    .catch(err => {
                        console.error('Error fetching user data:', err);
                        alert('Signup successful, but failed to fetch user data. Please try logging in.');
                    });
            });
          } else {
            res.json().then(({ error }) => alert(error));
          }
        })
        .catch((err) => alert('Network error: ' + err.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Username:</label>
        <input
          className='signup-username-input'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          className='signup-password-input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className='signup-button' type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
            res.json().then(({ access_token }) => {
                fetch('/api/me', {
                    headers: { 
                        'Authorization': `Bearer ${access_token}` 
                }
            })
                .then(userRes => {
                    if (userRes.ok) {
                        return userRes.json();
                    } else {
                        return userRes.json().then(errorData => {
                            throw new Error(`Failed to fetch user data: ${errorData.error || userRes.status}`);
                        }).catch(() => {
                            throw new Error(`Failed to fetch user data: ${userRes.status}`);
                        });
                    }
                })
                .then(user => {
                    onLogin(user, access_token);
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                    setError('Login successful but failed to load user data: ' + err.message);
                });
                        });
                    } else {
                        res.json().then(({ error }) => setError(error));
                    }
                })
                .catch((err) => setError('Network error: ' + err.message));
            }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label className= 'login-username-label'>Username:</label>
                <input className= 'login-username-input'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className= 'login-password-label'>Password:</label>
                <input className= 'login-password-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}


export default LoginForm;
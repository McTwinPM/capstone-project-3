import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();

    const handleLogin = (user, access_token) => {
        localStorage.setItem('token', access_token);
        onLogin(user, access_token);
        navigate('/');
    }

    return (
        <div>
            <h1 className="login-title">Login</h1>
            {showLogin ? (
                <>
                <LoginForm className='login-form' onLogin={handleLogin} />
                <button className='toggle-button' onClick={() => setShowLogin(false)}>Don't have an account? Sign Up</button>
                </>
            ) : (
                <>
                <SignupForm className='signup-form' onLogin={handleLogin} />
                <button className='toggle-button' onClick={() => setShowLogin(true)}>Already have an account? Log In</button>
                </>
            )}
        </div>
    );
}

export default Login;
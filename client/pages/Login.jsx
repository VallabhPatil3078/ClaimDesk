import React, {useState} from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) =>{
        // Login api
    }

  return (
    <div>
      <div>Left side</div>
      <div>Right side</div>
    </div>
  )
}

export default Login

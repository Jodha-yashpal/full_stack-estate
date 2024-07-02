import React from 'react'
import './login.scss'
import { Link } from 'react-router-dom'


function Login() {
  return (
    <div className='login'>
        <div className="formContainer">
            <form>
                <h1>Welcome back</h1>
                <input type="text" name='username' placeholder='Username' />
                <input type="text" name='password' placeholder='Password' />
                <button>Login</button>
                <Link to='/register' className='centre'>Don't you have an account?</Link>
            </form>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}

export default Login
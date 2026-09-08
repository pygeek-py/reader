import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { signup } from './api/auth'

const Signup = () => {

  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[pass, setPass] = useState("")
  const[error, setError] = useState("")
  const[vas, setVas] = useState(false)
  const[checking, setChecking] = useState(false)

  const sign = async () => {
    setVas(false)
    setError("")

    if (password !== pass) {
      setVas(true)
      return
    }

    setChecking(true)
    try {
      await signup({ username, email, password })
      window.location = '/signin'
    } catch (err) {
      setError(err.message || 'Something went wrong, please try again.')
      setChecking(false)
    }
  }

  const log = () => {
    window.location = "/signin"
  }

  return (
    <div>
        <Navbar />
        <div className='bac'>
            <h1 className='sign1'>Sign Up</h1>
            <h1 className='sign2'>
                <span className="sign2i">Home</span>
                /
                <span className='sign2s'>Signup</span>
            </h1>
        </div>
        <div className='signbody'>
            <h1 className='sig1'>Please signup an account....</h1>
            <h1 className='sig2'>Username: </h1>
            <input
              type='text'
              placeholder='Enter your username'
              className='sig3'
              onChange={(e) => setUsername(e.target.value)}
            />
            <h1 className='sig2'>Email: </h1>
            <input
              type='email'
              placeholder='Enter your email'
              className='sig3'
              onChange={(e) => setEmail(e.target.value)}
            />
            <h1 className='sig2'>Password: </h1>
            <input
              type='password'
              placeholder='Enter your password'
              className='sig3'
              onChange={(e) => setPassword(e.target.value)}
            />
            <h1 className='sig2'>Confirm password: </h1>
            <input
              type='password'
              placeholder='Enter your password again'
              className='sig3'
              onChange={(e) => setPass(e.target.value)}
            />
            {vas && (
              <h3 className='ab7'>Password doesn't match</h3>
            )}
            {error && (
              <h3 className='ab7'>{error}</h3>
            )}
            {checking ? (
              <button className='sigb' disabled>SIGNING UP..</button>
            ) : (
              <button className='sigb' onClick={sign}>SIGN UP</button>
            )}
            <h1 className='sig4'>Already Have An Account? <span className='sig4i' onClick={log}>Log In Instead</span></h1>
        </div>
        <Footer />
    </div>
  )
}

export default Signup;

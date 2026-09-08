import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useAuth } from './context/AuthContext'

const Signin = () => {

  const { login } = useAuth()
  const[name, setName] = useState("")
  const[pass, setPass] = useState("")
  const[error, setError] = useState("")
  const[checking, setChecking] = useState(false)

  const signins = async () => {
    setChecking(true)
    setError("")
    try {
      await login(name, pass)
      window.location = "/"
    } catch (err) {
      setError(err.message || 'Ensure your credentials are correct')
      setChecking(false)
    }
  }

  const log = () => {
    window.location = "/signup"
  }


  return (
    <div>
      <Navbar />
        <div className='bac'>
            <h1 className='sign1'>Sign In</h1>
            <h1 className='sign2'>
                <span className="sign2i">Home</span>
                /
                <span className='sign2s'>Sign In</span>
            </h1>
        </div>
        <div className='signbody'>
            <h1 className='sig1'>Please login with your username and password...</h1>
            <h1 className='sig2'>Username: </h1>
            <input
              type='text'
              placeholder='Enter your username'
              className='sig3'
              onChange={(e) => setName(e.target.value)}
            />
            <h1 className='sig2'>Password: </h1>
            <input
              type='password'
              placeholder='Enter your password'
              className='sig3'
              onChange={(e) => setPass(e.target.value)}
            />
            {error && (
              <h3 className='ab7'>{error}</h3>
            )}
            {checking ? (
              <button className='sigb' disabled>SIGNING IN..</button>
            ) : (
              <button className='sigb' onClick={signins}>SIGN IN</button>
            )}

            <h1 className='sig4'>New here? <span className='sig4i' onClick={log}>Sign Up Instead</span></h1>
        </div>
        <Footer />
    </div>
  )
}

export default Signin

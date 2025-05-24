import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Signin = () => {

  const[name, setName] = useState("")
  const[pass, setPass] = useState("")
  const[va, setVa] = useState(false)
  const[checking, setChecking] = useState(false)

  const styles = {
    h: {
      display: "none"
    }
  }

  const signins = async () => {
    const url = 'https://readerapi.onrender.com/signin/'
    setChecking(true)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: `${name}`,
        password: `${pass}`
      })
    })
    const data = await response.json()
    console.log(data)
    if (data.jwt) {
      window.location = "/"
      localStorage.setItem('jwtsi', JSON.stringify(data.jwt));
      localStorage.setItem('ids', JSON.stringify(data.id));
      localStorage.setItem('names', JSON.stringify(data.username));
    } else {
      setVa(true)
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
            {va ? (
              <h3 className='ab7'>Ensure your credentials are correct</h3>
            ) : (
              <h1 style={styles.h}>two</h1>
            )}
            {checking ? (
              <button className='sigb' onClick={signins}>SIGNING IN..</button>
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
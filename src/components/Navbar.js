import React, { useState } from 'react'
import logo from '../logo.png'
import { FaBars, FaSearch } from 'react-icons/fa'

const Navbar = () => {

    const[va, setVa] = useState(false)
    const[vas, setVas] = useState(false)

    const log = () => {
        window.location = "/signin"
    }

    const dis = () => {
        setVa(true)
        console.log('hello')
    }

    const val = () => {
        setVas(true)
        console.log('hello')
    }

  return (
    <div>
        <div className='big'>
            <div className="nav">
                <div className='navflex'>
                    <img src={logo} alt='' className='navimg' />
                    <div className='navflexi'>
                        <h1 className='nav1'>Home</h1>
                        <h1 className='nav1'>Author</h1>
                        <h1 className='nav1'>About</h1>
                    </div>
                    <div className='navflexii'>
                        <h1 className='nav1' onClick={log}>Login</h1>
                        <input type='text' placeholder='Type & Hit Enter......' className='navi' />
                    </div>
                </div>
                <div className='bottomnav'></div>
            </div>
        </div>

        <div className='small'>
            <div className='nav'>
                <div className='navflex'>
                    <img src={logo} alt='' className='navimg' />

                    {vas ? (
                        <input type='text' placeholder='Type & Hit Enter......' className='navi' />
                    ) : (
                        <div className='navflexii'>
                            <h1 className='nav1' onClick={log}>Login</h1>
                            <button className='sa' onClick={val}><FaSearch /></button>
                            <h1 className='sa1' onClick={dis}><FaBars /></h1>
                        </div>
                    )}
                    
                    
                </div>
                {va ? (
                    <div className='navflexi'>
                        <h1 className='nav1'>Home</h1>
                        <h1 className='nav1'>Author</h1>
                        <h1 className='nav1'>About</h1>
                    </div>
                ) : (
                    <h1 style={{ display: "none" }}>Hello</h1>
                )}
                
                <div className='bottomnav'></div>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar;
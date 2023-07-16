import React from 'react'
import logo from '../logo.png'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
        <div className='fo1'>
            <div className='foot'>
                <div className='fo2'>
                    <img src={logo} alt='' className='navimg' />
                    <div className='fo3'>
                        <h1 className='fas'>
                            <FaTwitter />
                        </h1>
                        <h1 className='fas'>
                            <FaInstagram />
                        </h1>
                        <h1 className='fas'>
                            <FaDiscord />
                        </h1>
                    </div>
                </div>
                <div className="fo4"></div>
            </div>
        </div>
    </div>
  )
}

export default Footer;
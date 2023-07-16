import React, { useEffect, useState } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import Footer from './components/Footer'

const Author = () => {

    const[keep, setKeep] = useState([])

    useEffect(() => {
        const gets = async () => {
        
            const url = 'https://readerapi.onrender.com/author/'
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await response.json()
            //console.log(data)
    
            setKeep(data)
        }
        gets();
    }, [])

    const next = (id) => {
        window.location = `/autbook/${id}`
    }

  return (
    <div>
        <HomeNav />
        <div className='bac'>
            <h1 className='sign1'>Authors</h1>
            <h1 className='sign2'>
                <span className="sign2i">Home</span>  
                /  
                <span className='sign2s'>Authors</span>
            </h1>
        </div>
        <div className='au1'>
            {keep.map((item) => 
                <div className='au2'>
                    <div className='au3'></div>
                    <h1 className='au4'>{item.username}</h1>
                    <h1 className='au5' onClick={() => next(`${item.id}`)}>Books by this author</h1>
                    <div className='fo3i'>
                        <h1 className='fasi'>
                            <FaTwitter />
                        </h1>
                        <h1 className='fasi'>
                            <FaInstagram />
                        </h1>
                        <h1 className='fasi'>
                            <FaDiscord />
                        </h1>
                    </div>
                </div>
            )}
        </div>
        <Footer />
    </div>
  )
}

export default Author
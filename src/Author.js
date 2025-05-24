import React, { useEffect, useState } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import Footer from './components/Footer'
import {
    UserCircleIcon,
    UserIcon
} from "@heroicons/react/24/outline";

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
        <div className='author-list'>
  {keep.map((item) => (
    <div className='author-card' key={item.id}>
      <UserCircleIcon className='author-avatar' />
      <h1 className='author-name'>{item.username}</h1>
      <h1 className='author-link' onClick={() => next(`${item.id}`)}>
        Books by this author
      </h1>
      <div className='author-socials'>
        <h1 className='social-icon'><FaTwitter /></h1>
        <h1 className='social-icon'><FaInstagram /></h1>
        <h1 className='social-icon'><FaDiscord /></h1>
      </div>
    </div>
  ))}
</div>

        <Footer />
    </div>
  )
}

export default Author
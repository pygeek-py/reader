import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'

const AutBook = ({ match }) => {

    const[keep, setKeep] = useState([])
    const[name, setName] = useState("")
    const pagid = match.params.id

    useEffect(() => {
        const gets = async () => {
        
            const url = `https://readerapi.onrender.com/autbook/${pagid}/`
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await response.json()
    
            setKeep(data)
        }
        gets();
    }, [])

    useEffect(() => {
        const gets = async () => {
        
            const url = `https://readerapi.onrender.com/userb/${pagid}/`
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await response.json()
    
            setName(data.username)
        }
        gets();
    }, [])

  return (
    <div>
        <HomeNav />
        <div className='bacd'>
            <div className='au6'>
                <div className='au3i'></div>
                <div className='au7'>
                    <h1 className='au4i'>{name}</h1>
                    <h1 className='au5ii'><span className='au5is'>1</span> Books by this author</h1>
                    <div className='fo3ii'>
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
            </div>
        </div>

        <div className='bod1i'>
            {keep.map((item) => 
                <section className='sec'>
                    <article className='secin'>
                        <h1 className='sec1'>{item.title}</h1>
                        <div className='sec2'>
                            <h1 className='sec3'>{item.name}</h1>
                            <h1 className='sec4'>|</h1>
                            <button className='secb'>{item.genre}</button>
                        </div>
                        <h1 className='sec5'>{item.description}</h1>
                        <button className='secbs'>Borrow</button>
                    </article>
                </section>
            )}
        </div>
    </div>
  )
}

export default AutBook
import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import Footer from './components/Footer'

const About = ({match}) => {

    const[title, setTitle] = useState("")
    const[name, setName] = useState("")
    const[description, setDescription] = useState("")
    const[genre, setGenre] = useState("")
    const[im, setIm] = useState("")
    const[flip, setFlip] = useState([])
    const pagid = match.params.id;

    useEffect(() => {
        const gets = async () => {
        
            const url = `https://readerapi.onrender.com/each/${pagid}/`
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await response.json()
            //console.log(data)
    
            setTitle(data.title)
            setName(data.name)
            setGenre(data.genre)
            setDescription(data.description)
        }
        gets();
    }, [])

    useEffect(() => {
        const getdue = async () => {
            const url = `https://readerapi.onrender.com/eachborrow/${pagid}/`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setIm(data.imprint)
            setFlip(data)
        }
        getdue()
    })

    const nexts = () => {
        window.location = `/borrow/${pagid}`
    }
    

  return (
    <div>
        <HomeNav />
        <div className='ab1'>
            <div className='ab2'>
                <article className='secin'>
                    <h1 className='sec1i'>{title}</h1>
                    <div className='sec2i'>
                        <h1 className='sec3i'>{name}</h1>
                        <h1 className='sec4i'>|</h1>
                        <button className='secbi'>{genre}</button>
                    </div>
                    <h1 className='sec5i'>{description}</h1>
                    <button className='secbs' onClick={nexts}>Borrow</button>
                </article>
            </div>
        </div>
        <div className='ab3'>
            <h1 className='bodh'>BOOKS COPIES</h1>
            <div className='bodl'></div>
            <br />
            
            {flip.map((item) => 
                <section className='ab4'>
                <article className='ab5'>
                    <h1 className='ab6'>Status: <span className='ab6i'>On Loan</span></h1>
                    <br />
                    <h1 className='ab7'>Due back: <span className='ab7i'>{item.due}</span></h1>
                    <br />
                    <h1 className='ab8'>Imprint: <span className='ab8i'>{item.imprint}</span></h1>
                    <br />
                    <h1 className='ab9'>Id: <span className='ab9i'>{item.num}</span></h1>
                    <button className='secbsi'>Renew Book</button>
                </article>
            </section>
            )}
        </div>
        <Footer />
    </div>
  )
}

export default About
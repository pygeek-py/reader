import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import Footer from './components/Footer'

const Borrow = ({match}) => {

    const[title, setTitle] = useState("")
    const[name, setName] = useState("")
    const[description, setDescription] = useState("")
    const[genre, setGenre] = useState("")
    const[num, setNum] = useState(null)
    const[im, setIm] = useState("")
    const[due, setDue] = useState(null)
    const pagid = match.params.id;

    const token = JSON.parse(localStorage.getItem('ids'))

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
            console.log(name)
            setGenre(data.genre)
            setDescription(data.description)
            setNum(data.num)
        }
        gets();
    }, [])

    const sub = async () => {

      const url = 'https://readerapi.onrender.com/borrow/'

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: `${token}`,
          title: `${title}`,
          name: `${name}`,
          description: `${description}`,
          genre: `${genre}`,
          num: `${num}`,
          imprint: `${im}`,
          due: `${due}`
        })
      })
      const data = await response.json()
      console.log(data)
      if (data.id) {
        window.location = "/mybook"
      }
    }


  return (
    <div>
        <HomeNav />
        <div className='bac'>
            <h1 className='sign1'>Borrow Book</h1>
            <h1 className='sign2'>
                <span className="sign2i">Home</span>  
                /  
                <span className='sign2s'>Borrow</span>
            </h1>
        </div>
        <div className='signbody'>
            <h1 className='sig1'>Borrow To the lighthouse...</h1>
            <h1 className='sig2'>Imprint (Required) </h1>
            <input 
              type='text' 
              placeholder='Enter the publisher or edition of the book you want to borrow' 
              className='sig3' 
              onChange={(e) => setIm(e.target.value)}
            />
            <h1 className='sig2'>Due Back (Required) </h1>
            <input 
              type='date' 
              className='sig3' 
              onChange={(e) => setDue(e.target.value)}
            />
            <button className='sigb' onClick={sub}>SUBMIT</button>
        </div>
        <Footer /> 
    </div>
  )
}

export default Borrow
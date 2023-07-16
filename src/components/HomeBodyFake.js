import React, { useState, useEffect } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

const HomeBodyFake = () => {

    const[keep, setKeep] = useState([])

    const two = () => {
        window.location = '/signin'
    }

    const thr = () => {
        window.location = '/signin'
    } 

    useEffect(() => {
        const gets = async () => {
        
            const url = 'https://readerapi.onrender.com/'
    
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
        window.location = `/signin`
    }

    const nexts = (id) => {
        window.location = `/signin`
    }


  return (
    <div>
        <div className='bod1'>
            <h1 className='bodh'>BOOKS AVAILABLE</h1>
            <div className='bodl'></div>
            <br />

            {keep.map((item) => 
                <section className='sec' key={item.id}>
                    <article className='secin'>
                        <h1 className='sec1' onClick={() => next(`${item.num}`)}>{item.title}</h1>
                        <div className='sec2'>
                            <h1 className='sec3'>{item.name}</h1>
                            <h1 className='sec4'>|</h1>
                            <button className='secb'>{item.genre}</button>
                        </div>
                        <h1 className='sec5'>{item.description}</h1>
                        <button className='secbs' onClick={() => nexts(`${item.num}`)}>Borrow</button>
                    </article>
                </section>
            )}

            <div className='secpage'>
                <button className='sec6'><FaAngleDoubleLeft /></button>
                <button className='sec6i'>1</button>
                <button className='sec6' onClick={two}>2</button>
                <button className='sec6' onClick={thr}>3</button>
                <button className='sec6' onClick={two}><FaAngleDoubleRight /></button>
            </div>
        </div>
    </div>
  )
}

export default HomeBodyFake;
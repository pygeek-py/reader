import React, { useEffect, useState } from 'react'
import HomeNav from './components/HomeNav'
import search from './no-search-found.svg'
import Footer from './components/Footer'

const Search = ({ match }) => {
    const pagname = match.params.name
    const[va, setVa] = useState(false)
    const[keep, setKeep] = useState([])
    const[num, setNum] = useState("")

    setInterval(() => {
        setNum('min')
        //console.log('min')
    }, 1);

    
        const searchevent = async () => {
            //const url = ``
            try {
                const response = await fetch(`https://readerapi.onrender.com/lists/?search=${pagname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                const data = await response.json()
                //console.log(data[0].id)
                
                

                if (data[0].id) {
                    setVa(true)
                    console.log(data)
                    setKeep(data)
                } else {
                    setVa(false)
                    console.log('i dont have data')
                }
            } catch (error) {
                console.log('pls')
            }
            
            

        }
    useEffect(() => {
        searchevent()
    }, [num])

    

  return (
    <div>
        <HomeNav />
        <div className='se1'>
            <h1 className='des'>Searchs results for <span className='desi'>{pagname}</span></h1>
            <br />
            
            {va ? (

                <div className='mas'>
                
                {keep.map((item) =>
                    <section className='sec'>
                        <article className='secin'>
                            <h1 className='sec1'>{item.title}</h1>
                            <div className='sec2n'>
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
                
                    
                
                   
                
                
            ) : (
                <center>
                <img src={search} alt='svg' className='mig' />
                </center>
            )}
        </div>
        <br />
        <Footer />
    </div>
  )
}

export default Search
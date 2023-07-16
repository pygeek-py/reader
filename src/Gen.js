import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import Footer from './components/Footer'

const Gen = () => {

    const[keep, setKeep] = useState([])
    const[sea, setSea] = useState("")

    const handlesub = (e) => {
        e.preventDefault();

        window.location = `/search/${sea}`
    }

    useEffect(() => {
        const gets = async () => {
        
            const url = 'https://readerapi.onrender.com/gens/'
    
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

    console.log(keep)

    const fic = () => {
        window.location = "/gen/fiction"
    }
    const rom = () => {
        window.location = "/gen/romance"
    }

  return (
    <div>
        <HomeNav />
        <div className='my1i'>
            <div className='my2'>
                <h1 className='my3'>Books from <span className='my3i'>Fiction</span></h1>
                <br />
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
            <div className='my2s'>
                <div className='my6'>
                    <div className='my7'></div>
                    <div className='ned'>
                        <center>
                            <h1 className='bodh'>SEARCH</h1>
                        </center>
                        <input type='text' placeholder='Type & Hit Enter...' className='myi' onChange={(e) => setSea(e.target.value)} />
                        <button className='myb' onClick={handlesub}>SEARCH</button>
                    </div>
                </div>
                <br />
                <div className='my6i'>
                    <div className='my7'></div>
                    <div className="nedi">
                        <center>
                            <h1 className='bodh'>TAGS</h1>
                        </center>
                        <div className='hom4i'>
                            <button className='hom5i' onClick={fic}>Fiction</button>
                            <button className='hom5i' onClick={rom}>Romance</button>
                            <button className='hom5i'>Classic</button>
                            <button className='hom5i'>Modernist Literature</button>
                            <button className='hom5i'>Bildungsroman</button>
                            <button className='hom5i'>Fantasy</button>
                            <button className='hom5i'>Magical Realism</button>
                            <button className='hom5i'>Dystopia</button>
                            <button className='hom5i'>Gothic</button>
                        </div>
                        <br />
                    </div>
                </div>
                <br />
                <div className='my6i'>
                    <div className='my7'></div>
                    <div className="nedi">
                        <center>
                            <h1 className='bodh'>SOCIAL LINKS</h1>
                        </center>
                        <div className='fos'>
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
        </div>
        <br /><br />
        <Footer />
    </div>
  )
}

export default Gen
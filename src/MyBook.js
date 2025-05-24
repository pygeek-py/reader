import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import Footer from './components/Footer'
import search from './no-search-found.svg'

const MyBook = () => {

    const token = JSON.parse(localStorage.getItem('ids'))
    const tokens = JSON.parse(localStorage.getItem('names'))

    const[keep, setKeep] = useState([])
    const[sea, setSea] = useState("")

    const handlesub = (e) => {
        e.preventDefault();

        window.location = `/search/${sea}`
    }

    useEffect(() => {
        const gets = async () => {
        
            const url = `https://readerapi.onrender.com/userbo/${token}/`
    
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

  return (
    <div>
        <HomeNav />
        <div className='my1'>
            <div className='my2'>
                <h1 className='my3'>Books Borrowed By {tokens}</h1>
                {keep.length > 0 ? (
                    <>
                    {keep.map((item) => 
                    <div className='my4'>
                        <div className='my5'>
                            <h1 className='bodh'>{item.title}</h1>
                            <br />
                            <h1 className='ab9'>Id: <span className='ab9i'>{item.num}</span></h1>
                            <br />
                            <h1 className='ab8'>Imprint: <span className='ab8i'>{item.imprint}</span></h1>
                            <br />
                            <h1 className='ab8'>Due Back: <span className='ab8i'>{item.due}</span></h1>
                        </div>
                    </div>
                )}

                    </>
                ) : (
                    <center>
                <img src={search} alt='svg' className='mig' />
                </center>
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

export default MyBook
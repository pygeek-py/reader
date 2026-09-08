import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import Footer from './components/Footer'
import search from './no-search-found.svg'
import { api } from './api/client'
import { useAuth } from './context/AuthContext'

const MyBook = () => {

    const { user } = useAuth()

    const[keep, setKeep] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)
    const[sea, setSea] = useState("")

    const handlesub = (e) => {
        e.preventDefault();

        window.location = `/search/${sea}`
    }

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        api.get(`/userbo/${user.id}/`, { auth: true })
            .then((data) => { if (!cancelled) setKeep(data) })
            .catch((err) => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [user.id])

  return (
    <div>
        <HomeNav />
        <div className='my1'>
            <div className='my2'>
                <h1 className='my3'>Books Borrowed By {user.username}</h1>
                {loading && <p className='state-message'>Loading your books...</p>}
                {!loading && error && <p className='state-message state-message--error'>Couldn't load your books: {error}</p>}
                {!loading && !error && (
                    keep.length > 0 ? (
                    <>
                    {keep.map((item) =>
                    <div className='my4' key={item.id}>
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
                <h1 className='bodh'>You haven't borrowed any books yet.</h1>
                </center>
                ))}

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

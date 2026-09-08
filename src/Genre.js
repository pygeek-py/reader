import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import Footer from './components/Footer'
import { api } from './api/client'

const GENRE_CONFIG = {
    fiction: { label: 'Fiction', endpoint: '/gens/' },
    romance: { label: 'Romance', endpoint: '/gensr/' },
}

const Genre = ({ match }) => {

    const genreKey = match.params.genre
    const config = GENRE_CONFIG[genreKey] || GENRE_CONFIG.fiction

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

        api.get(config.endpoint)
            .then((data) => { if (!cancelled) setKeep(data) })
            .catch((err) => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [config.endpoint])

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
                <h1 className='my3'>Books from <span className='my3i'>{config.label}</span></h1>
                <br />
                {loading && <p className='state-message'>Loading books...</p>}
                {!loading && error && <p className='state-message state-message--error'>Couldn't load books: {error}</p>}
                {!loading && !error && keep.length === 0 && (
                    <p className='state-message'>No {config.label.toLowerCase()} books are available yet.</p>
                )}
                {!loading && !error && keep.map((item) =>
                    <section className='sec' key={item.id}>
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

export default Genre

import React, { useEffect, useState } from 'react'
import HomeNav from './components/HomeNav'
import search from './no-search-found.svg'
import Footer from './components/Footer'
import { api } from './api/client'

const Search = ({ match }) => {
    const pagname = match.params.name
    const[keep, setKeep] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        api.get(`/lists/?search=${encodeURIComponent(pagname)}`)
            .then((data) => { if (!cancelled) setKeep(data) })
            .catch((err) => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [pagname])

  return (
    <div>
        <HomeNav />
        <div className='se1'>
            <h1 className='des'>Searchs results for <span className='desi'>{pagname}</span></h1>
            <br />

            {loading && <p className='state-message'>Searching...</p>}
            {!loading && error && <p className='state-message state-message--error'>Couldn't search books: {error}</p>}

            {!loading && !error && (
                keep.length > 0 ? (

                <div className='mas'>

                {keep.map((item) =>
                    <section className='sec' key={item.id}>
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
            ))}
        </div>
        <br />
        <Footer />
    </div>
  )
}

export default Search

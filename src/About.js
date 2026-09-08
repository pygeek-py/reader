import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import Footer from './components/Footer'
import { api } from './api/client'

const About = ({match}) => {

    const[title, setTitle] = useState("")
    const[name, setName] = useState("")
    const[description, setDescription] = useState("")
    const[genre, setGenre] = useState("")
    const[flip, setFlip] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)
    const pagid = match.params.id;

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        api.get(`/each/${pagid}/`)
            .then((data) => {
                if (cancelled) return
                setTitle(data.title)
                setName(data.name)
                setGenre(data.genre)
                setDescription(data.description)
            })
            .catch((err) => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [pagid])

    useEffect(() => {
        let cancelled = false

        api.get(`/eachborrow/${pagid}/`)
            .then((data) => { if (!cancelled) setFlip(data) })
            .catch(() => { /* loan status is supplementary; ignore failures here */ })

        return () => { cancelled = true }
    }, [pagid])

    const nexts = () => {
        window.location = `/borrow/${pagid}`
    }


  return (
    <div>
        <HomeNav />
        {loading && <p className='state-message'>Loading book...</p>}
        {!loading && error && <p className='state-message state-message--error'>Couldn't load this book: {error}</p>}
        {!loading && !error && (
        <>
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

            {flip.length === 0 && <p className='state-message'>No copies currently on loan.</p>}

            {flip.map((item) =>
                <section className='ab4' key={item.id}>
                <article className='ab5'>
                    <h1 className='ab6'>Status: <span className='ab6i'>On Loan</span></h1>
                    <br />
                    <h1 className='ab7'>Due back: <span className='ab7i'>{item.due}</span></h1>
                    <br />
                    <h1 className='ab8'>Imprint: <span className='ab8i'>{item.imprint}</span></h1>
                    <br />
                    <h1 className='ab9'>Id: <span className='ab9i'>{item.num}</span></h1>
                </article>
            </section>
            )}
        </div>
        </>
        )}
        <Footer />
    </div>
  )
}

export default About

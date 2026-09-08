import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { api } from './api/client'

const AutBook = ({ match }) => {

    const[author, setAuthor] = useState(null)
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)
    const pagid = match.params.id

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        api.get(`/autbook/${pagid}/`)
            .then((data) => { if (!cancelled) setAuthor(data) })
            .catch((err) => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [pagid])

    const openBook = (num) => {
        window.location = `/about/${num}`
    }

    if (loading) {
        return <p className='state-message'>Loading author...</p>
    }

    if (error) {
        return <p className='state-message state-message--error'>Couldn't load this author: {error}</p>
    }

  return (
    <div>
        <HomeNav />
        <div className='bacd'>
            <div className='au6'>
                <UserCircleIcon className='usercircle' />
                <div className='au7'>
                    <h1 className='au4i'>{author.username}</h1>
                    <h1 className='au5ii'><span className='au5is'>{author.book_count}</span> Books by this author</h1>
                    <div className='fo3ii'>
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

        <div className='bod1i'>
            {author.books.length === 0 && <h1 className='bodh'>This author has no books yet.</h1>}
            {author.books.map((item) =>
                <section className='sec' key={item.id}>
                    <article className='secin'>
                        <h1 className='sec1' onClick={() => openBook(item.num)}>{item.title}</h1>
                        <div className='sec2'>
                            <h1 className='sec3'>{item.name}</h1>
                            <h1 className='sec4'>|</h1>
                            <button className='secb'>{item.genre}</button>
                        </div>
                        <h1 className='sec5'>{item.description}</h1>
                        <button className='secbs' onClick={() => openBook(item.num)}>Borrow</button>
                    </article>
                </section>
            )}
        </div>
    </div>
  )
}

export default AutBook

import React, { useEffect, useState } from 'react'
import HomeNav from './components/HomeNav'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import Footer from './components/Footer'
import {
    UserCircleIcon
} from "@heroicons/react/24/outline";
import { api } from './api/client'

const Author = () => {

    const[keep, setKeep] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        api.get('/author/')
            .then((data) => { if (!cancelled) setKeep(data) })
            .catch((err) => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [])

    const next = (id) => {
        window.location = `/autbook/${id}`
    }

  return (
    <div>
        <HomeNav />
        <div className='bac'>
            <h1 className='sign1'>Authors</h1>
            <h1 className='sign2'>
                <span className="sign2i">Home</span>
                /
                <span className='sign2s'>Authors</span>
            </h1>
        </div>

        {loading && <p className='state-message'>Loading authors...</p>}
        {!loading && error && <p className='state-message state-message--error'>Couldn't load authors: {error}</p>}
        {!loading && !error && keep.length === 0 && (
            <p className='state-message'>No authors have books in the library yet.</p>
        )}

        {!loading && !error && keep.length > 0 && (
        <div className='author-list'>
          {keep.map((item) => (
            <div className='author-card' key={item.id}>
              <UserCircleIcon className='author-avatar' />
              <h1 className='author-name'>{item.username}</h1>
              <p className='author-count'>{item.book_count} book{item.book_count === 1 ? '' : 's'}</p>
              <h1 className='author-link' onClick={() => next(`${item.id}`)}>
                Books by this author
              </h1>
              <div className='author-socials'>
                <h1 className='social-icon'><FaTwitter /></h1>
                <h1 className='social-icon'><FaInstagram /></h1>
                <h1 className='social-icon'><FaDiscord /></h1>
              </div>
            </div>
          ))}
        </div>
        )}

        <Footer />
    </div>
  )
}

export default Author

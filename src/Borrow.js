import React, { useState, useEffect } from 'react'
import HomeNav from './components/HomeNav'
import Footer from './components/Footer'
import { api } from './api/client'

const Borrow = ({match}) => {

    const[title, setTitle] = useState("")
    const[name, setName] = useState("")
    const[description, setDescription] = useState("")
    const[genre, setGenre] = useState("")
    const[num, setNum] = useState(null)
    const[im, setIm] = useState("")
    const[due, setDue] = useState(null)
    const[error, setError] = useState(null)
    const[submitting, setSubmitting] = useState(false)
    const pagid = match.params.id;

    useEffect(() => {
        let cancelled = false

        api.get(`/each/${pagid}/`)
            .then((data) => {
                if (cancelled) return
                setTitle(data.title)
                setName(data.name)
                setGenre(data.genre)
                setDescription(data.description)
                setNum(data.num)
            })
            .catch((err) => { if (!cancelled) setError(err.message) })

        return () => { cancelled = true }
    }, [pagid])

    const sub = async () => {
      if (!im || !due) {
        setError('Imprint and due date are both required.')
        return
      }

      setSubmitting(true)
      setError(null)
      try {
        await api.post('/borrow/', {
          title, name, description, genre, num, imprint: im, due,
        }, { auth: true })
        window.location = "/mybook"
      } catch (err) {
        setError(err.message)
        setSubmitting(false)
      }
    }


  return (
    <div>
        <HomeNav />
        <div className='bac'>
            <h1 className='sign1'>Borrow Book</h1>
            <h1 className='sign2'>
                <span className="sign2i">Home</span>
                /
                <span className='sign2s'>Borrow</span>
            </h1>
        </div>
        <div className='signbody'>
            <h1 className='sig1'>Borrow {title || 'this book'}...</h1>
            <h1 className='sig2'>Imprint (Required) </h1>
            <input
              type='text'
              placeholder='Enter the publisher or edition of the book you want to borrow'
              className='sig3'
              onChange={(e) => setIm(e.target.value)}
            />
            <h1 className='sig2'>Due Back (Required) </h1>
            <input
              type='date'
              className='sig3'
              onChange={(e) => setDue(e.target.value)}
            />
            {error && <h3 className='ab7'>{error}</h3>}
            <button className='sigb' onClick={sub} disabled={submitting}>
              {submitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
        </div>
        <Footer />
    </div>
  )
}

export default Borrow

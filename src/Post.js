import React, { useState } from 'react'
import { api } from './api/client'

const Post = () => {

    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[genre, setGenre] = useState("")
    const[name, setName] = useState("")
    const[num, setNum] = useState("")
    const[error, setError] = useState(null)
    const[success, setSuccess] = useState(false)
    const[submitting, setSubmitting] = useState(false)


    const pos = async () => {
        setSubmitting(true)
        setError(null)
        setSuccess(false)
        try {
            await api.post('/bookp/', { title, description, genre, name, num }, { auth: true })
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }


  return (
    <div>
        <input type="text" placeholder='title' onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='description' onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder='genre' onChange={(e) => setGenre(e.target.value)} />
        <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder='num' onChange={(e) => setNum(e.target.value)} />
        <button onClick={pos} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Book added successfully.</p>}
    </div>
  )
}

export default Post

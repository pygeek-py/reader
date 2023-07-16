import React, { useEffect, useState } from 'react'

const Post = () => {

    const token = JSON.parse(localStorage.getItem('names'))
    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[genre, setGenre] = useState("")
    const[name, setName] = useState("")
    const[num, setNum] = useState("")

    
    const pos = async () => {
        const url = 'https://readerapi.onrender.com/bookp/'

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: `${token}`,
                title: `${title}`,
                description: `${description}`,
                genre: `${genre}`,
                name: `${name}`,
                num: `${num}`
            })
        })
        const data = await response.json()
        console.log(data)
    }


  return (
    <div>
        <input type="text" placeholder='title' onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='description' onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder='genre' onChange={(e) => setGenre(e.target.value)} />
        <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder='num' onChange={(e) => setNum(e.target.value)} />
        <button onClick={pos}>Submit</button>
    </div>
  )
}

export default Post
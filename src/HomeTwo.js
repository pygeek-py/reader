import React from 'react'
import HomeNav from './components/HomeNav'
import HomeBodyTwo from './components/HomeBodyTwo'
import Footer from './components/Footer'

const HomeTwo = () => {

  const token = JSON.parse(localStorage.getItem('names'))
  const wat = token.toUpperCase()

  const fic = () => {
    window.location = "/gen/fiction"
  }

  const rom = () => {
    window.location = "/gen/romance"
  }

  return (
    <div>
        <HomeNav />
        <div className='bacs'>
            <div className='hom1'>
            <h1 className='hom2'>What Book Would You Like To Borrow Today?</h1>
            <h1 className='hom3'>{wat}</h1>
            </div>
            <div className='hom4'>
            <button className='hom5' onClick={fic}>Fiction</button>
            <button className='hom5' onClick={rom}>Romance</button>
            <button className='hom5'>Classic</button>
            <button className='hom5'>Modernist Literature</button>
            <button className='hom5'>Bildungsroman</button>
            <button className='hom5'>Fantasy</button>
            <button className='hom5'>Magical Realism</button>
            <button className='hom5'>Dystopia</button>
            <button className='hom5'>Gothic</button>
            </div>
        </div>
      <HomeBodyTwo />
      <Footer />
    </div>
  )
}

export default HomeTwo
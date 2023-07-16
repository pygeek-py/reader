import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import HomeBodyFake from './components/HomeBodyFake'

const Fake = () => {

  const fic = () => {
    window.location = "/signin"
  }

  const rom = () => {
    window.location = "/signin"
  }
    return (
      <div>
        <Navbar />
        <div className='bacs'>
          <div className='hom1'>
            <h1 className='hom2'>What Book Would You Like To Borrow Today?</h1>
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
        <HomeBodyFake />
        <Footer />
      </div>
    )
}

export default Fake
import React, { useState } from 'react'
import logo from '../logo.png'
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa'

const HomeNav = () => {

    const[sea, setSea] = useState("")

    const handlesub = (event) => {
        event.preventDefault();

        window.location = `/search/${sea}`
    }

    const handlekey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handlesub(event)
        }
    }

    const hom = () => {
        window.location = "/"
    }
    const aut = () => {
        window.location = "/author"
    }
    const my = () => {
        window.location = "/mybook"
    }

    const out = async () => {
        window.location = "/home/fake"
    }

    const[va, setVa] = useState(false)
    const[vas, setVas] = useState(false)

    const dis = () => {
        if (va == false) {
            setVa(true)
            let a = document.querySelector('.sa1');
            a.style.display = "none";
            let b = document.querySelector('.sa1s');
            b.style.display = "block";
        } else {
            setVa(false)
            let a = document.querySelector('.sa1');
            a.style.display = "block";
            let b = document.querySelector('.sa1s');
            b.style.display = "none";
        }
        console.log('hello')
    }

    const val = () => {
        setVas(true)
        console.log('hello')
    }

  return (
    <div>
        <div className='big'>
            <div className="nav">
                <div className='navflex'>
                    <img src={logo} alt='' className='navimg' onClick={hom} />
                    <div className='navflexis'>
                        <h1 className='nav1' onClick={hom}>Home</h1>
                        <h1 className='nav1' onClick={aut}>Author</h1>
                        <h1 className='nav1' onClick={my}>My books</h1>
                        <h1 className='nav1'>About</h1>
                    </div>
                    <div className='navflexii'>
                        <h1 className='nav1' onClick={out}>Logout</h1>
                        <form onSubmit={handlesub} className='nec'>
                        <input type='text' placeholder='Type & Hit Enter......' className='navi' onChange={(e) => setSea(e.target.value)} onKeyDown={handlekey} />
                        </form>
                    </div>
                </div>
                <div className='bottomnav'></div>
            </div>
        </div>

        <div className='small'>
            <div className='nav'>
                <div className='navflex'>
                    <img src={logo} alt='' className='navimg' />

                    {vas ? (
                        <form onSubmit={handlesub} className='nec'>
                        <input type='text' placeholder='Type & Hit Enter......' className='navi' onChange={(e) => setSea(e.target.value)} onKeyDown={handlekey} />
                        </form>
                    ) : (
                        <div className='navflexiii'>
                            <h1 className='nav1' onClick={out}>Logout</h1>
                            <button className='sa' onClick={val}><FaSearch /></button>
                            <h1 className='sa1' onClick={dis}><FaBars /></h1>
                            <h1 className='sa1s' onClick={dis}><FaTimes /></h1>
                        </div>
                    )}
                    
                    
                </div>
                {va ? (
                    <div className='navflexi'>
                        <h1 className='nav1' onClick={hom}>Home</h1>
                        <h1 className='nav1' onClick={aut}>Author</h1>
                        <h1 className='nav1' onClick={my}>My books</h1>
                        <h1 className='nav1'>About</h1>
                    </div>
                ) : (
                    <h1 style={{ display: "none" }}>Hello</h1>
                )}
                
                <div className='bottomnav'></div>
            </div>
        </div>
        
    </div>
  )
}

export default HomeNav;
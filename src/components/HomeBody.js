import React, { useState, useEffect } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { api } from '../api/client'

const HomeBody = ({ page = '1' }) => {

    const currentPage = Number(page) || 1

    const[keep, setKeep] = useState([])
    const[numPages, setNumPages] = useState(1)
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        api.get(`/?page=${currentPage}`)
            .then((data) => {
                if (cancelled) return
                setKeep(data.results)
                setNumPages(data.num_pages)
            })
            .catch((err) => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [currentPage])

    const goTo = (target) => {
        window.location = target === 1 ? '/' : `/home/page/${target}`
    }

    const next = (id) => {
        window.location = `/about/${id}`
    }

    const nexts = (id) => {
        window.location = `/borrow/${id}`
    }

  return (
    <div>
        <div className='bod1'>
            <h1 className='bodh'>BOOKS AVAILABLE</h1>
            <div className='bodl'></div>
            <br />

            {loading && <p className='state-message'>Loading books...</p>}
            {!loading && error && <p className='state-message state-message--error'>Couldn't load books: {error}</p>}
            {!loading && !error && keep.length === 0 && (
                <p className='state-message'>No books are available yet.</p>
            )}

            {!loading && !error && keep.map((item) =>
                <section className='sec' key={item.id}>
                    <article className='secin'>
                        <h1 className='sec1' onClick={() => next(`${item.num}`)}>{item.title}</h1>
                        <div className='sec2'>
                            <h1 className='sec3'>{item.name}</h1>
                            <h1 className='sec4'>|</h1>
                            <button className='secb'>{item.genre}</button>
                        </div>
                        <h1 className='sec5'>{item.description}</h1>
                        <button className='secbs' onClick={() => nexts(`${item.num}`)}>Borrow</button>
                    </article>
                </section>
            )}

            {!loading && !error && numPages > 1 && (
                <div className='secpage'>
                    <button
                        className='sec6'
                        onClick={() => goTo(Math.max(1, currentPage - 1))}
                        disabled={currentPage <= 1}
                        aria-label='Previous page'
                    >
                        <FaAngleDoubleLeft />
                    </button>
                    {Array.from({ length: numPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            className={p === currentPage ? 'sec6i' : 'sec6'}
                            onClick={() => goTo(p)}
                            aria-current={p === currentPage ? 'page' : undefined}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        className='sec6'
                        onClick={() => goTo(Math.min(numPages, currentPage + 1))}
                        disabled={currentPage >= numPages}
                        aria-label='Next page'
                    >
                        <FaAngleDoubleRight />
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default HomeBody

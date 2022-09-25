import React from 'react'

import './scrollToTop.scss'
const ScrollToTop = () => {
    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, [])

    const toggleVisible = React.useCallback(() => {
        if (window.pageYOffset > 400) setActive(true)
        else setActive(false)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className='toTop' onClick={scrollToTop} style={{ opacity: active ? "1" : '0', visibility: active ? 'visible' : 'hidden' }} />
    )
}

export default ScrollToTop;
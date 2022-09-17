import React from 'react'

import './scrollToTop.scss'
const ScrollToTop = () => {
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, [])

    const toggleVisible = React.useCallback(() => {
        if (window.pageYOffset > 400) setVisible(true)
        else setVisible(false)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className='toTop' onClick={scrollToTop} style={{ visibility: visible ? 'visible' : 'hidden' }}/>
    )
}

export default ScrollToTop;
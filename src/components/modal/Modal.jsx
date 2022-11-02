import React from 'react'

const Modal = ({ visibile, setVisible, children }) => {
    const node = React.useRef()
    if (visibile) node.current.focus()

    return (
        <div
            className={visibile ? `outer active` : `outer`}
            tabIndex={0}
            ref={node}
            onClick={() => setVisible(false)}
            onKeyDown={(e) => { if (e.code === "Escape") setVisible(false) }} >
            <div className="outer__content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal
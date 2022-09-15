import React from 'react'

const NotFound = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            height: '100%'
        }}>
            <h1 style={{ color: "#ce262c", fontSize: "62px" }}>404</h1>
            <h2 style={{ fontSize: "42px" }}>Page not Found</h2>
        </div>
    )
}

export default NotFound
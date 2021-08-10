import React from 'react'

export default function Spinner({ color='light' , style }) {
    return (
        <div>
            <div className={"spinner-border text-"+color} role="status" style={style}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

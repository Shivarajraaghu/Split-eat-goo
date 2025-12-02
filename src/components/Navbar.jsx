import React from 'react'

export default function Navbar() {
    return (
        <>
          <nav className='navbar navbar-dark bg-dark'>
            <div className="container-fluid">
                <a href="#" className='navbar-brand text-white'>React Application</a>
                <div>
                    <div className='search'>search</div>
                </div>
                <div>                    
                    <button className='btn btn-dark me-2'>About</button>
                    <button className='btn btn-dark me-2'>Contact</button>
                    <button className='btn btn-dark'>Login</button>
                </div>
            </div>
          </nav>
        </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="relative bg-white border-gray-300 w-full border-b border-black-500 ">
      <div className="w-full px-6">   
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
            <button type="button" command="--toggle" commandfor="mobile-menu" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 in-aria-expanded:hidden">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 not-in-aria-expanded:hidden">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                
                <Link to="/" aria-current="page" className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-600">Home</Link>
                <Link to="/profile" className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-white/5 hover:text-gray-600">Profile</Link>
                <Link to="/effect" className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-white/5 hover:text-gray-600">useEffect</Link>
                <Link to="/memo" className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-white/5 hover:text-gray-600">useMemo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    
  )
}

export default Navbar
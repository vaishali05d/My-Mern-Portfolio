import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[1000]'>
        <div className="flex gap-5 text-6xl max-sm:text-3xl font-semibold">
            <h1 className="text-secondary v">V</h1>
            <h1 className="text-white s">S</h1>
        </div>
    </div>
  )
}

export default Loader
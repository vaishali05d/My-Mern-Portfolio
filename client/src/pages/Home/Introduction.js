import React from 'react';
import { useSelector } from 'react-redux';

function Introduction() {
    const { portfolioData} = useSelector((state)=>state.root);

    const {intro} = portfolioData;
    const {firstName, lastName, welcomeText, description, caption} = intro;
    return (
        <div className='h-[80vh] flex flex-col items-start justify-center gap-8 py'>
            <h1 className="text-white">{welcomeText || ''}</h1>
            <h1 className="text-7xl max-sm:text-3xl text-secondary font-semibold text-shadow-lg shadow-green-600">{firstName || ''} {lastName || ''}</h1>
            <h1 className="text-white text-7xl max-sm:text-3xl font-semibold">{caption || ''}</h1>
            <p className="text-white w-2/3">
                {description || ''}
            </p>
            <button className='border-2 border-tertiary text-tertiary px-10 py-3 rounded'>Get Started</button>

        </div>
    )
}

export default Introduction
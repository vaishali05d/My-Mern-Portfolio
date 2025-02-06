import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioData } from '../../redux/rootSlice'; // Import the thunk

function Footer() {
    const dispatch = useDispatch();
    const { portfolioData, loading } = useSelector((state) => state.root);

    // Dispatch the thunk to fetch portfolio data when the component mounts
    useEffect(() => {
        if (!portfolioData) {
            dispatch(fetchPortfolioData());
        }
    }, [portfolioData, dispatch]);

    return (
        <div className='py-10'>
            <div className='h-[1px] w-full bg-green-700'></div>

            <div className="flex items-center justify-center flex-col mt-8">
                <h1 className="text-white">Designed and Developed By </h1>
                <b className="text-white">
                    <span className='text-white'>Vaishali Sharma</span>
                </b>
                {loading && <p className="text-white">Loading portfolio data...</p>}
                {/* You can display other dynamic data from portfolioData here if needed */}
            </div>
        </div>
    );
}

export default Footer;
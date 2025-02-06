import React, { useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioData } from '../../redux/rootSlice'; // Import your thunk

function About() {
    const dispatch = useDispatch();
    const { portfolioData, loading } = useSelector((state) => state.root);
    const { about } = portfolioData || {};
    const { skills, lottieURL, description1, description2 } = about || {};

    useEffect(() => {
        dispatch(fetchPortfolioData()); // Fetch data when component mounts
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Optionally show a loading indicator
    }

    return (
        <div>
            <SectionTitle title="About" />
            <div className="flex w-full items-center max-sm:flex-col">
                <div className='h-[70vh] w-1/2 max-sm:w-full'>
                    <lottie-player src={lottieURL} background="##FFFFFF"
                        loop autoplay direction="1" mode="normal"></lottie-player>
                </div>
                <div className="flex flex-col gap-5 w-1/2 max-sm:w-full">
                    <p className='text-white'>
                        {description1 || ''}
                    </p>
                    <p className='text-white'>
                        {description2 || ''}
                    </p>
                </div>
            </div>
            <div className='py-5'>
                <h1 className="text-tertiary text-xl">
                    Here are a few technologies I have been working with recently:
                </h1>
                <div className="flex flex-wrap gap-10 mt-5">
                    {skills && skills.map((skill, index) => (
                        <div key={index} className='border border-tertiary py-3 px-10'>
                            <h1 className='text-tertiary'>{skill}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
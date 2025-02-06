import React, { useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolioData } from '../../redux/rootSlice'; // Adjust the import path accordingly

function Contact() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { contact } = portfolioData;

    // Dispatch the thunk to fetch portfolio data when the component mounts
    useEffect(() => {
        dispatch(fetchPortfolioData());
    }, [dispatch]);

    return (
        <div>
            <SectionTitle title="Say Hello" />
            <div className="flex flex-row items-center justify-between max-sm:flex-col">
                <div className="flex flex-col gap-1">
                    <h1 className='text-white'>{"{"}</h1>
                    {Object.keys(contact).map((key) => (
                        key !== '_id' &&
                        <h1 key={key} className='text-white ml-5'>
                            <span>{key} : </span>
                            <span>{contact[key] !== null ? contact[key] : "N/A"}</span>
                        </h1>
                    ))}
                    <h1 className='text-white'>{"}"}</h1>
                </div>

                <div className='h-[500px] max-sm:h-[300px]'>
                    <lottie-player 
                        src="https://lottie.host/31b9f376-234f-4e13-8162-c13e6c24fd6f/309gUGCS6h.json" 
                        background="##fff" 
                        speed="1"
                        loop
                        autoplay
                    ></lottie-player>
                </div>
            </div>
        </div>
    );
}

export default Contact;
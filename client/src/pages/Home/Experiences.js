import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Experiences() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const { portfolioData, loading } = useSelector((state) => state.root);
    
    // Check if portfolioData is available and has experience data
    const experience = portfolioData?.experience || [];

    return (
        <div>
            <SectionTitle title='Experience' />
            {loading ? (
                <p className="text-white">Loading...</p> // You can replace this with a Loader component if you have one
            ) : (
                <div className="flex py-10 gap-20 max-sm:flex-col">
                    <div className='flex flex-col gap-10 border-l-2 border-[#375e37] w-1/3 max-sm:flex-row max-sm:overflow-x-scroll max-sm:w-full'>
                        {experience.length > 0 ? (
                            experience.map((exp, index) => (
                                <div 
                                    onClick={() => setSelectedItemIndex(index)}
                                    key={index} 
                                    className='cursor-pointer'>
                                    <h1 
                                        className={`text-xl px-5
                                            ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[2px] bg-[rgba(26,127,90,0.28)] py-3' : 'text-white'}`}>
                                        {exp.period}
                                    </h1>
                                </div>
                            ))
                        ) : (
                            <p className="text-white">No experience data available.</p>
                        )}
                    </div>
                    {experience.length > 0 && (
                        <div className='flex flex-col gap-5'>
                            <h1 className="text-secondary text-2xl">{experience[selectedItemIndex].title}</h1>
                            <h1 className="text-white text-2xl">{experience[selectedItemIndex].company}</h1>
                            <p className='text-white'>
                                {experience[selectedItemIndex].description || 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et tempore error quas velit odio saepe labore similique pariatur aliquam rem? Magnam corporis harum iste velit fugiat minima adipisci ea nostrum.'}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Experiences;
import React, { useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolioData } from '../../redux/rootSlice'; // Import the thunk

function Projects() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const dispatch = useDispatch();
    const { portfolioData, loading } = useSelector((state) => state.root);
    const { project } = portfolioData || { project: [] }; // Default to an empty array if project is undefined

    // Dispatch the thunk to fetch portfolio data if not already available
    useEffect(() => {
        if (!portfolioData) {
            dispatch(fetchPortfolioData());
        }
    }, [portfolioData, dispatch]);

    if (loading) {
        return <div className="text-white">Loading projects...</div>; // Loading state
    }

    return (
        <div>
            <SectionTitle title="Projects" />
            <div className="flex py-10 gap-20 max-sm:flex-col">
                <div className='flex flex-col gap-10 border-l-2 border-[#375e37] w-1/3 max-sm:flex-row max-sm:overflow-x-scroll max-sm:w-full'>
                    {project.map((proj, index) => (
                        <div 
                            onClick={() => {
                                setSelectedItemIndex(index);
                            }}
                            key={index} 
                            className='cursor-pointer'>
                            <h1 
                                className={`text-xl px-5
                                    ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[2px] bg-[rgba(26,127,90,0.28)] py-3' : 'text-white'}`}>
                                {proj.title}
                            </h1>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-10 max-sm:flex-col">
                    {project.length > 0 && (
                        <>
                            <img src={project[selectedItemIndex].image} alt="" className='h-60 w-72' />
                            <div className='flex flex-col gap-5'>
                                <h1 className="text-secondary text-2xl">{project[selectedItemIndex].title}</h1>
                                <p className="text-white">{project[selectedItemIndex].description}</p>
                                <p className='text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et tempore error quas velit odio saepe labore similique pariatur aliquam rem? Magnam corporis harum iste velit fugiat minima adipisci ea nostrum.</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Projects;
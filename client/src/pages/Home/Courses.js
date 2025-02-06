import React, { useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolioData } from "../../redux/rootSlice"; // Adjust the import path accordingly

function Courses() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;

    // Dispatch the thunk to fetch portfolio data when the component mounts
    useEffect(() => {
        dispatch(fetchPortfolioData());
    }, [dispatch]);

    return (
        <div>
            <SectionTitle title="Education" />
            <div className="flex py-10 gap-20 max-sm:flex-col">
                <div className='flex flex-col gap-10 border-l-2 border-[#375e37] w-1/3 max-sm:flex-row max-sm:overflow-x-scroll max-sm:w-full'>
                    {courses.map((course, index) => (
                        <div 
                            onClick={() => {
                                setSelectedItemIndex(index);
                            }}
                            key={index} 
                            className='cursor-pointer'>
                            <h1 
                                className={`text-xl px-5
                                    ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[2px] bg-[rgba(26,127,90,0.28)] py-3' : 'text-white'}`}>
                                {course.title}
                            </h1>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-10 max-sm:flex-col">
                    <div className='flex flex-col gap-5'>
                        <h1 className="text-secondary text-2xl">{courses[selectedItemIndex].title}</h1>
                        <p className='text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et tempore error quas velit odio saepe labore similique pariatur aliquam rem? Magnam corporis harum iste velit fugiat minima adipisci ea nostrum.</p>
                    </div>
                    <img src={courses[selectedItemIndex].image} alt="" className='h-52 w-80' />
                </div>
            </div>
        </div>
    );
}

export default Courses;
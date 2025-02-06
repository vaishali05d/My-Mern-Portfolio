import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPortfolioData } from '../../redux/rootSlice'; // Adjust the import path as necessary

function LeftSider() {
  const dispatch = useDispatch();

  // Dispatch the fetchPortfolioData action when the component mounts
  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  return (
    <div className="fixed left-0 bottom-0 px-10 max-sm:static">
      <div className='flex flex-col items-center'>
        <div className="flex flex-col gap-3 max-sm:flex-row">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="ri-facebook-circle-line text-gray-400 text-xl hover:text-tertiary transition-colors duration-200"></i>
          </a>
          <a href="mailto:example@example.com" aria-label="Email">
            <i className="ri-mail-line text-gray-400 text-xl hover:text-tertiary transition-colors duration-200"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="ri-linkedin-box-line text-gray-400 text-xl hover:text-tertiary transition-colors duration-200"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="ri-instagram-line text-gray-400 text-xl hover:text-tertiary transition-colors duration-200"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="ri-github-fill text-gray-400 text-xl hover:text-tertiary transition-colors duration-200"></i>
          </a>
        </div>
        <div className="w-[1px] h-32 bg-tertiary max-sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
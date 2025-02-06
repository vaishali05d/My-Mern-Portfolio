import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Introduction from './Introduction';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Courses from './Courses';
import Contact from './Contact';
import Footer from './Footer';
import LeftSider from './LeftSider';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolioData } from '../../redux/rootSlice'; // Import the thunk

function Home() {
  const dispatch = useDispatch();
  const { portfolioData, loading } = useSelector((state) => state.root);

  // Dispatch the thunk to fetch portfolio data when the component mounts
  useEffect(() => {
    if (!portfolioData) {
      dispatch(fetchPortfolioData());
    }
  }, [portfolioData, dispatch]);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-white">Loading...</p> {/* You can replace this with a Loader component if you have one */}
        </div>
      ) : (
        portfolioData && (
          <div className='px-40 max-sm:px-5 bg-gradient-to-r from-slate-900 to-slate-800'>
            <Introduction />
            <About />
            <Experiences />
            <Projects />
            <Courses />
            <Contact />
            <Footer />
            <LeftSider />
          </div>
        )
      )}
    </div>
  );
}

export default Home;
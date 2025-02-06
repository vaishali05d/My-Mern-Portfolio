import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect } from 'react';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioData } from './redux/rootSlice'; // Import the thunk
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch portfolio data on mount if it's not already available
    if (!portfolioData) {
      dispatch(fetchPortfolioData());
    }
  }, [portfolioData, dispatch]);

  useEffect(() => {
    // Fetch portfolio data if reloadData is true
    if (reloadData) {
      dispatch(fetchPortfolioData());
    }
  }, [reloadData, dispatch]);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin-login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';

const BASE_URL = 'http://localhost:8000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        console.log('There was an error fetching cities.');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 10000);
      }
    }

    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<p>List of cities</p>} />
          <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='countries' element={<p>list of countries</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

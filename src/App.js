import Header from './components/Header';

import './scss/app.scss';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import { useState } from 'react';

function App() {
  const [serchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <Header  serchValue = {serchValue} setSearchValue = {setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home serchValue = {serchValue} setSearchValue = {setSearchValue} />} />
            <Route path="/card" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

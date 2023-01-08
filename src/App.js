import Header from './components/Header';

import './scss/app.scss';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import { createContext, useState } from 'react';

export const SearchContext = createContext('');

function App() {
  const [serchValue, setSearchValue] = useState('');
  


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{serchValue, setSearchValue}}>
              <Header serchValue={serchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home/>}
              />
              <Route path="/card" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

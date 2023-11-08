import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Navbar, View, About, BasePage, Search } from './components';
import { Home, Login, SignUp, CreateClass, CreateCard } from './pages/index';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [changeUI, setChangeUI] = useState(false);
  const changeUIHandler = () => {
    setChangeUI(true);
  };
  const isPageNotUseHeader =
    window.location.pathname === '/login' ||
    window.location.pathname === '/signup';
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />

      <div className={`h-full ${!isPageNotUseHeader ? 'pt-24' : ''}`}>
        <BrowserRouter>
          {!isPageNotUseHeader ? <Navbar changeUI={changeUI} /> : null}
          <Routes>
            <Route path='/' element={<BasePage changeUI={changeUIHandler} />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/search' element={<Search />}></Route>
              <Route path='/about' element={<About />}></Route>
            </Route>

            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route
              path='/view'
              element={<View changeUI={changeUIHandler} />}
            ></Route>
            <Route
              path='/create-card'
              element={<CreateCard changeUI={changeUIHandler} />}
            ></Route>
            <Route
              path='/create-class'
              element={<CreateClass changeUI={changeUIHandler} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/* {
        changeUI &&
        <Footer/>

      } */}
    </>
  );
}

export default App;

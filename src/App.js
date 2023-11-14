import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header, View, BasePage } from './components';
import {
  Home,
  Login,
  SignUp,
  CreateClass,
  CreateSet,
  Class,
  Profile,
  Settings,
  Set,
  EditSet,
  Search,
  About,
} from './pages';

import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
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
          {!isPageNotUseHeader ? <Header changeUI={changeUI} /> : null}
          <Routes>
            <Route path='/' element={<BasePage changeUI={changeUIHandler} />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/search' element={<Search />}></Route>
              <Route path='/about' element={<About />}></Route>
            </Route>

            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/class/:id' element={<Class />}></Route>
            <Route path='/set/:id' element={<Set />}></Route>
            <Route path='/profile/:id' element={<Profile />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path='/set/edit/:id' element={<EditSet />}></Route>
            <Route
              path='/view'
              element={<View changeUI={changeUIHandler} />}
            ></Route>
            <Route
              path='/create-set'
              element={<CreateSet changeUI={changeUIHandler} />}
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

import React from 'react';
import './App.css';
import List_page from './Pages/List_page';
import Navbar from './Components/Navbar/Navbar';
import { FormProvider } from '../src/Components/FormContext.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Adminmain from './Pages/Adminmain.jsx';
import Login from './Components/Login_Sign_up/Login.jsx';
import About from './Pages/About.jsx';
import Success from './Components/Success.jsx';
import Cancel from './Components/Cancel.jsx';
import Problem_statements from './Pages/Problem_statements.jsx';
import Participate from './Components/Participate/Participate.jsx';
import Participation_form from './Components/Participation_form/Participation_form.jsx';
import Subscription from './Components/Subscription/Subscription.jsx';
import ContactUs from './Pages/Contact.jsx';

export default function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<Adminmain />} />
          <Route path='/home' element={<List_page />} />
          <Route path='/problem' element={<Problem_statements />} />
          <Route path='/problem/:hackathon_name' element={<Problem_statements />} />
          <Route path='/problem/:hackathon_name/participation/participate' element={<Participate />} />
          <Route path='/about' element={<About />} />
          <Route path='/problem/:hackathon_name/participation' element={<Participation_form/>} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/contact' element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

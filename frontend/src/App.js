import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import NavView from './navbar/NavView';
import About from './about/About';
import NotFound from './NotFound'
import { ContextProvider } from './Context';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import AllCars from './cars/AllCars';
import CarsByType from './cars/CarsBytype';
import AddCars from './cars/AddCars';
import Car from './cars/Car';
import Search from './search/Search'
import Login from './auth/Login';
import AlertView from './comp/AlertView';
import Read from './message/Read';
import Panel from './panel/Panel';

function App() {
  return (
    <ContextProvider>
    <NavView />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/all/' element={<AllCars />}/>
      <Route path='/add/' element={<AddCars />}/>
      <Route path='/about/' element={<About />}/>
      <Route path='/contact/' element={<Contact />}/>
      <Route path='/search/' element={<Search />}/>
      <Route path='/login/' element={<Login />}/>
      <Route path='/read/' element={<Read />}/>
      <Route path='/panel/' element={<Panel />}/>
      <Route path='/search/:val' element={<Search />}/>
      <Route path='/cars/:tipi' element={<CarsByType />}/>
      <Route path='/add/:id' element={<AddCars />}/>
      <Route path='/car/:id' element={<Car />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>
    <AlertView />
    <Footer />
    </ContextProvider>
  );
}

export default App;

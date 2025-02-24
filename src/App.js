import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import View from './Components/View';
import Upgrade from './Components/Upgrade';
import AuthForm from './Components/AuthForm';
function App() {
  return (
    <>
      <BrowserRouter>
       
        <Routes>
        <Route path='/' element={<AuthForm/>} />
          <Route path="/Home" element={<Home />} />
          <Route path="/View" element={<View />} />

          <Route path="/upgrade/:_id" element={<Upgrade />} />
        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;

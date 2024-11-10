import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Create from './Create';
import Update from './Update';
import List from './List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/list' element={<List />}></Route>
        <Route path='/update/:id' element={<Update />}></Route>
        <Route path='/create' element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

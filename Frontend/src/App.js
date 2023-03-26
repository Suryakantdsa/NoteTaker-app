import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import SignUP from './Component/SignUP';
import SignIn from './Component/SignIn';
import Home from './Component/Home';
import AddNotes from './Component/AddNotes';
import PrivateComponet from './Component/PrivateComponet';
import NoteDetails from './Component/NoteDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<PrivateComponet/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/addnote' element={<AddNotes/>}/>
        <Route path='/:id' element={<NoteDetails/>}/>

        </Route>

        <Route path='/signup' element={<SignUP/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/' element={<SignIn/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

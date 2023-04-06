import './App.css';
import Navbar from "./components/Navbar";
import Main from './components/Main';
import Director from './components/Director';
import HOD from './components/HOD';
import Faculty from './components/Faculty';
import Footer from "./components/Footer";
import DirectorHome from './components/DirectorHome';
import HODHome from './components/HODHome';
import FacultyHome from './components/FacultyHome';
import HODupload from './components/HODupload';
import Facultyupload from './components/Facultyupload';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/Director" element={<Director/>}/>
        <Route exact path="/HOD" element={<HOD/>}/>
        <Route exact path="/Faculty" element={<Faculty/>}/>
        <Route exact path="/DirectorHome" element={<DirectorHome/>}/>
        <Route exact path="/HODHome" element={<HODHome/>}/>
        <Route exact path="/FacultyHome" element={<FacultyHome/>}/>
        <Route exact path="/HODupload" element={<HODupload/>}/>
        <Route exact path="/Facultyupload" element={<Facultyupload/>}/>
      </Routes>
      {/* <Footer/> */}
      </Router>
    </>
  )
}

export default App;

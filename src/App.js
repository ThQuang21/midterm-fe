import './App.css';
import Profile from "./components/Profile";
import { Routes, Route, Link } from "react-router-dom";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {
  return (

        <Routes>

          <Route exact path="/profile" element={<Profile />} />
          {/* <Route exact path="/home" element={<Home/>} /> */}
          <Route exact path="/signin" element={<SignIn/>} />
          <Route exact path="/signup" element={<SignUp/>} />
        </Routes>
        
  );
}

export default App;
import './App.css';
import Home from './Pages/Home';
import Logo from './Components/Logo';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import NewsState from './Context/News/NewsState';
import { useState } from 'react';
import Footer from './Components/Footer';
import News from './Pages/News';
import Article from './Pages/Article';
import Interview from './Pages/Interview';
import Event from './Pages/Event';
import Magazine from './Pages/Magazine';
import SpecificNews from './Pages/SpecificNews';
import ScrollToTop from './Components/ScrollToTop';
import AddNews from './Pages/AddNews';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import SearchNews from './Pages/SearchNews';
import Alert from './Components/Alert';
import AddMagazine from './Pages/AddMagazine';

function App() {

  const [showSearch, setShowSearch] = useState(false);

  const [alert, setAlert] = useState(null);

  const [showProfile, setShowProfile] = useState(false);

  const [showAddMenu, setShowAddMenu] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2100);
  }


  return (
    <NewsState>
      <div>
        <Router>
          <Logo />
          <Navbar showAddMenu={showAddMenu} setShowAddMenu={setShowAddMenu} showAlert={showAlert} showProfile={showProfile} setShowProfile={setShowProfile} showSearch={showSearch} setShowSearch={setShowSearch} />
          <ScrollToTop />
          <Routes>

            <Route index exact path='/' element={<Home showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/news' element={<News showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/article' element={<Article showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/interview' element={<Interview showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/event' element={<Event showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/magazine' element={<Magazine showProfile={showProfile} showAddMenu={showAddMenu} showAlert={showAlert} />} />
            <Route exact path='/snews/:tag/:id' element={<SpecificNews showProfile={showProfile} showAddMenu={showAddMenu} showAlert={showAlert} />} />
            <Route exact path='/addnews' element={<AddNews showProfile={showProfile} showAddMenu={showAddMenu} showAlert={showAlert} />} />
            <Route exact path='/addmagazine' element={<AddMagazine showProfile={showProfile} showAddMenu={showAddMenu} showAlert={showAlert} />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route exact path='/search/news' element={<SearchNews showProfile={showProfile} showAddMenu={showAddMenu} />} />

            <Route path="*" element={<Home showProfile={showProfile} showAddMenu={showAddMenu} />} />
          </Routes>
          <Footer />
          <Alert alert={alert} />
        </Router>
      </div>
    </NewsState>
  );
}

export default App;

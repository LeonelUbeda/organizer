import React from 'react';
import Sidebar from './Layout/Sidebar.jsx'
import Note from './Pages/Note.jsx'
import Login from './Pages/Login.jsx'
import './css/theme.css'
import './css/tailwind.css'
import './css/normalize.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {
  let sidebar = {
    width: '150px',
    height: '100vh',
  }
  let route = {
    width: 'calc(100vw  - 150px)',
    marginLeft: '150px',

  }
  return (
    <div className="App" >
      <header className="App-header">
        <Router>
          <div className="absolute top-0 left-0" style={sidebar}>
            <Sidebar/>
          </div>
          <div style={route}>
            <Switch>
              <Route path="/myday">
                <Note/>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;

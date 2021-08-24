import React from 'react'
import {Navbar} from "./components/Navbar/Navbar"
import {Home} from "./pages/Home/Home"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {About} from "./pages/About"
import {Profile} from "./pages/Profile/Profile"
import {Alert} from "./components/Alert/Alert"
import {AlertState} from "./context/alert/alertState";
import {GithubState} from "./context/github/githubState";

function App() {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Navbar/>
          <div className="container pt-4">
            <Alert/>
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/about' component={About}/>
              <Route path='/profile/:name' component={Profile}/>
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;

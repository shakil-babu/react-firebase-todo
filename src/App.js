import { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';


export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path='/' component={Header}/>
            </Switch>
          </BrowserRouter>
        
    </div>
  );
}

export default App;

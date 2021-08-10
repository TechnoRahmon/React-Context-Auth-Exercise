import logo from './logo.svg';
import './App.css';
import react,{ useEffect , useState  } from 'react'
import {Switch , Route } from 'react-router-dom'

import Home from './screen/Home'
import Login from './screen/Login'
import Register from './screen/Register'
import NavBar from './Layout/NavBar'

import PrivateRoute from './Route/PrivateRoute'
import PhoneBook from './screen/PhoneBook'

function App() {



  return (
    <div className="App">
    

          <NavBar  />
         
          <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <PrivateRoute exact path='/phone-book' component={PhoneBook} /> 
          </Switch>
      
    

    </div>
  );
}

export default App;

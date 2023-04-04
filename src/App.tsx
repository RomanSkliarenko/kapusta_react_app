import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Header} from './components/header/header';
import Authorization from './components/authorization/authorization';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Header/>}>
        <Route path='login' element={<Authorization type={'login'}/>}/>
        <Route path='register' element={<Authorization type={'signup'}/>}/>
      </Route>
    </Routes>
  );
}

export default App;

import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { PageLayout } from './components/PageLayout/PageLayout';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './constants/constants';
import { UserContext} from './contexts/UserContextWrapper';
import { Expenses } from './pages/Expenses/Expenses';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { NotFound} from './pages/NotFound/NotFound';

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    //jeigu Token yra, užsisetiname Token, bet prieš tai token užsisetiname į index.js
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const { id, name} = data;
          setUser({id, name});
          Navigate('/');
        }
      })
    }
  }, []);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element= {<Expenses />}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
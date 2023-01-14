import './App.css';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Expenses } from './pages/Expenses/Expenses';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Login } from './pages/Login/Login';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/');
  }

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<PageLayout user={user} />}>
          <Route index element= {<Expenses />}/>
        </Route>
        <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />}/>
      </Routes>
    </div>
  );
}
export default App;
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <Routes >
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/set-avatar' element={<SetAvatar />} />
      <Route path='/' element={<Chat />} />
    </Routes>
  );
}

export default App;

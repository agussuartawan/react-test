import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserEdit from './components/UserEdit';

function App() {
  return (
    <BrowserRouter>
      <div class='p-5 h-screen bg-gray-100'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<UserList />} />
            <Route path='/form' element={<UserForm />} />
            <Route path='/edit/:id' element={<UserEdit />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Main from './pages/Main';
import BlogCreate from './pages/BlogCreate';

export const BACK_URL = 'https://backend.anujsd.workers.dev';
// export const BACK_URL = 'http://127.0.0.1:8787';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog/:blogId' element={<Blog />} />
          <Route path='/' element={<Main />} />
          <Route path='/blog/create' element={<BlogCreate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

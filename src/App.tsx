import { RouterProvider } from 'react-router';
import { router } from './routes';
import './App.css';

function App() {
  return (
    <>
      <section className='container min-vh-100 d-flex justify-content-center align-items-center'>
        <RouterProvider router={router} />
      </section>
    </>
  )
}

export default App

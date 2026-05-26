import { RouterProvider } from 'react-router';
import { router } from './routes';
import ToastContainer from './components/molecules/ToastContainer';
import './App.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App

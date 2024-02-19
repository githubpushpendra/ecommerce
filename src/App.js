import './App.css';
import { StateContext, ContextProvider } from './components/Context.js';
// import Cart from './components/Cart.js';
import Shop from './components/Shop.js';
import AuthoForm from './components/AuthForm.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddedItems from './components/AddedItems.js';

function App() {
  // const {state, dispatch} = useContext(StateContext)

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthoForm />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/your-items' element={<AddedItems />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>  
    </ContextProvider>
  );
}

// Define a component for handling 404 errors
function NotFound() {
  return <h1>404 - Not Found</h1>;
}

export default App;

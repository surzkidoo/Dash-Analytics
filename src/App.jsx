import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { store } from './store';
import SignupPage from "./Pages/SignupPage";
import SigninPage from "./Pages/SigninPage";
import DashbaordPage from "./Pages/DashbaordPage";


const queryClient = new QueryClient()


function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
          <Routes>
          <Route path="/sign-up" element={<SignupPage/>} />
          <Route path="/sign-in" index element={<SigninPage/>} />
            <Route path="/"  element={<DashbaordPage/>} />
            
          </Routes>
      
    </BrowserRouter>
    </QueryClientProvider>
    </Provider>

  );
}

export default App;

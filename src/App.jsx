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
import { ProtectedRoute } from "./Components/PrivateRoute";
import DashbaordTemplete from "./Components/DashboardTemplete";
import TransactionPage from "./Pages/TransactionPage";
import UserPage from "./Pages/UserPage";
import Reset from "./Pages/Reset";
import ActivationPage from "./Pages/ActivationPage";
import NewPassword from "./Pages/NewPassword";
import chat from './assets/chat.svg'
import AdsPage from "./Pages/AdsPage";
import UserPageDetail from "./Pages/UserPageDetail";


const queryClient = new QueryClient()


function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
          <Routes>
          <Route path="/sign-up" element={<SignupPage/>} />
          <Route path="/sign-in" index element={<SigninPage/>} />
          <Route path="/reset" index element={<Reset/>} />
          <Route path="/activate-account" index element={<ActivationPage/>} />
          <Route path="/new-password" index element={<NewPassword/>} />

          <Route element={<ProtectedRoute  element={<DashbaordTemplete/>} />}>
          <Route path="/"   element={<DashbaordPage/>} />
          <Route path="dashboard/transaction"   element={<TransactionPage/>} />
          <Route path="dashboard/user"   element={<UserPage/>} />
          <Route path="dashboard/user/:id"   element={<UserPageDetail/>} />

          <Route path="dashboard/ads"   element={<AdsPage/>} />



          </Route>
          
            
          </Routes>

          <button className="bg-primary btn hover:bg-secondary  outline-none fixed bottom-[10px] right-[10px] md:bottom-[48px] md:right-[48px] w-[60px] md:w-[180px]  text-white flex items-center justify-center rounded-[5px] h-p[57px] gap-[12px]">
              <p className="hidden md:block">Support</p>
               

            <img src={chat} alt="" />

          </button>
      
    </BrowserRouter>
    </QueryClientProvider>
    </Provider>

  );
}

export default App;

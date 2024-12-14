import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import store from './store.js';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import MainLayout from './layouts/MainLayout';
import NotFoundScreen from './screens/NotFoundScreen';
import HomeScreen from './screens/HomeScreen';
import EmployeeListScreen from './screens/EmployeeListScreen.jsx';
import DepartmentListScreen from './screens/DepartmentListScreen.jsx';
import EmployeeScreen from './screens/EmployeeScreen.jsx';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route path='*' element={<NotFoundScreen />} />
                <Route index element={<HomeScreen />} />
                <Route path='/employees' element={<EmployeeListScreen />}/>
                <Route path='/employee/:id' element={<EmployeeScreen />}/>
                <Route path='/departments' element={<DepartmentListScreen />}/>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

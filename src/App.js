import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './Components/ProtectedRoute';
import RootLayout from './Components/Root';
import UsersMainContent from './Components/UserContent/UsersMainContent';
import RolesMainContent from './Components/RolesContent/RolesMainContent';
import PermissionsMainContent from './Components/PermissionsContent/PermissionsMainContent';
import DashboardContextProvider from './store/dashboardContext';
import HomePage from './Components/HomeContent/HomePage';
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><RootLayout/></ProtectedRoute>,
    errorElement: <h1>Error</h1>,
    children: [
      { index: true, element: <HomePage />  },
      { path: '/users', element:  <UsersMainContent /> },
      { path: '/permissions', element:  <PermissionsMainContent /> },
      { path: '/roles', element:  <RolesMainContent /> }
    ]
  }
])

function App() {
  return (
    <DashboardContextProvider>
      <ToastContainer />
      <RouterProvider router={router} className="App"/>
    </DashboardContextProvider>
  );
}

export default App;

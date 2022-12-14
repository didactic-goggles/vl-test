import { RouteObject, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { selectAuth } from 'reducers/auth/authSlice';
import Loading from 'components/loading';

// Auth Pages
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';

// Applications
import Applications from 'pages/applications/Applications';
// import ApplicationDetails from 'pages/applications/ApplicationDetails';
import ApplicationForm from 'pages/applications/ApplicationForm';

import NoMatch from 'pages/NoMatch';

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  if (auth.status === 'fetching') {
    return <Loading text='Fetching auth data' />;
  }
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequireAuth>
        <Applications />
      </RequireAuth>
    )
  },
  {
    path: '/application',
    element: <Navigate to="/" />
  },
  {
    path: '/application/create',
    element: (
      <RequireAuth>
        <ApplicationForm />
      </RequireAuth>
    )
  },
  {
    path: '/application/update',
    element: <Navigate to="/" />
  },
  {
    path: '/application/update/:applicationId',
    element: (
      <RequireAuth>
        <ApplicationForm />
      </RequireAuth>
    )
  },
  // {
  //   path: '/application/:applicationId',
  //   element: (
  //     <RequireAuth>
  //       <ApplicationDetails />
  //     </RequireAuth>
  //   )
  // },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: '*',
    element: <NoMatch />
  }
];

export default routes;

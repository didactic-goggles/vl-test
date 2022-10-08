import { useEffect } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from 'app/hooks';
import routes from 'router';
import { fetchUser } from 'reducers/auth/authSlice';
import Header from 'layout/Header';
import Footer from 'layout/Footer';
import Breadcrumbs from 'layout/Breadcrumbs';
import './App.scss';

function App() {
  const routesElement = useRoutes(routes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <Breadcrumbs />
        {routesElement}
        <Outlet />
        <ToastContainer theme='colored' position='top-right' hideProgressBar={true} />
      </main>
      <Footer />
    </>
  );
}

export default App;

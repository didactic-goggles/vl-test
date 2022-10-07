import { useEffect } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import routes from 'router';
import { fetchUser } from 'reducers/auth/authSlice';
import Header from 'layout/header';
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
        {routesElement}
        <Outlet />
      </main>
    </>
  );
}

export default App;

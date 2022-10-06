import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout, selectAuth } from 'reducers/auth/authSlice';

const Header: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  console.log(auth.user)

  if (!auth.user) return null;

  return (
    <header>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;

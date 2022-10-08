import { useAppSelector } from 'app/hooks';
import { Link, useLocation } from 'react-router-dom';
import { selectAuth } from 'reducers/auth/authSlice';

const Breadcrumbs: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  if (!user) return null;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {pathnames.length ? (
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
        ) : (
          <li className="breadcrumb-item active" aria-current="page">
            Home
          </li>
        )}
        {pathnames.map((name, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li
              className="breadcrumb-item text-capitalize active"
              aria-current="page"
              key={name}
            >
              {name}
            </li>
          ) : (
            <li className="breadcrumb-item text-capitalize" key={name}>
              <Link to={to}>{name}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

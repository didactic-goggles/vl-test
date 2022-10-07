import { Link, NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout, selectAuth } from 'reducers/auth/authSlice';

const Header: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <header className="px-3 py-2 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-start">
          <Link
            to="/"
            className="d-flex align-items-center text-dark text-decoration-none me-3"
          >
            <i className="bi bi-bootstrap-fill fs-1"></i>
          </Link>

          <ul className="nav col-auto me-auto justify-content-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-2 link-secondary ${isActive && 'fw-semibold'}`
                }
                end
              >
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/application/create"
                className={({ isActive }) =>
                  `nav-link px-2 link-secondary ${isActive && 'fw-semibold'}`
                }
                end
              >
                Create Application
              </NavLink>
            </li>
          </ul>

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdown-user"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <span>{user.username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <i className="bi bi-box-arrow-left text-danger me-2"></i>
                <span className="fw-semibold">Logout</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;

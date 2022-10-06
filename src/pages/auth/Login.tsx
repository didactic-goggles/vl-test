import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form } from 'react-final-form';
import { useAppDispatch } from 'app/hooks';
import { login } from 'reducers/auth/authSlice';
import { UserLoginPayload } from 'models/auth.model';
import FormField from 'components/form-field';
import './form.scss';
import FetchButton from 'components/fetch-button';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || '/';

  const handleLoginFormSubmit = async (formData: UserLoginPayload) => {
    try {
      await dispatch(login(formData));
      navigate(from, { replace: true });
      // navigate(from, { replace: true });
    } catch (error) {
      // error
    }
  };
  return (
    <div className="container h-100 d-flex">
      <div className="card shadow m-auto border-0">
        <div className="card-body p-5">
          <Form
            onSubmit={handleLoginFormSubmit}
            render={({ handleSubmit, submitting }) => (
              <form className="form-auth w-100" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="mb-3">
                  <FormField
                    name="username"
                    label="Username"
                    placeholder="Email"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <FetchButton
                  type="submit"
                  loading={submitting}
                  className="w-100"
                >
                  Login
                </FetchButton>
              </form>
            )}
          />
          <div className="text-center mt-3">
            <Link to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

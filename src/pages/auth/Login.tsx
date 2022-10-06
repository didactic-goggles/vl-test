import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form } from 'react-final-form';
import { useAppDispatch } from 'app/hooks';
import { login } from 'reducers/auth/authSlice';
import { UserLoginPayload } from 'models/auth.model';
import FormField from 'components/form-field';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || '/';

  const handleLoginFormSubmit = async (formData: UserLoginPayload) => {
    try {
      await dispatch(login(formData));
      navigate(from, { replace: true })
      // navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Link to="/register">Register</Link>
      <Form
        onSubmit={handleLoginFormSubmit}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <FormField name="username" placeholder="Email" type="text" />
            <FormField name="password" placeholder="Password" type="password" />
            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </form>
        )}
      />
    </>
  );
};

export default LoginForm;

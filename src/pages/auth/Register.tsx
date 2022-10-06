import { useNavigate, Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { useAppDispatch } from 'app/hooks';
import { register } from 'reducers/auth/authSlice';
import { UserRegisterPayload } from 'models/auth.model';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleRegisterFormSubmit = async (formData: UserRegisterPayload) => {
    await dispatch(register(formData));
    navigate('/');
  };
  return (
    <>
      <Link to="/login">Login</Link>

      <Form
        onSubmit={handleRegisterFormSubmit}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <Field<string>
                name="firstname"
                component="input"
                placeholder="First Name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <Field<string>
                name="lastname"
                component="input"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label>Password</label>
              <Field<string>
                name="password"
                component="input"
                placeholder="Password"
              />
            </div>
            <div>
              <label>Password Confirm</label>
              <Field<string>
                name="password_confirm"
                component="input"
                placeholder="Password Confirm"
              />
            </div>
            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </form>
        )}
      />
    </>
  );
};

export default Signup;

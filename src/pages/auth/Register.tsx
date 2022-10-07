import { useNavigate, Link } from 'react-router-dom';
import { Form } from 'react-final-form';
import { useAppDispatch } from 'app/hooks';
import { register } from 'reducers/auth/authSlice';
import { UserRegisterPayload } from 'models/auth.model';
import FormField from 'components/form-field';
import FetchButton from 'components/fetch-button';
import { toast } from 'react-toastify';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRegisterFormSubmit = async (formData: UserRegisterPayload) => {
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container h-100 d-flex">
      <div className="card shadow m-auto border-0">
        <div className="card-body p-5">
          <Form
            onSubmit={handleRegisterFormSubmit}
            render={({ handleSubmit, submitting }) => (
              <form
                className="max-w-450 min-w-sm-330 min-w-unset"
                onSubmit={handleSubmit}
              >
                <h1 className="h3 mb-3 fw-normal">Register</h1>
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="username"
                    label="Username"
                    placeholder="Username"
                    type="text"
                  />
                </div>
                {/* <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="lastname"
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    rules={['required', 'email']}
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                  />
                </div> */}
                <div className="mb-3">
                  <FormField
                    rules={['required']}
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
                  Register
                </FetchButton>
              </form>
            )}
          />
          <div className="text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

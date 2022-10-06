import { useNavigate, Link } from 'react-router-dom';
import { Form } from 'react-final-form';
import { useAppDispatch } from 'app/hooks';
import { register } from 'reducers/auth/authSlice';
import { UserRegisterPayload } from 'models/auth.model';
import FormField from 'components/form-field';
import './form.scss';
import FetchButton from 'components/fetch-button';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRegisterFormSubmit = async (formData: UserRegisterPayload) => {
    await dispatch(register(formData));
    navigate('/');
  };
  return (
    <div className="container h-100 d-flex">
      <div className="card shadow m-auto border-0">
        <div className="card-body p-5">
          <Form
            onSubmit={handleRegisterFormSubmit}
            render={({ handleSubmit, submitting }) => (
              <form className="form-auth w-100" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Register</h1>
                <div className="mb-3">
                  <FormField
                    name="firstname"
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    name="lastname"
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
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
                <div className="mb-3">
                  <FormField
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
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

// import { useNavigate, Link } from 'react-router-dom';
// import { Form, Field } from 'react-final-form';
// import { useAppDispatch } from 'app/hooks';
// import { register } from 'reducers/auth/authSlice';
// import { UserRegisterPayload } from 'models/auth.model';

// const Signup: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const handleRegisterFormSubmit = async (formData: UserRegisterPayload) => {
//     await dispatch(register(formData));
//     navigate('/');
//   };
//   return (
//     <>
//       <Link to="/login">Login</Link>

//       <Form
//         onSubmit={handleRegisterFormSubmit}
//         render={({ handleSubmit, submitting }) => (
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>First Name</label>
//               <Field<string>
//                 name="firstname"
//                 component="input"
//                 placeholder="First Name"
//               />
//             </div>
//             <div>
//               <label>Last Name</label>
//               <Field<string>
//                 name="lastname"
//                 component="input"
//                 placeholder="Last Name"
//               />
//             </div>
//             <div>
//               <label>Password</label>
//               <Field<string>
//                 name="password"
//                 component="input"
//                 placeholder="Password"
//               />
//             </div>
//             <div>
//               <label>Password Confirm</label>
//               <Field<string>
//                 name="password_confirm"
//                 component="input"
//                 placeholder="Password Confirm"
//               />
//             </div>
//             <button type="submit" disabled={submitting}>
//               Submit
//             </button>
//           </form>
//         )}
//       />
//     </>
//   );
// };

// export default Signup;

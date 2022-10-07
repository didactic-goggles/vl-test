import { Field } from 'react-final-form';

interface IProps {
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  label?: string;
}

const required = (value: string) => (value ? undefined : 'Required');

const FormField: React.FC<IProps> = ({
  name,
  placeholder,
  label,
  type = 'text'
}) => (
  <Field name={name} validate={required}>
    {({ input, meta }) => (
      <>
        <label className="form-label">{label}</label>
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          className="form-control"
        />
        {meta.error && meta.touched && (
          <div className="text-danger my-1 d-flex align-items-center fs-7">
            <i className="bi bi-x-circle me-2"></i>
            <span className="">{meta.error}</span>
          </div>
        )}
      </>
    )}
  </Field>
);

export default FormField;

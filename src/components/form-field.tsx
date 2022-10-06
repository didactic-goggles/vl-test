import { Field } from 'react-final-form';

interface IProps {
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  label?: string
}

const required = (value: string) => (value ? undefined : 'Required');
// const mustBeNumber = (value: number) =>
//   isNaN(value) ? 'Must be a number' : undefined;
// const minValue = (min: number) => (value: number) =>
//   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const FormField: React.FC<IProps> = ({ name, placeholder, label, type = 'text' }) => {
  // let validateFunction = validate === 'required' ? required : minValue

  return (
    <Field name={name} validate={required}>
      {({ input, meta }) => (
        <>
          <label className="form-label">{label}</label>
          <input {...input} type={type} placeholder={placeholder} className="form-control"/>
          {meta.error && meta.touched && <div className='text-danger my-1 d-flex align-items-center fs-7'>
          <i className="bi bi-x-circle me-2"></i>
          <span className=''>{meta.error}</span>
          </div>}
        </>
      )}
    </Field>
  );
};

export default FormField;

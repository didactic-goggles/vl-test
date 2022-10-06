import { Field } from 'react-final-form';

interface IProps {
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
}

const required = (value: string) => (value ? undefined : 'Required');
// const mustBeNumber = (value: number) =>
//   isNaN(value) ? 'Must be a number' : undefined;
// const minValue = (min: number) => (value: number) =>
//   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const FormField: React.FC<IProps> = ({ name, placeholder, type = 'text' }) => {
  // let validateFunction = validate === 'required' ? required : minValue

  return (
    <Field name={name} validate={required}>
      {({ input, meta }) => (
        <div>
          <label>{name}</label>
          <input {...input} type={type} placeholder={placeholder} />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};

export default FormField;

import { Button, Spinner, SpinnerProps } from 'react-bootstrap';

interface IProps {
  type: 'button' | 'submit';
  size?: 'sm' | undefined | 'lg';
  className: string;
  loading: boolean;
  children: JSX.Element | string;
  spinnerOptions?: SpinnerProps;
}

const FetchButton: React.FC<IProps> = ({
  type,
  size,
  className = '',
  loading = false,
  spinnerOptions = {
    animation: 'border',
    size: 'sm'
  },
  children
}) => {
  //   const { type, loading, spinnerOptions, children } = props;
  return (
    <Button className={`flex-center ${className}`} type={type} disabled={loading} size={size}>
      {loading && <Spinner {...spinnerOptions} className="me-2" />}
      {children}
    </Button>
  );
};

export default FetchButton;

import { Button, Spinner, SpinnerProps } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/esm/types';

interface IProps {
  type: 'button' | 'submit';
  size?: 'sm' | undefined | 'lg';
  className: string;
  loading: boolean;
  children: JSX.Element | string;
  spinnerOptions?: SpinnerProps;
  variant?: ButtonVariant;
  onClick?: () => void;
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
  onClick,
  variant = 'primary',
  children
}) => {
  //   const { type, loading, spinnerOptions, children } = props;
  return (
    <Button
      className={`flex-center ${className}`}
      type={type}
      disabled={loading}
      size={size}
      onClick={onClick}
      variant={variant}
    >
      {loading && <Spinner {...spinnerOptions} className="me-2" />}
      {children}
    </Button>
  );
};

export default FetchButton;

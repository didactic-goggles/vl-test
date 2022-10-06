import { Spinner, SpinnerProps } from 'react-bootstrap';

interface IProps {
  text: string;
  spinnerOptions?: SpinnerProps;
}

const Loading: React.FC<IProps> = ({
  text,
  spinnerOptions = {
    animation: 'border',
    size: 'sm'
  }
}) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner {...spinnerOptions} className="me-2" />
      <span>{text}</span>
    </div>
  );
};

export default Loading;

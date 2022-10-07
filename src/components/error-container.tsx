interface IProps {
  errorText: string;
}

const ErrorContainer: React.FC<IProps> = ({ errorText }) => {
  return (
    <div className="text-center">
      <div className="mb-1">
        <i className="bi bi-x-circle fs-1 text-danger"></i>
      </div>
      <h4>{errorText}</h4>
    </div>
  );
};

export default ErrorContainer;

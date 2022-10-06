import { useParams } from 'react-router-dom';

const ApplicationDetails: React.FC = () => {
  const { applicationId } = useParams();

  return <div>{applicationId}</div>;
};

export default ApplicationDetails;

import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { selectApplications } from 'reducers/application/applicationSlice';

const ApplicationDetails: React.FC = () => {
  const { applications } = useAppSelector(selectApplications);
  const { applicationId } = useParams();
  const application = applications.find(
    (a) => a.id.toString() === applicationId
  );

  if (!application) return <Navigate to="/" />;

  return <div>{applicationId}</div>;
};

export default ApplicationDetails;

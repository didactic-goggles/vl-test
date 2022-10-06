import { useAppSelector, useAppDispatch } from 'app/hooks';
import Loading from 'components/loading';
import React, { useEffect } from 'react';
import {
  getAllApplications,
  selectApplications
} from 'reducers/application/applicationSlice';
import ApplicationItem from './application-item/ApplicationItem';
import './applications.scss';

const Applications: React.FC = () => {
  const applications = useAppSelector(selectApplications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (applications.status === 'idle') {
      dispatch(getAllApplications());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (applications.status === 'loading') {
    return <Loading text="Fetching Applications" />;
  }

  return (
    <div className="container">
      <div className="applications-container">
        {applications.applications.map((applicationData) => (
          <ApplicationItem
            key={applicationData.id}
            application={applicationData}
          />
        ))}
      </div>
    </div>
  );
};

export default Applications;

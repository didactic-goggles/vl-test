import { useAppSelector, useAppDispatch } from 'app/hooks';
import Loading from 'components/loading';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllProducts,
  selectApplications
} from 'reducers/application/applicationSlice';

const Applications: React.FC = () => {
  const applications = useAppSelector(selectApplications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (applications.status !== 'fetched') {
      dispatch(getAllProducts());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (applications.status === 'loading') {
    return <Loading />;
  }

  return (
    <div>
      <Link to="/application/new">New Application</Link>
      <div>{applications.applications.length}</div>
      Applications
    </div>
  );
};

export default Applications;

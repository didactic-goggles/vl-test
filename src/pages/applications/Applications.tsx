import React, { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import Loading from 'components/loading';
import {
  getAllApplications,
  selectApplications
} from 'reducers/application/applicationSlice';
import ApplicationItem from './application-item/ApplicationItem';
import './applications.scss';
import ErrorContainer from 'components/error-container';

const Applications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {applications, status} = useAppSelector(selectApplications);
  let filteredApplications = applications;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllApplications());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (searchTerm !== '') {
    filteredApplications = applications.filter((application) => {
      return application.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  const handleChange = (e: React.ChangeEvent) => {
    setSearchTerm((e.target as HTMLInputElement).value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  if (status === 'loading') {
    return <Loading text="Fetching Applications" />;
  }

  if (status === 'fetched') {
    if (applications.length === 0) {
      return (
        <ErrorContainer errorText={`There are no results for ${searchTerm}`} />
      );
    }
  
    if (filteredApplications.length === 0) {
      return (
        <ErrorContainer errorText={`There are no results for ${searchTerm}`} />
      );
    }
  }


  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="row">
            <label
              htmlFor="inputSearchApplciations"
              className="col-auto col-form-label"
            >
              Search in Applications
            </label>
            <div className="col">
              <input
                id="inputSearchApplciations"
                type="search"
                className="form-control"
                onChange={debouncedResults}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="applications-container">
        {filteredApplications.map((applicationData) => (
          <ApplicationItem
            key={applicationData.id}
            application={applicationData}
          />
        ))}
      </div>
    </>
  );
};

export default Applications;

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Application } from 'models/application.model';
import { Form } from 'react-final-form';
import {
  createApplication,
  getApplication,
  selectApplications,
  setActiveApplication,
  updateApplication
} from 'reducers/application/applicationSlice';
import FetchButton from 'components/fetch-button';
import FormField from 'components/form-field';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loading from 'components/loading';

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const { activeApplication, status } = useAppSelector(selectApplications);
  const dispatch = useAppDispatch();
  const [showSecret, setShowSecret] = useState(false);
  const mode = applicationId ? 'update' : 'create';

  const handleFormSubmit = async (formData: Application) => {
    try {
      if (mode === 'create') {
        await dispatch(createApplication(formData)).unwrap();
      } else {
        await dispatch(updateApplication(formData)).unwrap();
        dispatch(setActiveApplication(null));
      }
      navigate('/');
    } catch (error: any) {
      toast.error(error.details);
    }
  };

  useEffect(() => {
    if (mode === 'create') {
      dispatch(setActiveApplication(null));
    }
  }, [mode, dispatch]);

  useEffect(() => {
    if (applicationId && !activeApplication) {
      dispatch(getApplication(applicationId));
    }
  }, [applicationId, activeApplication, dispatch]);

  if (status === 'loading' && !activeApplication) {
    return <Loading text="Loading application details" />;
  }

  return (
    <div className="d-flex justify-content-center mt-2 mt-md-5">
      <div className="card shadow border-0">
        <div className="card-body p-5">
          <h1>{mode === 'create' ? 'Create' : 'Update'} Application</h1>
          <Form
            initialValues={activeApplication}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, submitting }) => (
              <form
                className="max-w-450 min-w-sm-330 min-w-unset"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="id"
                    label="ID"
                    placeholder="ID"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="name"
                    label="Name"
                    placeholder="Name"
                    type="text"
                  />
                </div>
                <div className="mb-3 position-relative">
                  <FormField
                    rules={['required']}
                    name="secret"
                    label="Secret"
                    placeholder="Secret"
                    type={showSecret ? 'text' : 'password'}
                  />
                  <button
                    className="btn password-toggler"
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    <i
                      className={`bi bi-eye-${
                        showSecret ? 'slash-fill' : 'fill'
                      }`}
                    ></i>
                  </button>
                </div>
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="lang"
                    label="Lang"
                    placeholder="Lang"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="version"
                    label="Version"
                    placeholder="Version"
                    type="text"
                  />
                </div>
                <FetchButton
                  type="submit"
                  loading={submitting}
                  className="w-100"
                >
                  {mode === 'create' ? 'Create' : 'Update'}
                </FetchButton>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

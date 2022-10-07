import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  Application,
  ApplicationCreatePayload
} from 'models/application.model';
import { Form } from 'react-final-form';
import {
  createApplication,
  selectApplications,
  setActiveApplication,
  updateApplication
} from 'reducers/application/applicationSlice';
import FetchButton from 'components/fetch-button';
import FormField from 'components/form-field';
import { useNavigate } from 'react-router-dom';

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { activeApplication } = useAppSelector(selectApplications);
  const dispatch = useAppDispatch();
  const mode = activeApplication ? 'update' : 'create';

  const handleFormSubmit = async (
    formData: Application | ApplicationCreatePayload
  ) => {
    try {
      if (mode === 'create') {
        await dispatch(createApplication(formData as ApplicationCreatePayload));
      } else {
        await dispatch(updateApplication(formData as Application));
        dispatch(setActiveApplication(null));
      }
      navigate('/');
    } catch (error) {
      // error
    }
  };

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
                    name="title"
                    label="Title"
                    placeholder="Title"
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

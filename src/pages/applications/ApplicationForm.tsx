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
  const navigate = useNavigate()
  const applications = useAppSelector(selectApplications);
  const dispatch = useAppDispatch();
  const mode = applications.activeApplication ? 'update' : 'create';

  const handleFormSubmit = async (
    formData: Application | ApplicationCreatePayload
  ) => {
    try {
      if (mode === 'create') {
        await dispatch(createApplication(formData as ApplicationCreatePayload));
      } else {
        await dispatch(updateApplication(formData as Application));
        dispatch(setActiveApplication(null))
      }
      navigate('/')
    } catch (error) {
      // error
    }
  };

  return (
    <div className="container">
      <h1>{mode === 'create' ? 'Create' : 'Update'} Application</h1>
      <Form
        initialValues={applications.activeApplication}
        onSubmit={handleFormSubmit}
        render={({ handleSubmit, submitting }) => (
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <FormField
                name="title"
                label="Title"
                placeholder="Title"
                type="text"
              />
            </div>
            <FetchButton type="submit" loading={submitting} className="w-100">
              {mode === 'create' ? 'Create' : 'Update'}
            </FetchButton>
          </form>
        )}
      />
    </div>
  );
};

export default ApplicationForm;

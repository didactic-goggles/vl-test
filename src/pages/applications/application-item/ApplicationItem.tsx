import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Application } from 'models/application.model';
import { setActiveApplication } from 'reducers/application/applicationSlice';
import { useAppDispatch } from 'app/hooks';
import './application-item.scss';

interface IProps {
  application: Application;
}

const ApplicationItem: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { application } = props;

  const handleUpdateButtonClick = () => {
    dispatch(setActiveApplication(application));
    navigate(`/application/update/${application.id}`)
  };

  return (
    <>
      <div className="application-item">
        <div className="application-item-body">{application.title}</div>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id={'dropdown-application-' + application.id}
            className="no-caret"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleUpdateButtonClick}>
              <i className="bi bi-pencil-square text-success me-2"></i>
              <span>Update</span>
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="bi bi-trash text-danger me-2"></i>
              <span>Delete</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link
          className="application-item-link"
          to={`/application/${application.id}`}
        ></Link>
      </div>
    </>
  );
};

export default ApplicationItem;

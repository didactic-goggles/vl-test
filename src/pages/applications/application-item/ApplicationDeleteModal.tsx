import { useAppDispatch, useAppSelector } from 'app/hooks';
import FetchButton from 'components/fetch-button';
import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  selectApplications,
  deleteApplication
} from 'reducers/application/applicationSlice';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

const ApplicationDeleteModal: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const { show, handleClose } = props;
  const { activeApplication, status } = useAppSelector(selectApplications);

  if (!activeApplication) return null;

  const handleDeleteButtonClick = () => {
    dispatch(deleteApplication(activeApplication.id));
  };

  return (
    <Modal
      size="sm"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Body className="p-4 text-center">
        <h5>
          Delete application <strong>{activeApplication.name}</strong>?
        </h5>
        <p className="mb-0">This action cannot be undone</p>
      </Modal.Body>
      <Modal.Footer className="flex-nowrap p-0">
        <FetchButton
          onClick={handleDeleteButtonClick}
          loading={status === 'deleting'}
          type="button"
          variant="link"
          className="btn btn-lg fs-6 text-decoration-none col-6 m-0 rounded-0 border-end"
        >
          <strong>Yes, delete</strong>
        </FetchButton>
        <button
          className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
          onClick={handleClose}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationDeleteModal;

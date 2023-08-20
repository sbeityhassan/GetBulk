import React from 'react';
import PropTypes from 'prop-types';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    onConfirm();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete the workout?</p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-yes" onClick={handleConfirmClick}>Yes</button>
          <button className="modal-btn modal-btn-no" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;

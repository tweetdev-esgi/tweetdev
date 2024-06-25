import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from '../api/user';
import { getSession } from '../services/sessionService';
import toast from 'react-hot-toast';

function ModalFollowers({followersCount,followersText}) {
  const [show, setShow] = useState(false);
  



  const handleClose = () => 
    {
      setShow(false);
    }

  const handleShow = () => {
    setShow(true);
  }

  return (
    <>
      <div className='followers flex gap-1' onClick={handleShow}> <div className='text-xs'>{followersCount}</div> <p className='text-accentColor font-semibold text-xs flex flex-row-reverse'> {followersText}</p></div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalFollowers;
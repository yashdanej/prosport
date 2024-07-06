import React, { useEffect, useState } from 'react';
import { Toast, ToastBody } from 'reactstrap';
import { Btn } from '../../../../../AbstractElements';
import './toast.css';

const BottomRightToast = ({ txt = 'Default Toast Message', isOpen }: { txt?: string; isOpen: boolean }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);

  return (
    <>
      <div className="toast-container position-fixed bottom-0 end-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open} className="custom-toast">
          <div className="d-flex justify-content-between alert-primary align-items-center">
            <ToastBody>{txt}</ToastBody>
            <Btn close className="btn-close-white me-2 m-auto" onClick={toggle}></Btn>
          </div>
        </Toast>
      </div>
    </>
  );
};

export default BottomRightToast;

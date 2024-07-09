import { useState, useEffect } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { TopLeftToasts } from '../../../../../utils/Constant';
import { Btn, Image } from '../../../../../AbstractElements';
import { dynamicImage } from '../../../../../Service';

const TopLeftToast = ({ txt = 'Default Toast Message', open, setOpenToast }: { txt?: string; open: boolean, setOpenToast: any }) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpenToast(false);
      }, 3000);
    }
  }, [open]);

  const toggle = () => {
    setOpenToast(!open);
  };

  return (
    <>
      <div className="toast-container position-fixed end-0 top-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open}>
          <ToastHeader className="toast-img">
            <Image className="rounded me-2" src={dynamicImage(`other-images/profile.png`)} alt="profile" />
            <strong className="me-auto">{txt.split(" ")[0]}</strong>
            <small className="d-sm-block d-none">Just now</small>
            <Btn close onClick={() => setOpenToast(false)}></Btn>
          </ToastHeader>
          <ToastBody className="toast-dark">
            <strong className="txt-success">Well done!</strong> {txt}.
          </ToastBody>
        </Toast>
      </div>
    </>
  );
}

export default TopLeftToast;

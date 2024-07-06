import { useState, useEffect } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { TopLeftToasts } from '../../../../../utils/Constant';
import { Btn, Image } from '../../../../../AbstractElements';
import { dynamicImage } from '../../../../../Service';

const TopLeftToast = ({ txt = 'Default Toast Message', isOpen }: { txt?: string; isOpen: boolean }) => {
  const [open, setOpen] = useState(isOpen);

  const toggle = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <div className="toast-container position-fixed start-0 top-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open}>
          <ToastHeader className="toast-img">
            <Image className="rounded me-2" src={dynamicImage(`other-images/profile.png`)} alt="profile" />
            <strong className="me-auto">{txt.split(" ")[0]}</strong>
            <small className="d-sm-block d-none">Just now</small>
            <Btn close onClick={() => setOpen(false)}></Btn>
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

import { useEffect, useState } from "react";

const Loader = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <>
      {show && (
        <div className="loader-wrapper">
          <img style={{width: '50rem'}} src="/assets/images/loader/pro-sports-gif.gif" alt="" />
          {/* <div className="loader loader-1">
            <div className="loader-outter" />
            <div className="loader-inner" />
            <div className="loader-inner-1" />
          </div> */}
        </div>
      )}
    </>
  );
};

export default Loader;

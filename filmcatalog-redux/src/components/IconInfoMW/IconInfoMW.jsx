import React, {useState, useEffect} from 'react';
//===== assets =====//
import './IconInfoMW.scss';

const IconInfoMW = ({icon, modalContent}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalStyle, setModalStyle] = useState({});

    useEffect(() => {
        if (showModal) {
          setModalStyle({
            opacity: 1,
            transition: "opacity 0.2s"
          });
        } else {
          setModalStyle((prev) => ({
            ...prev,
            opacity: 0,
            transition: "opacity 0.2s"
          }));
        }
      }, [showModal]);
  
    return (
    <div 
        className='IconInfoMW' 
    >
        <span 
            className='IconInfoMW__icon'
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
        >
            {icon}
        </span>
        {
          showModal && (
              <div
                className='IconInfoMW__modal-window'
                style={{
                  ...modalStyle
                }}
              >
                  {modalContent}
              </div>
          )
        }
    </div>
  )
}

export default IconInfoMW;
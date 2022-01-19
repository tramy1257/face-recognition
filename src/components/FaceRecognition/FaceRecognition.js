import React from 'react';
import 'tachyons';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {

  return (
    <div className="center">
      <div className='absolute mt2'>
        <img id='inputImg' alt='' src={imageUrl} width='500px' />
        {boxes.map((box, index) => {
          const boxStyle = {
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol
          }
          return <div key={index} className='BoundingBox' style={boxStyle} ></div>
        })}
      </div>
    </div>
  )
}

export default FaceRecognition;

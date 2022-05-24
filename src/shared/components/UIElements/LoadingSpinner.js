import React from 'react';

import './LoadingSpinner.css';

// const LoadingSpinner = props => {
//   return (
//     <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
//       <div className="lds-dual-ring"></div>
//     </div>
//   );
// };

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loader'}`}>
      Loading
    </div>
  );
};

export default LoadingSpinner;

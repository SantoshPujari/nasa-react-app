import React from 'react';

const SideBar = ({ data, handleToggleModal }) => {
  return (
    <div className='sidebar'>
      <div className='bgOverlay'></div>
      <div className='sidebarContents'>
        <h2>{data?.title}</h2>
        <div className='descriptionContainer'>
          <p className='descriptionTitle'>{data?.explanation}</p>
        </div>
        <button onClick={handleToggleModal}>
          <i className='fa-solid fa-arrow-right'></i>
        </button>
      </div>
    </div>
  );
};

export default SideBar;

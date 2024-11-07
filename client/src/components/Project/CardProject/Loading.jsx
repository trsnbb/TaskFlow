import React from "react";

const Loading = () => {
  return (
    <div className="center_loader">
      <div className="container_loader">
        <p>Loading...</p>
        <div className="line-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingDetails() {
  return (
    <div className="loading-details" style={{ display: "flex" }}>
      <div className="loading-img" style={{ width: "40%" }}>
        <Skeleton height="500px" />
      </div>
      <div
        className="loading-info"
        style={{ paddingLeft: "20px", width: "60%" }}
      >
        <Skeleton height="78px" />
        <Skeleton height="36px" />
        <Skeleton height="78px" />
        <Skeleton height="80px" />
        <Skeleton height="100px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
      </div>
    </div>
  );
}

export default LoadingDetails;

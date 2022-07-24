import React from "react";
import img from "../assets/img/404-error.png";

export default function PageNotFound() {
  return (
    <>
      <img src={img} alt="404 page not found" className="pageNotFoundImgO" />
      <img src={img} alt="404 page not found" className="pageNotFoundImg" />
    </>
  );
}

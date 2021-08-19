// Page that shows the default empty page
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex justify-center align-center full-height">
      <div className="cta mt-neg-4">
        <h2>404</h2>
        <p>Ooops! Looks like you got lost.</p>
        <Link className="btn" to="/">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

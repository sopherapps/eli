// Page that shows the default empty page
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex justify-center align-center h-100">
      <div className="cta mt-neg-4">
        <h2 className="logo">Eli</h2>
        <p>Create Your First Visualization</p>
        <Link className="btn" to="/control-panel">
          Go to Control Panel
        </Link>
      </div>
    </div>
  );
}

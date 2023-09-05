import React from "react";

import { MDBSpinner } from "mdb-react-ui-kit";

function Spinner() {
  return (
    <div>
      <MDBSpinner grow style={{ marginTop: "20%" }} role="status mt-5">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
}

export default Spinner;

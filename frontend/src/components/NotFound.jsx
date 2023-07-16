import React from "react";
import { Image } from "react-bootstrap";

const NotFound = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: 'center', minHeight: '100vh'}}>
      <Image
        src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg"
        alt="404 Page Not Found"
        style={{maxWidth: '50%', maxHeight: '100%'}}
      />
    </div>
  );
};

export default NotFound;

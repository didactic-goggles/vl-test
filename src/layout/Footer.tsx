import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link
              to="/"
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              <i className="bi bi-bootstrap fs-5"></i>
            </Link>
            <span className="mb-3 mb-md-0 text-muted">Dijvar Bozyel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

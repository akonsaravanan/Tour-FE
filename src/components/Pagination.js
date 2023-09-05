import React from "react";
import { MDBPagination, MDBPaginationItem, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const Pagination = ({ setCurrentPage, currentPage, numOfPages, dispatch }) => {
  const renderPagination = () => {
    /* Here we validating overall pages count and current active page is equal or not
                if its equal then we check another condition as current active page is equal to one or not , if its equal then
                return null -> means we are having data for one page , in taht case our current page and no of pages is same so 
                no need to render pagination component simple */
    if (currentPage === numOfPages && currentPage === 1) return null;
    if (currentPage === 1 && currentPage < numOfPages) {
      return (
        <MDBPagination className=" ">
          <MDBPaginationItem disabled>
            <MDBBtn tabIndex={-1} aria-disabled="true" rounded className="btn btn-primary">
              <MDBIcon fas icon="angle-double-left" />
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn href="#">{currentPage}</MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded className="btn btn-primary" onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
              <MDBIcon fas icon="angle-double-right" />
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== 1 && currentPage < numOfPages) {
      return (
        <MDBPagination>
          <MDBPaginationItem>
            <MDBBtn rounded className="btn btn-primary" onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
              <MDBIcon fas icon="angle-double-left" />
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn href="#">{currentPage}</MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded className="btn btn-primary" onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
              <MDBIcon fas icon="angle-double-right" />
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== 1 && currentPage === numOfPages) {
      return (
        <MDBPagination>
          <MDBPaginationItem>
            <MDBBtn rounded className="btn btn-primary" onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
              <MDBIcon fas icon="angle-double-left" />
            </MDBBtn>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <MDBBtn href="#">{currentPage}</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return (
    <div>
      {renderPagination()}
      {/* <nav>
        <MDBPagination className="mb-0">
          <MDBPaginationItem disabled>
            <MDBBtn href="#" tabIndex={-1} aria-disabled="true">
              Previous
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem active aria-current="page">
            <MDBPaginationLink href="#">
              2 <span className="visually-hidden">(current)</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">3</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">Next</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      </nav> */}
    </div>
  );
};

export default Pagination;

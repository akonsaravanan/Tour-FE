import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTours, setCurrentPage } from "../redux/features/tourSlice";
import TourCard from "../components/TourCard";
import { MDBRow } from "mdb-react-ui-kit";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
const Home = () => {
  const { tours, loading, currentPage, numOfPages } = useSelector((state) => ({ ...state.tour }));

  const dispatch = useDispatch();
  // const likes = tours?.data?.data?.likes;

  useEffect(
    () => {
      dispatch(getAllTours(currentPage));
    },
    [currentPage]
    // [tours]
  );

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="tourcontainer">
      <h1 className="mt-5">Explore Tours ....</h1>
      {tours.data && tours.data?.length > 0 ? (
        <MDBRow className="row-cols-1 row-cols-md-3 g-4 my-5 mx-auto px-5">
          {tours.data.map((tour, index) => (
            <TourCard {...tour} key={index} />
          ))}
        </MDBRow>
      ) : (
        <>
          <h3>No TOURS Available</h3>
        </>
      )}
      {tours.data && tours.data?.length > 0 && !tours.data?.length < 5 ? (
        <div className="container mx-auto">
          <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numOfPages={numOfPages} dispatch={dispatch} />
        </div>
      ) : null}
    </div>
  );
};

export default Home;

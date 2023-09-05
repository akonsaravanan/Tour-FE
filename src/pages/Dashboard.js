import React, { useEffect } from "react";
import { MDBCard, MDBCardImage, MDBCardText, MDBCardBody, MDBIcon, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserTour, getUserTours } from "../redux/features/tourSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import noimg from "../components/noimg.png";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const navigate = useNavigate();
  const userId = user?.data._id;
  useEffect(() => {
    if (userId) {
      dispatch(getUserTours(userId));
    }
  }, [userId]);

  if (loading) {
    return <Spinner />;
  }

  /* const getImage = (str) => {
    const { base64 } = JSON.parse(str);
    return base64;
  }; */

  const handleDeleteTour = (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour???")) {
      dispatch(deleteUserTour({ tourId, toast, navigate }));
    }
  };

  let data;
  const handleImage = (imageFile) => {
    if (imageFile && imageFile.length > 0) {
      const { base64 } = JSON.parse(imageFile);
      return (data = base64);
    } else {
      return (data = noimg);
    }
  };

  handleImage();

  return (
    <div>
      <h1 className=" mb-5 mx-auto">My Dashboard</h1>

      {userTours.length > 0 ? (
        <>
          <div className="deck  p-0">
            {userTours &&
              userTours.map((tour, index) => (
                <MDBCard
                  key={index}
                  className="mx-auto mb-5 p-0"
                  style={{ maxWidth: "800px", maxheight: "150px", textAlign: "left", borderRadius: "20px" }}
                >
                  <MDBRow className="p-0">
                    <MDBCol md="4" className="p-0">
                      <MDBCardImage
                        src={handleImage(tour.imageFile)}
                        alt="..."
                        position="top"
                        style={{ width: "100%", height: "180px", objectFit: "cover" }}
                        className="img-responsive"
                      />
                      {/* <img src={getImage(tour.imageFile)} overlay="false" height="auto" alt="..." className="img-fluid" /> */}
                    </MDBCol>
                    <MDBCol md="6" className="p-0">
                      <MDBCardBody>
                        <MDBCardText>{tour.name}</MDBCardText>
                        <MDBCardText>{tour.title}</MDBCardText>
                        <p className="mycard-tags">{tour.tags.map((tag) => `#${tag}`)}</p>

                        {/* <MDBCardText>{tour.description}</MDBCardText> */}
                        <MDBCardText>{/* <small className="text-muted">Last updated 3 mins ago</small> */}</MDBCardText>
                      </MDBCardBody>
                    </MDBCol>
                    <MDBCol md="2" className="p-0">
                      <Link className="edit" to={`/addtour/${tour._id}`} style={{ color: "primary" }}>
                        <MDBIcon fas icon="edit" />
                      </Link>
                      <span className="delete" onClick={() => handleDeleteTour(tour._id)} style={{ color: "red", cursor: "pointer" }}>
                        <MDBIcon fas icon="trash" style={{ color: "red" }} />
                      </span>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              ))}
          </div>
        </>
      ) : (
        <>
          <h1>NO TOURS</h1>
        </>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { MDBRow, MDBCard, MDBIcon, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllRelatedToursByTag, getSingleTourData } from "../redux/features/tourSlice";
import Moment from "react-moment";
import "moment-timezone";
import Spinner from "../components/Spinner";
import noimg from "../components/noimg.png";
import RelatedTours from "../components/RelatedTours";

const TourDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singletour, loading, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { imageFile, title, description, tags, name } = singletour;
  const { id } = useParams();

  useEffect(() => {
    if (tags) {
      dispatch(getAllRelatedToursByTag(tags));
    }
  }, [tags]);

  useEffect(() => {
    dispatch(getSingleTourData(id));
  }, [id]);

  const back = () => {
    navigate("/");
    window.location.reload();
  };

  if (loading) {
    return <Spinner />;
  }
  let data;
  const handleImage = () => {
    if (imageFile && imageFile.length > 0) {
      const { base64 } = JSON.parse(imageFile);
      return (data = base64);
    } else {
      return (data = noimg);
    }
  };

  handleImage();
  return (
    <>
      <div className=" container mb-5">
        <h2 className="my-4">
          Tour Detail
          <span className="back" onClick={() => back()}>
            <i className="fas fa-times"></i>
          </span>
        </h2>
        <MDBCard className="mb-3 mx-auto">
          <MDBCardImage position="top" src={data} alt="..." style={{ width: "100%", height: "500px", textAlign: "left", objectFit: "cover" }} />
          <MDBCardBody>
            <div className="card-detail-page">
              <div className="text-muted" style={{ textAlign: "center" }}>
                {title}
              </div>
              <p style={{ textAlign: "left" }} className="card-creator">
                Created by: {name}
              </p>
              <p style={{ textAlign: "left", fontWeight: "500" }} className="tag-content">
                {tags && tags.map((tag) => `#${tag}`)}
              </p>
              <p style={{ textAlign: "left" }} className="createddate">
                <MDBIcon far icon="calendar-alt" /> <Moment fromNow>{singletour.createdAt}</Moment>
              </p>
              <div style={{ textAlign: "left" }}>{description}</div>
            </div>
          </MDBCardBody>
          <div className="relatedTours">
            {relatedTours.data && relatedTours.data?.length > 0 && (
              <>
                {relatedTours.data?.length > 1 && (
                  <>
                    <h2 className="relatedTours-heading">Related Tours</h2>
                    <MDBRow className="row-cols-1 row-cols-md-3 g-4 my-5 mx-auto px-5">
                      {relatedTours.data
                        .filter((data) => data._id !== id)
                        .splice(0, 3)
                        .map((data) => (
                          <RelatedTours relatedTours={data} />
                        ))}
                    </MDBRow>
                  </>
                )}
              </>
            )}
          </div>
        </MDBCard>
      </div>
    </>
  );
};

export default TourDetail;

import React, { useEffect } from "react";
import { MDBCard, MDBCardImage, MDBCardText, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllToursByTag } from "../redux/features/tourSlice";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import noimg from "../components/noimg.png";

const TagTours = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  console.log(tag);
  useEffect(() => {
    if (tag) {
      dispatch(getAllToursByTag(tag));
    }
  }, [tag]);
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));

  console.log(tagTours.data);

  if (loading) {
    return <Spinner />;
  }
  const getImage = (str) => {
    const { base64 } = JSON.parse(str);
    return base64;
  };

  const refresh = () => {
    window.location.reload();
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

  // handleImage();
  return (
    <div>
      <>
        <h1 className=" mb-5 mx-auto">Tagged Tours</h1>

        <div className="deck  p-0">
          {tagTours &&
            tagTours.data &&
            tagTours.data.map((tour, index) => (
              <MDBCard
                key={index}
                className="mx-auto p-0 mb-4 "
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
                  </MDBCol>
                  <MDBCol md="6" className="p-0">
                    <MDBCardBody>
                      <MDBCardText>{tour.name}</MDBCardText>
                      <MDBCardText>{tour.title}</MDBCardText>
                      <p className="mycard-tags">{tour.tags.map((tag) => `#${tag}`)}</p>
                    </MDBCardBody>
                  </MDBCol>
                  <MDBCol md="2" onClick={() => refresh()} className="p-0">
                    <Link className="edit" to={`/tour/${tour._id}`} style={{ color: "primary" }}>
                      Open
                    </Link>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            ))}
        </div>
      </>
    </div>
  );
};

export default TagTours;

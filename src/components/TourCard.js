import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBBtn, MDBTooltip } from "mdb-react-ui-kit";
import noimg from "../components/noimg.png";
import { useSelector, useDispatch } from "react-redux";
import { getUserLikes } from "../redux/features/tourSlice";

const TourCard = ({ imageFile, title, description, tags, _id, name, likes }, { index }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.data?._id;

  const dispatch = useDispatch();

  // useEffect(() => {}, [tours]);

  const trimString = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 100) + "...";
      return str;
    }
  };

  const refresh = () => {
    window.location.reload();
  };

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

  const Likescomponents = () => {
    if (likes.length > 0) {
      return likes.find((likedUserId) => likedUserId === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" /> &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip tag="a" title={`You and ${likes.length - 1} others likes this`}>
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            <>
              {likes.length} Like{likes.length > 1 ? "s" : ""}
            </>
          )}
        </>
      ) : (
        <>
          <MDBIcon color="none" far icon="thumbs-up" /> &nbsp;{likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" /> &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    // console.log(_id);
    dispatch(getUserLikes(_id)); //passing tour id
  };

  return (
    <>
      <MDBCol>
        <MDBCard key={_id} className="h-70 tourcard mb-5">
          <MDBCardImage
            src={data}
            alt="..."
            position="top"
            style={{ width: "100%", height: "150px", objectFit: "cover" }}
            className="img-responsive"
          />
          <MDBCardBody>
            <MDBCardTitle className="name-info">{name}</MDBCardTitle>
            <p style={{ textAlign: "left" }} className="tag-content">
              {tags.map((tag, index) => (
                <>
                  <Link kry={index} style={{ textDecoration: "none", fontWeight: "bold" }} to={`/tour/tag/${tag}`}>
                    #{tag}
                  </Link>
                </>
              ))}
            </p>
            <Card.Title className="text-muted" style={{ textAlign: "left" }}>
              Title:{title}
            </Card.Title>
            <MDBCardText style={{ textAlign: "left" }}>
              <MDBBtn tag="a" className="" color="none" style={{ textDecoration: "none" }} onClick={handleLike}>
                {/* <Likescomponents /> */}
              </MDBBtn>
              <span span onClick={() => refresh()}>
                <Link className="view-link" style={{}} to={`/tour/${_id}`}>
                  Open
                </Link>
              </span>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
};

export default TourCard;

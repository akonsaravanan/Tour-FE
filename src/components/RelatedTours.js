import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from "mdb-react-ui-kit";
import noimg from "../components/noimg.png";

const RelatedTours = ({ relatedTours }) => {
  const { imageFile, title, description, tags, _id, name } = relatedTours;
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
  return (
    <div>
      <>
        <MDBCol>
          <MDBCard className="h-70 tourcard">
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
                {tags.map((tag) => (
                  <>
                    <Link style={{ textDecoration: "none", fontWeight: "bold" }} to={`/tour/tag/${tag}`}>
                      #{tag}
                    </Link>
                  </>
                ))}
              </p>
              <Card.Title className="text-muted" style={{ textAlign: "left" }}>
                Title:{title}
              </Card.Title>
              <MDBCardText style={{ textAlign: "right" }}>
                <span onClick={() => refresh()}>
                  <Link className="view-link" style={{}} to={`/tour/${_id}`}>
                    Open
                  </Link>
                </span>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </>
    </div>
  );
};

export default RelatedTours;

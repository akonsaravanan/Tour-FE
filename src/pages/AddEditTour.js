import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ChipInput from "material-ui-chip-input";
import FileBase64 from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewTour, updateUserTour } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";

function AddEditTour() {
  const initialState = {
    title: "",
    description: "",
    tags: [],
  };
  const { error, loading, userTours } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const currentEditTour = userTours.find((tour) => tour._id === id);
      // console.log(currentEditTour);
      setTourData({ ...currentEditTour });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      console.log(user?.data?.name);
      const updatedTourData = { ...tourData, name: user?.data?.name };

      if (!id) {
        dispatch(createNewTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateUserTour({ id, updatedTourData, navigate, toast }));
      }

      handleClearForm();
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleAddtag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeletetag = (tag) => {
    setTourData({ ...tourData, tags: tourData.tags.filter((existingtag) => existingtag !== tag) });
  };

  const handleClearForm = () => {
    setTourData(initialState);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="mt-5">
      <Card className="mx-auto my-5 " style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>{id ? "Update Tour" : "Add Tour"}</Card.Title>
          <Form onSubmit={handleFormSubmit} style={{ textAlign: "left" }}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Tour title</Form.Label>
              <Form.Control type="text" placeholder="Enter tour title" name="title" value={title} onChange={handleInputs} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter tour description"
                name="description"
                value={description}
                onChange={handleInputs}
              />
            </Form.Group>
            <ChipInput
              style={{ width: "100%", marginBottom: "10px" }}
              name="tags"
              variant="outlined"
              placeholder="Enter tour tags"
              value={tags}
              onAdd={(tag) => handleAddtag(tag)}
              onDelete={(tag) => handleDeletetag(tag)}
            />
            <FileBase64 type="file" multiple={false} onDone={(base64) => setTourData({ ...tourData, imageFile: base64 })} />

            <Button type="submit" style={{ fontWeight: "500" }} className="mt-2" variant="btn btn-primary btn-block btn-sm">
              {id ? "Update" : "SUBMIT"}
            </Button>
            <Button style={{ fontWeight: "500" }} variant="btn btn-danger btn-block btn-sm" onClick={handleClearForm}>
              CLEAR
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddEditTour;

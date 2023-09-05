import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MDBCol, MDBRow, MDBValidation, MDBValidationItem, MDBInput, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const Register = () => {
  const initialStateInputs = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [inputs, setInputs] = useState(initialStateInputs);
  const { email, password, firstName, lastName, confirmPassword } = inputs;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    {
      error && toast.error(error);
    }
  }, [error]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }
    if (email && password && confirmPassword && firstName && lastName) {
      dispatch(register({ inputs, navigate, toast }));
    }
  };

  return (
    <div className="mx-auto login_container">
      <FaUserCircle className="fa-3x mb-1" />
      <h2 className="mb-5">Sign Up</h2>
      <MDBValidation onSubmit={submitRegister}>
        <MDBValidationItem>
          <MDBInput
            className="mb-4"
            type="text"
            name="firstName"
            id="firstName"
            label="First Name"
            value={firstName}
            onChange={handleInput}
            required
          />
        </MDBValidationItem>
        <MDBValidationItem>
          <MDBInput className="mb-4" type="text" name="lastName" id="lastName" label="Last Name" value={lastName} onChange={handleInput} required />
        </MDBValidationItem>
        <MDBValidationItem>
          <MDBInput
            className="mb-4"
            type="email"
            name="email"
            id="form1Example1"
            label="Email address"
            value={email}
            onChange={handleInput}
            required
          />
        </MDBValidationItem>
        <MDBValidationItem>
          <MDBInput
            className="mb-4"
            type="password"
            name="password"
            id="form1Example2"
            label="Password"
            value={password}
            onChange={handleInput}
            required
          />
        </MDBValidationItem>
        <MDBValidationItem>
          <MDBInput
            className="mb-4"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleInput}
            required
          />
        </MDBValidationItem>

        <MDBBtn size="sm" type="submit" block>
          {loading && <MDBSpinner size="sm" role="status" tag="span" className="me-2" />}
          Sign Up
        </MDBBtn>
        <MDBRow className="my-4">
          <MDBCol>
            <Link to="/login">Already have a account ? Sign in</Link>
          </MDBCol>
        </MDBRow>
      </MDBValidation>
    </div>
  );
};
export default Register;

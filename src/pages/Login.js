import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MDBCol, MDBRow, MDBValidation, MDBValidationItem, MDBInput, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
/* import { GoogleLogin } from "react-google-login";
import { Button } from "react-bootstrap"; */

const Login = () => {
  const initialStateInputs = {
    email: "",
    password: "",
  };
  const [inputs, setInputs] = useState(initialStateInputs);
  const { email, password } = inputs;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ inputs, navigate, toast }));
    }
  };

  /* const onLoginFailure = (error) => {
    toast.error(error);
  };
  const onLoginSuccess = (res) => {
    console.log(res.profileObj);
  }; */

  return (
    <div  className="mx-auto login_container">
      <FaUserCircle className="fa-3x mb-1" />
      <h2 className="mb-5">Sign In</h2>
      <MDBValidation onSubmit={submitLogin}>
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

        <MDBBtn size="sm" type="submit" block>
          {loading && <MDBSpinner size="sm" role="status" tag="span" className="me-2" />}
          Sign in
        </MDBBtn>
      </MDBValidation>
      {/*  <div className="google-btn">
        <GoogleLogin
          clientId="185852271723-36ds94hs9r3k91nftnenrvg3nnpek347.apps.googleusercontent.com"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          disabled={false}
          render={(renderProps) => {
            return (
              <Button className="btn-danger btn-sm mt-3 btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Google Sign In
              </Button>
            );
          }}
        />
      </div> */}
      <MDBRow className="my-4">
        <MDBCol>
          <Link to="/register">Dont have a account? Sign up</Link>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
export default Login;

import { Fragment, useRef, useState } from "react";
import styles from "./signup.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/reducers/Auth.Reducers";
import { toast } from "react-toastify";

function Signup() {
  const dispatch = useDispatch();
  const cusName = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      signup({
        name: cusName.current.value,
        email: emailref.current.value,
        password: passwordref.current.value,
      })
    );
    toast.success("Signup sucessfully");
    setRedirectToLogin(true);
  };
  if (redirectToLogin) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <Fragment>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.container}>
            <h1 className={styles.h1}>Sign Up</h1>
            <p className={styles.p}>
              Please fill in this form to create an account.
            </p>
            <hr className={styles.hr} />

            <label htmlFor="name" className={styles.label}>
              <b>Name</b>
            </label>
            <input
              ref={cusName}
              type="text"
              placeholder="Enter Name"
              name="name"
              required
              className={styles.input}
            />

            <label htmlFor="email" className={styles.label}>
              <b>Email</b>
            </label>
            <input
              ref={emailref}
              type="text"
              placeholder="Enter Email"
              name="email"
              required
              className={styles.input}
            />

            <label htmlFor="psw" className={styles.label}>
              <b>Password</b>
            </label>
            <input
              ref={passwordref}
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              className={styles.input}
            />

            <label className={styles.label}>
              <input
                type="checkbox"
                defaultChecked
                name="remember"
                style={{ marginBottom: "15px" }}
              />{" "}
              Remember me
            </label>

            <p className={styles.p}>
              By creating an account you agree to our{" "}
              <a href="#" className={styles.a}>
                Terms & Privacy
              </a>
              .
            </p>

            <div className={styles.clearfix}>
              <Link to="/login">
                <button
                  type="button"
                  className={`${styles.button} ${styles.cancelbtn}`}
                >
                  Click here for Login
                </button>
              </Link>
              <button
                type="submit"
                className={`${styles.button} ${styles.signupbtn}`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Signup;

import { Fragment, useRef } from "react";
import styles from "../Login/login.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/reducers/Auth.Reducers";

function Login() {
  const dispatch = useDispatch();
  const emailref = useRef();
  const passwordref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: emailref.current.value,
        password: passwordref.current.value,
      })
    );
  };

  return (
    <Fragment>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.container}>
            <h1 className={styles.h1}>Log in</h1>
            <p className={styles.p}>Please Login First to Order</p>
            <hr className={styles.hr} />

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

            <div className={styles.clearfix}>
              <Link to="/Signup">
                {" "}
                <button
                  type="button"
                  className={`${styles.button} ${styles.cancelbtn}`}
                >
                  Click here for Signup
                </button>{" "}
              </Link>
              <button
                type="submit"
                className={`${styles.button} ${styles.signupbtn}`}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;

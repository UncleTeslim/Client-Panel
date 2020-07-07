import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions'
import Alert from '../layouts/alert'


const Signup = (props) => {

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const { allowRegistration } = props.settings;

    if (!allowRegistration) {
      props.history.push('/')
    }
  });

  const onChange = (e) => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    setLoginDetails(() => ({ ...loginDetails, [targetName]: targetValue }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginDetails;
    const { firebase, notifyUser } = props;

    // firebase
    //   .login({
    //   email,
    //   password,
    // }).catch(err => alert('Invalid Login Details!'))


    // firebase
    //   .createUser({
    //     email,
    //     password
    //   })
    //   .catch(err => notifyUser('User Already Exists!', 'error'));



    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      if (errorCode === 'auth/email-already-in-use') {
        notifyUser('User Already Exists');
      } else {
        notifyUser(errorMessage, 'error');
      }
    });

  };

  const { message, messageType } = props.notify;

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            {message ? (
              <Alert message={message} messageType={messageType} />
            ) : null}
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fa fa-lock" />  Sign Up
             </span>
            </h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  required
                  value={loginDetails.email}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={loginDetails.password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input
                type="submit"
                value="Signup"
                className="btn btn-primary"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


Signup.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    notify: state.notify,
    settings: state.settings
  }), { notifyUser })
)(Signup);
// export default Login;


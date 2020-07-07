import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

function AddClient(props) {

  const { disableBalanceOnAdd } = props.settings;

  const [inputClient, setInputClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, balance } = inputClient;
    const newClient = {
      firstName,
      lastName,
      email,
      phone,
      balance
    };

    const { firestore } = props;

    if (newClient.balance === '') {
      newClient.balance = 0;
    }


    firestore.add({ collection: 'clients' }, newClient).then(() =>
      props.history.push('/'));
  };


  const onChange = (e) => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    setInputClient(() => ({ ...inputClient, [targetName]: targetValue }));
  }


  return (
    <div>
      <div className="row">
        <div className="col md-6">
          <Link to="/" className="btn btn-link">
           <i className="fa fa-arrow-left"/> Go Back To Dashboard
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Add New Client</div>
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                minLength="2"
                value={inputClient.firstName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                minLength="2"
                value={inputClient.lastName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={inputClient.email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="number"
                className="form-control"
                name="phone"
                minLength="10"
                value={inputClient.phone}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="balance">Balance</label>
              <input
                type="text"
                className="form-control"
                name="balance"
                value={inputClient.balance}
                onChange={(e) => onChange(e)}
                disabled = {disableBalanceOnAdd}
              />
            </div>
                <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
          </form>
        </div>
      </div>
    </div>
  )
}


AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);

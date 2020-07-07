import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/spinner'



class editClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    
    const updatedClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: this.balanceInput.current.value === ''? 0: this.balanceInput.current.value
    }
    firestore.update({ collection: 'clients', doc: client.id }, updatedClient)
      .then(() => this.props.history.push('/'));
  }
  

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col md-6">
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-left" /> Go Back To Dashboard
            </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    defaultValue={client.firstName}
                    required
                    ref={this.firstNameInput}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    defaultValue={client.lastName}
                    required
                    ref={this.lastNameInput}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    defaultValue={client.email}
                    required
                    ref={this.emailInput}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    defaultValue={client.phone}
                    required
                    ref={this.phoneInput}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    defaultValue={client.balance}
                    ref={this.balanceInput}
                    disabled = {disableBalanceOnEdit}
                  />
                </div>
                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }

  }
}

  

editClient.propTypes = {
  firestore: PropTypes.object.isRequired
}


export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings: settings
  }))
)(editClient);

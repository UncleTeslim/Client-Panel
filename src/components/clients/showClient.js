import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/spinner'
import classnames from 'classnames'


class showClient extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  }

  onDelete = () => {
    const { client, firestore } = this.props;

    firestore.delete({ collection: 'clients', doc: client.id })
      .then(() => this.props.history.push('/'));
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    }
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
  }

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;
    
    let balanceForm = '';

    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Edit Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input type="submit" value="Update" className="btn btn-outline-dark"/>
            </div>
          </div>
        </form>
      )
    } else {
      balanceForm = null;
    }


    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col md-6">
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-left" /> Go Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-primary">
                  Edit Client
                </Link>
                <button onClick={this.onDelete} className="btn-danger">
                  Delete Client
                </button>
              </div>
            </div>
          </div> 
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>Client ID: {' '} <span className="text-info">{client.id}</span> </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h4 className="pull-right">
                    Balance:
                    <span className={classnames({
                      'text-danger': client.balance > 0,
                      'text-success': client.balance === 0
                    })}>
                      #{parseFloat(client.balance).toFixed(2)}
                    </span> {'  '}
                    <small>
                      <a href="#!" onClick={() => this.setState({
                        showBalanceUpdate:
                          !this.state.showBalanceUpdate
                      })}>
                        <i className="fa fa-pencil"></i>
                      </a>
                    </small>
                  </h4>
                      {balanceForm}
                </div>
              </div>

              <hr/>
              <ul className="list-group">
                <li className="list-group-item">Contact Email: {client.email}</li>
                <li className="list-group-item">Contact Phone: {client.phone}</li>
                <li className="list-group-item"></li>
              </ul>

            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />
    }
    
  }
}

showClient.propTypes = {
  firestore: PropTypes.object.isRequired
}


export default compose(
  firestoreConnect(props => [
    {collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({firestore: { ordered }}, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(showClient);


import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/spinner'
import classnames from 'classnames'

class Clients extends Component {
  state = {
    totalBalance: null
  }

  static getDerivedStateFromProps(props) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return {totalBalance: total}
    }
    return null;
  }


  render() {
    const { clients } = this.props;
    const { totalBalance } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2><i className="fa fa-users" /> Clients</h2>
            </div>
            <div className="col-md-6">
            <h5 className="text-right text-secondary">
              Total Balance{' '}
                <span className="text-primary">
                  #{parseFloat(totalBalance).toFixed(2)}
              </span>
            </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName} {client.lastName}</td>
                  <td>{client.email}</td>
                  <td className={classnames({
                    'text-danger': client.balance > 0,
                    'text-success': client.balance === 0
                  })}
                  >
                    #{parseFloat(client.balance).toFixed(2)}
                  </td>
                  <td>
                    <Link to={`/client/${client.id}`} className="btn btn-secondary" btn-sm>
                      <i className="fa fa-arrow-right"></i> Details
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <Spinner/>
    }
  }
}


Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);

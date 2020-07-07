import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from '../../actions/settingsActions';


const Settings = (props) => {
  const { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration} = props.settings
  
  const disableBalanceOnAddChange = () => {
    props.setDisableBalanceOnAdd();
  }
  const disableBalanceOnEditChange = () => {
    props.setDisableBalanceOnEdit();
  }
  const allowRegistrationChange = () => {
    props.setAllowRegistration();
  }
  
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fa a-arrow-left" />
          Go Back To Dashboard
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Edit Settings
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label> Allow Registration</label> { '' }
              <input type="checkbox"
                name="allowRegistration"
                checked={!!allowRegistration}
                onChange= {allowRegistrationChange} />
            </div>

            <div className="form-group">
              <label> Disable Balance on Add </label> { '' }
              <input type="checkbox"
                name="disableBalanceOnAdd"
                checked={!!disableBalanceOnAdd}
                onChange={disableBalanceOnAddChange} />
            </div>

            <div className="form-group">
              <label> Disable Balance on Edit </label> {''}
              <input type="checkbox"
                name="disableBalanceOnEdit"
                checked={!!disableBalanceOnEdit}
                onChange={disableBalanceOnEditChange} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
}

export default connect((state, props) => ({
  auth: state.firebase.auth,
  settings: state.settings,
}),
{ setDisableBalanceOnEdit, setDisableBalanceOnAdd, setAllowRegistration }
)(Settings);

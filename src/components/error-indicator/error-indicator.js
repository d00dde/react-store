import React from 'react';
import './error-indicator.css';
import { connect } from 'react-redux';

const ErrorIndicator = (props) => {
  console.error(props.error);
  return(
      <div className='error-indicator'>
        {props.error.message}
      </div>
    );
}

const mapStateToProps = ({ error }) => {
  return {
    error,
  }
}

export default connect(mapStateToProps)(ErrorIndicator);





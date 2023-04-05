import React from 'react';

const Alert = (props) => {
    return (
        props.alert && <div class={`alert alert-${props.alert.type}`} role="alert">
        <strong>{`${props.alert.msg}`}</strong>
      </div>
    );
}

export default Alert;
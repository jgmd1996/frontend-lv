import React from 'react';

function FormFields(props) {
    return (
        <div>
            <input
              type={props.type}
              id={props.id}
              placeholder={props.placeHolder}
            />
        </div>
    );
}

export default FormFields;
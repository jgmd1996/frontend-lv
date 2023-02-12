import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './App.css';

function ButtonRedirect(props) {
    const navigate = useNavigate();

    const redirect = () => {
        navigate(`/${props.page}`);
    }

    return (
        <td style={{ border: "1px solid" }}><button onClick={() => redirect()}><h1>{props.nameButton}</h1></button> </td>
    );
}

export default ButtonRedirect;
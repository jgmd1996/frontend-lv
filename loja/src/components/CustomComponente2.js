import React from 'react';
//import './App.css';

function CustomComponente2(props) {
    return (
        <div aling="center" className="CustomComponente2">
            <header>
           
                <h1>
                    Pagina {props.nome}
                </h1>
            </header>
            <p>{props.texto}</p>
        </div>
    );
}

export default CustomComponente2;
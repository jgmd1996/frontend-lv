import React from 'react';
//import './App.css';

function Create(props) {
    return (
        <div aling="center" className="CustomComponente2">
            <header>
           
                <h1>
                    Cadastrar {props.name}.
                </h1>
            </header>
            <h3>Preencha todos o compos de {props.name}.</h3>
        </div>
    );
}

export default Create;
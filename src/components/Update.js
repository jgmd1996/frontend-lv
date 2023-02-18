import React from 'react';

function Update(props) {
    return (
        <div aling="center" className="CustomComponente2">
            <header>
           
                <h1>
                    Atualizar {props.name}.
                </h1>
            </header>
            <h3>Preencha todos o compos de {props.name}.</h3>
        </div>
    );
}

export default Update;

//componente que uso e todas as paginas de atualizar com titulo e um pequeno texto podendo adicinar mais coisas futuramente
import React from 'react';

function List(props) {
    return (
        <div aling="center" className="CustomComponente2">
            <header>
           
                <h1>
                    Lista de {props.nome}
                </h1>
            </header>
            <h3>Aqui vamos listar todos os {props.nome} com todas as suas informações</h3>
        </div>
    );
}

export default List;
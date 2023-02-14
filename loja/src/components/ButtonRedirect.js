import React from 'react';
import { useNavigate } from 'react-router-dom';

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

//Aqui e um compoente que vo usar em todas as paginas passando o endereço da url no navigate com props e o nome da pagina tambem link n da pra fazser pq ele adicina mais espaço na url sendo nessesaio criar mais rotas
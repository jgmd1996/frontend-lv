import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect';
import List from '../../components/List';
import "./style.css";

function ClientList() {

    const [itens, setItens] = useState([]);

    console.log(itens);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/Updateclient', { replace: false, state: { item: item } });//
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/client")
            const body = await response.json()
            setItens(body.clients)
        }
        fetchMyAPI()
    }, [refreshPage]);

    async function deletarCategoria(id) {
        let result = await fetch("http://localhost:3001/client/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            }
        });
        result = await result.json();
        console.warn(result);
        setRefreshPage(result);
    };

    return (
        <div>
            <List nome="Clientes"/>
            <table style={{ border: "1px solid" }}>
                <tbody>
                    <tr>
                        <td align='center'>Nome</td>
                        <td align='center'>E-mail</td>
                        <td align='center'>Numero</td>
                        <td align='center'>Endereço</td>
                        <td align='center'>Data de nascimento</td>  
                        <td align='center'>Sexo</td>
                        <td align='center'>CPF</td>
                        <td align='center'>Atualizar</td>
                        <td align='center'>Deletar</td>
                    </tr>
                    {itens.map(item => {

                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item.email}</td>
                            <td style={{ border: "1px solid" }}>{item.telephone}</td>
                            <td style={{ border: "1px solid" }}>{item.address}</td>
                            <td style={{ border: "1px solid" }}>{item.dateOfBirth}</td>
                            <td style={{ border: "1px solid" }}>{item.sex}</td>
                            <td style={{ border: "1px solid" }}>{item.cpf}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deletarCategoria(item._id)}>Deletar</button> </td>

                        </tr>
                    })}
                </tbody>
            </table>
            <ButtonRedirect page="" nameButton="Voltar para home"/>
            <ButtonRedirect page="CreateClient" nameButton="Cadastrar novo cliente"/>
        </div>


    );
}

export default ClientList;
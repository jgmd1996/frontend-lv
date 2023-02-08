import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RedirectPages from '../../components/RedirectPages';
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
            <table style={{ border: "1px solid" }}>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>email</td>
                        <td>telephone</td>
                        <td>address</td>
                        <td>sex</td>
                        <td>CPF</td>
                        <td>product</td>
                        <td>ID</td>
                    </tr>
                    {itens.map(item => {

                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item.email}</td>
                            <td style={{ border: "1px solid" }}>{item.telephone}</td>
                            <td style={{ border: "1px solid" }}>{item.address}</td>
                            <td style={{ border: "1px solid" }}>{item.sex}</td>
                            <td style={{ border: "1px solid" }}>{item.cpf}</td>
                            <td style={{ border: "1px solid" }}>{item.product.map(io => io.name)}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deletarCategoria(item._id)}>Deletar</button> </td>

                        </tr>
                    })}
                </tbody>
            </table>
            <RedirectPages linkPage="/" page="Voltar para Home"/>
        </div>


    );
}

export default ClientList;
import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect';
import List from '../../components/List';
import "./style.css";

function ClientList() {

    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {//funçao de redirecionar para a página de atualizar cliente passando o objeto de item
        navigate('/Updateclient', { replace: false, state: { item: item } });//
    }

    useEffect(() => {//buscando cliente e adicionando no state itens
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/client")
            const body = await response.json()
            setItens(body.clients)
        }
        fetchMyAPI()
    }, [refreshPage]);//aqui fica escutando caso a funçao deletar cliente seja chamada, no caso mudaria o valor.

    async function deleteClient(id) {// deletando cliente passando o id selecionando no itns do map
        let result = await fetch("http://localhost:3001/client/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            }
        });
        result = await result.json();
        setRefreshPage(result);// adicionando o resultado em refreshPage para carregar a página toda vez que for adicionado esse valo no refreshPage
    };

    return (
        <div>
            <List nome="Clientes"/>
            <table style={{ border: "1px solid" }}>{/* Criando tabela de cliente */}
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
                    {itens.map(item => {//fazendo o map do array itens para lista todos os campos

                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item.email}</td>
                            <td style={{ border: "1px solid" }}>{item.telephone}</td>
                            <td style={{ border: "1px solid" }}>{item.address}</td>
                            <td style={{ border: "1px solid" }}>{item.dateOfBirth}</td>
                            <td style={{ border: "1px solid" }}>{item.sex}</td>
                            <td style={{ border: "1px solid" }}>{item.cpf}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deleteClient(item._id)}>Deletar</button> </td>

                        </tr>
                    })}
                </tbody>
            </table>
            <ButtonRedirect page="" nameButton="Voltar para home"/>{/* compoente de redirecionar */}
            <ButtonRedirect page="CreateClient" nameButton="Cadastrar novo cliente"/>{/* compoente de redirecionar */}
        </div>


    );
}

export default ClientList;
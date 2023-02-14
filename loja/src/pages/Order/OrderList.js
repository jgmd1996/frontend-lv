import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect';
import List from '../../components/List';

function OrderList() {

    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {//funçao de redirecionar para a página de atualizar pedido passando o objeto de item
        navigate('/UpdateOrder', { replace: false, state: { item: item } });//
    }

    useEffect(() => {//buscando pedido e adicionando no state itens
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/order")
            const body = await response.json()
            setItens(body.orders)
        }
        fetchMyAPI()
    }, [refreshPage]);//aqui fica escutando caso a funçao deletar pedido seja chamada, no caso mudaria o valor.

    async function deletarCategoria(id) {
        let result = await fetch("http://localhost:3001/order/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            }
        });
        result = await result.json();
        console.warn(result);
        setRefreshPage(result);// adicionando o resultado em refreshPage para carregar a página toda vez que for adicionado esse valo no refreshPage
    
    };

    return (
        <div>
            <List nome="Pedidos" />
            <table style={{ border: "1px solid" }}>{/* Criando tabela de pedidos */}
                <tbody>
                    <tr>
                        <td align='center'>Clientes</td>
                        <td align='center'>Produtos</td>
                        <td align='center'>Descrição</td>
                        <td align='center'>Quantidade</td>
                        <td align='center'>Atualizar</td>
                        <td align='center'>Deletar</td>
                    </tr>
                    {itens.map(item => {//fazendo o map do array itens para lista todos os campos
                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.client.map(nomeCliente => nomeCliente.name)}</td>
                            <td style={{ border: "1px solid" }}>{item.products.map(io => io.suppliers.map(ae => ae.ProductName))}</td>
                            <td style={{ border: "1px solid" }}>{item.description}</td>
                            <td style={{ border: "1px solid" }}>{item.amount}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deletarCategoria(item._id)}>Deletar</button> </td>

                        </tr>
                    })}
                </tbody>
            </table>
            <ButtonRedirect page="" nameButton="Voltar para home"/>
            <ButtonRedirect page="CreateOrder" nameButton="Cadastrar novo pedido"/>  
        </div>


    );
}

export default OrderList;
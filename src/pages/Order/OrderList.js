import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect';
import List from '../../components/List';

function OrderList() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/UpdateOrder', { replace: false, state: { item: item } });
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/order")
            const body = await response.json()
            setItems(body.orders)
        }
        fetchMyAPI()
    }, [refreshPage]);

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
        setRefreshPage(result);
    };

    return (
        <div>
            <List nome="Pedidos" />
            <table style={{ border: "1px solid" }}>
                <tbody>
                    <tr>
                        <td align='center'>Cliente</td>
                        <td align='center'>E-mail</td>
                        <td align='center'>Telefone</td>
                        <td align='center'>Endereço</td>
                        <td align='center'>Data de nascimento</td>
                        <td align='center'>Sexo</td>
                        <td align='center'>CPF</td>
                        <td align='center'>Produtos</td>
                        <td align='center'>Quantidade de produtos pedidos</td>
                        <td align='center'>Descrição</td>
                        <td align='center'>Forma de pagamento</td>
                        <td align='center'>Forma de Entrega</td>
                        <td align='center'>Atualizar</td>
                        <td align='center'>Deletar</td>
                    </tr>
                    {items.map(item => {
                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.client.name}</td>
                            <td style={{ border: "1px solid" }}>{item.client.email}</td>
                            <td style={{ border: "1px solid" }}>{item.client.telephone}</td>
                            <td style={{ border: "1px solid" }}>{item.client.address}</td>
                            <td style={{ border: "1px solid" }}>{item.client.dateOfBirth}</td>
                            <td style={{ border: "1px solid" }}>{item.client.sex}</td>
                            <td style={{ border: "1px solid" }}>{item.client.cpf}</td>
                            <td style={{ border: "1px solid" }}>{item.products.map(io => io.name)}</td>
                            <td style={{ border: "1px solid" }}>{item.products.length}</td>
                            <td style={{ border: "1px solid" }}>{item.description}</td>
                            <td style={{ border: "1px solid" }}>{item.paymentMethod}</td>
                            <td style={{ border: "1px solid" }}>{item.delivery}</td>
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
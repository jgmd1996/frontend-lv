import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomComponente2 from '../../components/CustomComponente2';
import RedirectPages from '../../components/RedirectPages';


function OrderList() {

    const [itens, setItens] = useState([]);

    console.log(itens);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/UpdateOrder', { replace: false, state: { item: item } });//
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/order")
            const body = await response.json()
            setItens(body.orders)
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
            <CustomComponente2 nome="lista Ordem" texto="Aqui vamos listar todos os Ordem com todas as suas informaçoes"/>
            <table style={{ border: "1px solid" }}>
                <tbody>
                    <tr>
                        <td>client</td>
                        <td>products</td>
                        <td>description</td>
                        <td>amount</td>
                        <td>ID</td>
                    </tr>
                    {itens.map(item => {

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
            <RedirectPages linkPage="/" page="Voltar para Home"/>
        </div>


    );
}

export default OrderList;
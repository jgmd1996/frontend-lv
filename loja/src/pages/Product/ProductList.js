import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RedirectPages from '../../components/RedirectPages';

function ProductList() {
    
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/updateProduct', { replace: false, state: { item: item } });
    };

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/product");
            const body = await response.json();
            console.log("body",body)
            setItens(body.products);
        }
        fetchMyAPI()
    }, [refreshPage]);

    async function deleteProduct(id) {
        let result = await fetch("http://localhost:3001/product/" + id, {
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
                        <td>Nome</td>
                        <td>price</td>
                        <td>description</td>
                        <td>amount</td>
                        <td>Id</td>
                        <td>Atualizar</td>
                        <td>Deletar</td>
                    </tr>
        
                    {itens.map(item => {
                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item.price}</td>
                            <td style={{ border: "1px solid" }}>{item.description}</td>
                            <td style={{ border: "1px solid" }}>{item.amount}</td>
                            <td style={{ border: "1px solid" }}>{item._id}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deleteProduct(item._id)}>Deletar</button> </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
            <RedirectPages linkPage="/" page="Voltar para Home"/>
        </div>
    );
}

export default ProductList;
import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect';
import List from '../../components/List';

function ProductList() {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/updateProduct', { replace: false, state: { item: item } });
    };

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/product");
            const body = await response.json();
            setItems(body.product);
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
            <List nome="Produtos" />
            <table style={{ border: "1px solid" }}>
                <tbody>
                    <tr>
                        <td align='center'>Nome do produto</td>
                        <td align='center'>Preço</td>
                        <td align='center'>Descrição</td>
                        <td align='center'>Quantidade</td>
                        <td align='center'>Fornecedor</td>
                        <td align='center'>Atualizar</td>
                        <td align='center'>Deletar</td>
                    </tr>
                    {items.map(item => {
                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item.price}</td>
                            <td style={{ border: "1px solid" }}>{item.description}</td>
                            <td style={{ border: "1px solid" }}>{item.amount}</td>
                            <td style={{ border: "1px solid" }}>{item.suppliers.socialDenomination}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deleteProduct(item._id)}>Deletar</button> </td>
                        </tr>
                    })
                    }


                
                </tbody>
               

                
            </table>
            <ButtonRedirect page="" nameButton="Voltar para home" />
            <ButtonRedirect page="createProduct" nameButton="Cadastrar novo produto" />
        </div>

        
    );
}

export default ProductList;
import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect';
import List from '../../components/List';

function ProductList() {
    
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {//funçao de redirecionar para a página de atualizar produto passando o objeto de item
        navigate('/updateProduct', { replace: false, state: { item: item } });
    };

    useEffect(() => {//buscando produto e adicionando no state itens
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/product");
            const body = await response.json();
            setItens(body.products);
        }
        fetchMyAPI()
    }, [refreshPage]);//aqui fica escutando caso a funçao deletar produto seja chamada, no caso mudaria o valor.

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
        setRefreshPage(result);// adicionando o resultado em refreshPage para carregar a página toda vez que for adicionado esse valo no refreshPage
    };
    
    return (

        <div>
            <List nome="Produtos" />
            <table style={{ border: "1px solid" }}>{/* Criando tabela de produto */}
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
        
                    {itens.map(item => {//fazendo o map do array itens para lista todos os campos
                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.suppliers.map(io => io.ProductName)}</td>{/* fazendo o map para lista o nome do produto que estava dentro da array de fornecedor */}
                            <td style={{ border: "1px solid" }}>{item.price}</td>
                            <td style={{ border: "1px solid" }}>{item.description}</td>
                            <td style={{ border: "1px solid" }}>{item.amount}</td>
                            <td style={{ border: "1px solid" }}>{item.suppliers.map(io => io.socialDenomination)}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deleteProduct(item._id)}>Deletar</button> </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
           <ButtonRedirect page="" nameButton="Voltar para home"/> {/* compoente de redirecionar */}
            <ButtonRedirect page="createProduct" nameButton="Cadastrar novo produto"/> {/* compoente de redirecionar */}
        </div>
    );
}

export default ProductList;
import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect';
import "./style.css";

function SuppliersList() {

    const [itens, setItens] = useState([]);
    console.log(itens)
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/UpdateSuppliers', { replace: false, state: { item: item } });//
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/suppliers")
            const body = await response.json()
            setItens(body.supplierss)
        }
        fetchMyAPI()
    }, [refreshPage]);

    async function deleteSuppliers(id) {
        let result = await fetch("http://localhost:3001/suppliers/" + id, {
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
                        <td>Denominação social</td>
                        <td>Endereço</td>
                        <td>Bairro da empresa</td>
                        <td>uf</td>
                        <td>Cidade</td>
                        <td>Telefone</td>
                        <td>CEP</td>
                        <td>E-mail</td>
                        <td>CNPJ</td>
                        <td>Linha de negócios</td>
                        <td>Função</td>
                        <td>Name do produto</td>
                        <td>Preço</td>
                        <td>Atualizar</td>
                        <td>Deletar</td>
                        
                    </tr>
                    {itens.map(item => {

                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.socialDenomination}</td>
                            <td style={{ border: "1px solid" }}>{item.address}</td>
                            <td style={{ border: "1px solid" }}>{item.neighborhood}</td>
                            <td style={{ border: "1px solid" }}>{item.uf}</td>
                            <td style={{ border: "1px solid" }}>{item.city}</td>
                            <td style={{ border: "1px solid" }}>{item.telephone}</td>
                            <td style={{ border: "1px solid" }}>{item.zipCode}</td>
                            <td style={{ border: "1px solid" }}>{item.email}</td>
                            <td style={{ border: "1px solid" }}>{item.cnpj}</td>
                            <td style={{ border: "1px solid" }}>{item.lineOfBusinesscontact}</td>
                            <td style={{ border: "1px solid" }}>{item.functions}</td>
                            <td style={{ border: "1px solid" }}>{item.ProductName}</td>
                            <td style={{ border: "1px solid" }}>{item.price}</td>   
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deleteSuppliers(item._id)}>Deletar</button> </td>

                        </tr>
                    })}
                </tbody>
            </table>
            <ButtonRedirect page="" nameButton="Voltar para home"/>
            <ButtonRedirect page="CreateSuppliers" nameButton="Cadastrar novo Fornecedores"/>
        </div>


    );
}

export default SuppliersList;
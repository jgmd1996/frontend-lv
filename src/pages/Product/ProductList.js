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




  const [order, setOrder] = useState([])
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/order");
      const body = await response.json();
     // const productsSelect = body.orders.map(productsApi => ({ value: productsApi.products.map(io => io._id), label: productsApi.products.map(io => io.name) }));
      setOrder(body.orders);
    }
    fetchMyAPI();
  }, []);

  //console.log("order",order.map(io => io.value))
  //const hehe = order.map(io => io.value)



  //console.log("order",order.map(id => ({ _id: id.value })))
  //console.log("order",order.map(io => io.products.map(ae => ae._id)))
 // console.log("items",items.map(io => io._id))




 const var1 = order.map(io => io.products.map(ae => ae._id))
 const var2 = items.map(io => io._id)
 console.log("var1",var1)
 console.log("var2",var2)



// const [calculadora, setCalculadora]= useState(0)
//   if(var2 === var1){
//     setCalculadora(1)
//   }
//   console.log("calculadora",calculadora)


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
                        {/* <td align='center'>pedidos Realizados</td> */}
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
                            {/* <td style={{ border: "1px solid" }}>{order.label}</td> */}
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
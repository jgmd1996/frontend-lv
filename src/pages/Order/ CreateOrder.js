import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";
import ButtonRedirect from '../../components/ButtonRedirect';
import Create from '../../components/Create';

function CreateOrder() {

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  // selecionar e busca produto
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/product");
      const body = await response.json();
      const productsSelect = body.products.map(productsApi => ({ value: productsApi._id, label: productsApi.suppliers.map(ae => ae.ProductName) }));//tranformando id em value enome do fornecedor em label com map pra poder selecionar no formulario
      setProduct(productsSelect);
    }
    fetchMyAPI();
  }, []);
  
  useEffect(() => {
    formik.setFieldValue("product", selectedProduct)
  }, [selectedProduct]);
////////


 // selecionar e busca cliente
 const [client, setClient] = useState([]);
 const [selectedClient, setSelectedClient] = useState({});
 useEffect(() => {
   async function fetchMyAPI() {
     let response = await fetch("http://localhost:3001/client");
     const body = await response.json();
     const clientsSelect = body.clients.map(clientsApi => ({ value: clientsApi._id,  label: clientsApi.name }));//trasformando o id do cliente em value e nome em label pra poder selecionar no formulario
     setClient(clientsSelect);
   }
   fetchMyAPI();
 }, []);

 useEffect(() => {
   formik.setFieldValue("client", selectedClient)
 }, [selectedClient]);
////////



  const RegisterSchema = Yup.object().shape({// aqui e onde fica a validaçao do formulario.
      description: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Descrição obrigatório!'),
      amount: Yup.number()
      .min(1, 'Muito curto!')
      .max(1000, 'Muito grande!')
      .required('Quantidade obrigatório!'),
      product: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .required('Produto obrigatório!'),
      client: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .max(1, 'No maximo um produto!')
      .required('Cliente obrigatório!')
  })

  const formik = useFormik({//aqui fica o valor inicial do formulário
    initialValues: {
      description: '',
      amount: '',
      product: '',
      client:''
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        description: values.description,
        amount: values.amount+"",
        products: selectedProduct.map(id => ({ _id: id.value })),//mando somente o id de fornecedor ao subir o formulario
        client: selectedClient.map(id => ({ _id: id.value }))//mando somente o id de fornecedor ao subir o formulario
      }
      const settings = {//aqui é onde vai subir o formulário já validado para o back-end.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      try {
        const fetchResponse = await fetch('http://localhost:3001/order', settings);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/OrderList', { replace: true });//aqui é onde vai redirecionar para página de listar pedido, quando os dados subirem para o back end corretamente
        };
      } catch (e) {
        console.error(e);
      };
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (//aqui fica os campos do formulário
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Create name="Pedido"/>{/*componente de título e texto */}

        <div>
          {/*aqui seleciono os produtos que busquei do back end e trasformei em value e label */}
            <Select
              components={animatedComponents}
              placeholder="Selecione o produto"
              isMulti
              options={product}
              onChange={(item) => setSelectedProduct(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}
            />
            <div>{touched.product && errors.product}</div>
          </div>

          <div>
            {/*aqui seleciono os produtos que busquei do back end e trasformei em value e label */}
            <Select
              components={animatedComponents}
              placeholder="Selecione o cliente"
              isMulti
              options={client}
              onChange={(item) => setSelectedClient(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}
            />
            <div>{touched.client && errors.client}</div>
          </div>

          <div>
            <input
              type="text"
              id="description"
              placeholder="Digite a descrição do produto"
              {...getFieldProps('description')}
            />
            <div>{touched.description && errors.description}</div>
          </div>

          <div>
            <input
              type="number"
              id="amount"
              placeholder="Digite a quantidade de produtos disponiveis"
              {...getFieldProps('amount')}
            />
            <div>{touched.amount && errors.amount}</div>
          </div>

         

          <button type='submit'>Criar novo pedido</button>
          <ButtonRedirect page="OrderList" nameButton="Voltar"/>{/* componente de redirecionar para lista de pedidos */}
        </Form>
      </FormikProvider>
    </>
  );
}

export default  CreateOrder;

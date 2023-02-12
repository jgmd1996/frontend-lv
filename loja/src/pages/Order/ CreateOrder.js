import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import RedirectPages from '../../components/RedirectPages';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";

function CreateOrder() {

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  // selecionar e busca produto
  const [product, setProduct] = useState([]);
  console.log("product",product)
  const [selectedProduct, setSelectedProduct] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/product");
      const body = await response.json();
      const productsSelect = body.products.map(productsApi => ({ value: productsApi._id, label: productsApi.suppliers.map(ae => ae.ProductName) }));
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
 console.log("client",client)
 const [selectedClient, setSelectedClient] = useState({});
 useEffect(() => {
   async function fetchMyAPI() {
     let response = await fetch("http://localhost:3001/client");
     const body = await response.json();
     const clientsSelect = body.clients.map(clientsApi => ({ value: clientsApi._id,  label: clientsApi.name }));
     setClient(clientsSelect);
   }
   fetchMyAPI();
 }, []);

 useEffect(() => {
   formik.setFieldValue("client", selectedClient)
 }, [selectedClient]);
////////



  const RegisterSchema = Yup.object().shape({
      description: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Descrição obrigatório!'),
      amount: Yup.number()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
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

  const formik = useFormik({
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
        products: selectedProduct.map(id => ({ _id: id.value })),
        client: selectedClient.map(id => ({ _id: id.value }))
      }
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      try {
        const fetchResponse = await fetch('http://localhost:3001/order', settings);
        console.log("fetchResponse", fetchResponse);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/OrderList', { replace: true });
        };
      } catch (e) {
        console.error(e);
      };
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>

        <div>
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

         

          <button type='submit'>Criar novo produto</button>
          
          <RedirectPages linkPage="/" page="Voltar para Home"/>
        </Form>
      </FormikProvider>
    </>
  );
}

export default  CreateOrder;

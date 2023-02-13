import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Update from '../../components/Update';
import ButtonRedirect from '../../components/ButtonRedirect';

function UpdateOrder() {

  const navigate = useNavigate();
  const { state } = useLocation();
  //console.log("item",state.item.products.map(selectNameProduct => ({label:selectNameProduct.socialDenomination})));
  //console.log("itemioioioioioi",state)
  const animatedComponents = makeAnimated();

  //selecionar e buscar clientes
  const [clientss, setClientss] = useState([]);
  const stateGender = state.item.client.map(clientsh => ({ value: clientsh._id, label: clientsh.name }));
  const [selectedClients, setSelectedClients] = useState(stateGender);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/client");
      const body = await response.json();
      const clientssSelect = body.clients.map(clientsApi => ({ value: clientsApi._id, label: clientsApi.name }));
      setClientss(clientssSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("client", selectedClients)
  }, [selectedClients]);
///////////////////////////////////////////////////////////////////

//selecionar e buscar produtos
const [productss, setProductss] = useState([]);
const stateProduct = state.item.products.map(productsh => ({ value: productsh._id, label: productsh.suppliers.map(ae => ae.ProductName) }));
const [selectedProducts, setSelectedProducts] = useState(stateProduct);

useEffect(() => {
  async function fetchMyAPI() {
    let response = await fetch("http://localhost:3001/product");
    const body = await response.json();
    const productsSelect = body.products.map(productsApi => ({ value: productsApi._id, label: productsApi.suppliers.map(ae => ae.ProductName) }));
    setProductss(productsSelect);
  }
  fetchMyAPI();
}, []);

useEffect(() => {
  formik.setFieldValue("products", selectedProducts)
}, [selectedProducts]);
//



  const RegisterSchema = Yup.object().shape({
    description: Yup.string()
      .min(2, 'Descrição muito curto!')
      .max(200, 'Muito grande!')
      .required('Descrição obrigatório!'),
      amount: Yup.number()
      .min(1, 'Quantidade muito curto!')
      .max(1000, 'Valor maximo 1000!')
      .required('Quantidade obrigatório!'),
      products: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .required('Produto obrigatório!'),
      client: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .max(1, 'No maximo um produto!')
      .required('Cliente obrigatório!')
  });

  const formik = useFormik({
    initialValues: {
      id: state.item._id,
      description: state.item.description,
      amount: state.item.amount,
      client: state.item.client.map(clientsApi => ({ value: clientsApi._id, label: clientsApi.ProductName })),
      products: state.item.products
    },
    validationSchema: RegisterSchema,
    
    onSubmit: async (values) => {
      const body = {
        id: values.id,
        name: values.name,
        description: values.description,
        amount: values.amount + "",
        client: selectedClients.map(id => ({ _id: id.value })),
        products: selectedProducts.map(id => ({ _id: id.value }))
      }
      console.log("formik",formik)
      console.log("body",body)
      const settings = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
        
      };
      
      try {
        const fetchResponse = await fetch('http://localhost:3001/order/', settings);
        console.log("fetchResponse", fetchResponse);
        console.log("settings", settings)
        console.log("body",body)
        if (fetchResponse.status === 200) {
          formik.setFieldValue("name", null);
          navigate('/OrderList', { replace: true });
        }
      } catch (e) {
        console.error(e);
        console.log("body",body)
      }
      console.log("formik",formik)
    }
    
  });
 

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
      <Update name="Pedido" />
        <div>
            <Select
              defaultValue={stateProduct}
              components={animatedComponents}
              placeholder="Selecione os produtos"
              isMulti
              options={productss}
              onChange={(item) => setSelectedProducts(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}

            />
            <div>{touched.products && errors.products}</div>
          </div>

        <div>
            <Select
              defaultValue={stateGender}
              components={animatedComponents}
              placeholder="Selecione os clientes"
              isMulti
              options={clientss}
              onChange={(item) => setSelectedClients(item)}
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
              placeholder="Digite a quantidade"
              {...getFieldProps('amount')}
            />
            <div>{touched.amount && errors.amount}</div>
          </div>

          

          <button type='submit'>Atualizar Pedido</button>
          
          <ButtonRedirect page="OrderList" nameButton="Voltar"/>
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateOrder;

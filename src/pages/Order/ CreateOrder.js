import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";
import ButtonRedirect from '../../components/ButtonRedirect';
import Create from '../../components/Create';
import {
  MenuItem,
  TextField,
} from '@material-ui/core';

function CreateOrder() {

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/product");
      const body = await response.json();
      const productsSelect = body.product.map(productsApi => ({ value: productsApi._id, label: productsApi.name }));
      setProduct(productsSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("product", selectedProduct)
  }, [selectedProduct]);

  const [client, setClient] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/client");
      const body = await response.json();
      const clientsSelect = body.clients.map(clientsApi => ({ value: clientsApi._id, label: clientsApi.name }));
      setClient(clientsSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("client", selectedClient)
  }, [selectedClient]);

  const RegisterSchema = Yup.object().shape({
    description: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Descrição obrigatório!'),
    paymentMethod: Yup.string()
      .required('Forma de pagamento obrigatório!'),
    delivery: Yup.string()
      .required('Forma de entrega obrigatório!'),
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
      paymentMethod: '',
      delivery: '',
      product: '',
      client: ''
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        description: values.description,
        paymentMethod: values.paymentMethod,
        delivery: values.delivery,
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
          <Create name="Pedido" />

          <div>
            <label>Selecione os produtos:</label><br />
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

          <label>Forma de pagamento:</label><br />
          <TextField
            select
            label='selecione'
            fullWidth
            {...getFieldProps('paymentMethod')}
            error={Boolean(touched.paymentMethod && errors.paymentMethod)}
            helperText={touched.paymentMethod && errors.paymentMethod}
          >
            <MenuItem value='Boleto'>Boleto</MenuItem>
            <MenuItem value='Cartão'>Cartão</MenuItem>
            <MenuItem value='Pix'>pix</MenuItem>
          </TextField>
          
          <label>Forma de Entrega:</label><br />
          <TextField
            select
            label='selecione'
            fullWidth
            {...getFieldProps('delivery')}
            error={Boolean(touched.delivery && errors.delivery)}
            helperText={touched.delivery && errors.delivery}
          >
            <MenuItem value='Expresso'>Expresso</MenuItem>
            <MenuItem value='Padrão'>Padrão</MenuItem>
          </TextField>

          <div>
            <label>Selecione o cliente:</label><br />
            <Select
              components={animatedComponents}
              placeholder="Selecione o cliente"
              select
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
            <label>Descrição do produto:</label><br />
            <input
              type="text"
              id="description"
              placeholder="Digite a descrição do produto"
              {...getFieldProps('description')}
            />
            <div>{touched.description && errors.description}</div>
          </div>

          <button type='submit'>Criar novo pedido</button>
          <ButtonRedirect page="OrderList" nameButton="Voltar" />
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateOrder;

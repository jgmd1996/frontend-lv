import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Update from '../../components/Update';
import ButtonRedirect from '../../components/ButtonRedirect';
import {
  MenuItem,
  TextField,
} from '@material-ui/core';

function UpdateOrder() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const animatedComponents = makeAnimated();
  const [clientss, setClientss] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/client");
      const body = await response.json();
      const clientssSelect = body.clients.map(clientsApi => ({ value: clientsApi._id, label: clientsApi.name }));
      setClientss(clientssSelect);
    }
    fetchMyAPI();
  }, []);

  const [productss, setProductss] = useState([]);
  const stateProduct = state.item.products.map(productsh => ({ value: productsh._id, label: productsh.name }));
  const [selectedProducts, setSelectedProducts] = useState(stateProduct);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/product");
      const body = await response.json();
      const productsSelect = body.product.map(productsApi => ({ value: productsApi._id, label: productsApi.name }));
      setProductss(productsSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("products", selectedProducts)
  }, [selectedProducts]);

  console.log("status", state)

  const RegisterSchema = Yup.object().shape({
    description: Yup.string()
      .min(2, 'Descrição muito curto!')
      .max(200, 'Muito grande!')
      .required('Descrição obrigatório!'),
    paymentMethod: Yup.string()
      .required('Forma de pagamento obrigatório!'),
    delivery: Yup.string()
      .required('Forma de entrega obrigatório!'),
    products: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .required('Produto obrigatório!')
  });

  const formik = useFormik({
    initialValues: {
      id: state.item._id,
      description: state.item.description,
      paymentMethod: state.item.paymentMethod,
      delivery: state.item.delivery,
      client: state.item.client._id,
      products: state.item.products
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        id: values.id,
        name: values.name,
        description: values.description,
        paymentMethod: values.paymentMethod,
        delivery: values.delivery,
        client: values.client,
        products: selectedProducts.map(id => ({ _id: id.value }))
      }
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
        if (fetchResponse.status === 200) {
          formik.setFieldValue("name", null);
          navigate('/OrderList', { replace: true });
        }
      } catch (e) {
        console.error(e);
      }
    }

  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <Update name="Pedido" />
          <div>
            <label>Selecione os produtos:</label><br />
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
          <br /><br /><br />
          <label>Selecione o cliente:</label><br />
          <TextField
            select
            required="Escolha ao menos um cliente"
            label='Cliente'
            fullWidth
            {...getFieldProps('client')}
            error={Boolean(touched.client && errors.client)}
            helperText={touched.client && errors.client}
          >
            {Object.keys(clientss).map(statusKey => {
              const statusV = clientss[statusKey];
              return (
                <MenuItem key={statusV.value} value={'' + statusV.value}>{statusV.label}</MenuItem>
              )
            })
            }

          </TextField>
          <br /><br /><br />
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

          <button type='submit'>Atualizar Pedido</button>
          <ButtonRedirect page="OrderList" nameButton="Voltar" />
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateOrder;

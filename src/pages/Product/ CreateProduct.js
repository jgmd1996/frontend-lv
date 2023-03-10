import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react'
import * as Yup from "yup";
import ButtonRedirect from '../../components/ButtonRedirect';
import Create from '../../components/Create';
import {
  MenuItem,
  TextField,
} from '@material-ui/core';

function CreateProduct() {

  const navigate = useNavigate();
  const [suppliers, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState([{}]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/suppliers");
      const body = await response.json();
      const supplierssSelect = body.supplierss.map(suppliersApi => ({ value: suppliersApi._id, label: suppliersApi.socialDenomination }));
      setSupplier(supplierssSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("supplier", selectedSupplier)
  }, [selectedSupplier]);
  
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Nome obrigatório!'),
    price: Yup.number()
      .min(1, 'Muito curto!')
      .max(1000, 'Muito grande!')
      .required('Preço obrigatório!'),
    description: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Descrição obrigatório!'),
    amount: Yup.number()
      .min(1, 'Muito curto!')
      .max(1000, 'Muito grande!')
      .required('Quantidade obrigatório!'),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
      amount: '',
      supplier: ''
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        name: values.name,
        price: values.price + "",
        description: values.description,
        amount: values.amount + "",
        suppliers: values.supplier
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
        const fetchResponse = await fetch('http://localhost:3001/product', settings);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/productList', { replace: true });
        }else{
          alert("Selecione ao menos um Fornecedor!")
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
          <Create name="Produto" />
          <div>
      
            <label>Nome:</label><br />
            <input
              type="text"
              id="name"
              placeholder="Digite o nome"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <div>
            <label>Preço:</label><br />
            <input
              type="number"
              id="price"
              placeholder="Digite o preço do produto"
              {...getFieldProps('price')}
            />
            <div>{touched.price && errors.price}</div>
          </div>

          <div>
            <label>Descrição:</label><br />
            <input
              type="text"
              id="description"
              placeholder="Digite a descrição do produto"
              {...getFieldProps('description')}
            />
            <div>{touched.description && errors.description}</div>
          </div>

          <div>
            <label>Qauntidade:</label><br />
            <input
              type="number"
              id="amount"
              placeholder="Digite a quantidade de produtos disponiveis"
              {...getFieldProps('amount')}
            />
            <div>{touched.amount && errors.amount}</div>
          </div>

          <br />
          <label>Selecione o fornecedor:</label><br />
          <TextField
            select
            label='fornecedor'
            fullWidth
            {...getFieldProps('supplier')}
            error={Boolean(touched.supplier && errors.supplier)}
            helperText={touched.supplier && errors.supplier}
          >
            {Object.keys(suppliers).map(statusKey => {
              const statusV = suppliers[statusKey];
              return (
                <MenuItem key={statusV.value} value={'' + statusV.value}>{statusV.label}</MenuItem>
                
              )
            })
            }
          </TextField>

          <button type='submit'>Criar novo produto</button>
          <ButtonRedirect page="ProductList" nameButton="Voltar" />
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateProduct;

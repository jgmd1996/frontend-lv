import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";
import ButtonRedirect from '../../components/ButtonRedirect';

function  CreateProduct() {

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  // selecionar e busca a fornecedor
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/suppliers");
      const body = await response.json();
      const supplierssSelect = body.supplierss.map(suppliersApi => ({ value: suppliersApi._id, label: suppliersApi.ProductName }));
      console.log("++supplierssSelect",supplierssSelect)
      setSupplier(supplierssSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("supplier", selectedSupplier)
  }, [selectedSupplier]);

  const RegisterSchema = Yup.object().shape({
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
      supplier: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .max(1, 'No maximo um produto!')
      .required('Produto obrigatório!')
  })

  const formik = useFormik({
    initialValues: {
      price: '',
      description: '',
      amount: '',
      supplier: ''
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        price: values.price+"",
        description: values.description,
        amount: values.amount+"",
        suppliers: selectedSupplier.map(id => ({ _id: id.value }))
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
        console.log("fetchResponse", fetchResponse);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/productList', { replace: true });
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
              options={supplier}
              onChange={(item) => setSelectedSupplier(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}
            />
            <div>{touched.supplier && errors.supplier}</div>
          </div>

          <div>
            <input
              type="number"
              id="price"
              placeholder="Digite o preço do produto"
              {...getFieldProps('price')}
            />
            <div>{touched.price && errors.price}</div>
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
          
          <ButtonRedirect page="ProductList" nameButton="Voltar"/>
        </Form>
      </FormikProvider>
    </>
  );
}

export default  CreateProduct;

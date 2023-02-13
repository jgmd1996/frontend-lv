import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ButtonRedirect from '../../components/ButtonRedirect';
import Update from '../../components/Update';


function UpdateProduct() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const animatedComponents = makeAnimated();
  console.log("state", state)


  const [supplierss, setSupplierss] = useState([]);
  const stateGender = state.item.suppliers.map(suppliersh => ({ value: suppliersh._id, label: suppliersh.ProductName }));
  const [selectedSuppliers, setSelectedSuppliers] = useState(stateGender);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/suppliers");
      const body = await response.json();
      const supplierssSelect = body.supplierss.map(suppliersApi => ({ value: suppliersApi._id, label: suppliersApi.ProductName }));
      setSupplierss(supplierssSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("suppliers", selectedSuppliers)
  }, [selectedSuppliers]);


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
      suppliers: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .max(1, 'No maximo um produto!')
      .required('Produto obrigatório!')
  });

  const formik = useFormik({
    initialValues: {
      id: state.item._id,
      price: state.item.price,
      description: state.item.description,
      amount: state.item.amount,
      suppliers: state.item.suppliers.map(suppliersApi => ({ value: suppliersApi._id, label: suppliersApi.ProductName }))
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        id: values.id,
        name: values.name,
        price: values.price + "",
        description: values.description,
        amount: values.amount + "",
        suppliers: selectedSuppliers.map(id => ({ _id: id.value }))
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
        const fetchResponse = await fetch('http://localhost:3001/product/', settings);
        console.log("fetchResponse", fetchResponse);
        console.log("settings", settings)
        if (fetchResponse.status === 200) {
          formik.setFieldValue("name", null);
          navigate('/productList', { replace: true });
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
        <Update name="Produto" />
        <div>
            <Select
              defaultValue={stateGender}
              components={animatedComponents}
              placeholder="Selecione os produtos"
              isMulti
              options={supplierss}
              onChange={(item) => setSelectedSuppliers(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}

            />
            <div>{touched.suppliers && errors.suppliers}</div>
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
              placeholder="Digite a quantidade"
              {...getFieldProps('amount')}
            />
            <div>{touched.amount && errors.amount}</div>
          </div>

          

          <button type='submit'>Atualizar produto</button>
          
          <ButtonRedirect page="ProductList" nameButton="Voltar"/>
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateProduct;

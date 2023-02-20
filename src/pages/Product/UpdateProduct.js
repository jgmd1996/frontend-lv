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


  const [supplierss, setSupplierss] = useState([]);
  const stateGender = state.item.suppliers.map(suppliersh => ({ value: suppliersh._id, label: suppliersh.socialDenomination }));
  const [selectedSuppliers, setSelectedSuppliers] = useState(stateGender);

  // selecionar e busca a fornecedor
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/suppliers");
      const body = await response.json();
      const supplierssSelect = body.supplierss.map(suppliersApi => ({ value: suppliersApi._id, label: suppliersApi.socialDenomination }));
      setSupplierss(supplierssSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("suppliers", selectedSuppliers)
  }, [selectedSuppliers]);


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
    suppliers: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .max(1, 'No maximo um fornecedor!')
      .required('fornecedor obrigatório!')
  });

  const formik = useFormik({
    initialValues: {
      id: state.item._id,
      name: state.item.name,
      price: state.item.price,
      description: state.item.description,
      amount: state.item.amount,
      suppliers: state.item.suppliers.map(suppliersApi => ({ value: suppliersApi._id, label: suppliersApi.socialDenomination }))
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
          <label>Preço:</label><br/>
            <input
              type="number"
              id="price"
              placeholder="Digite o preço do produto"
              {...getFieldProps('price')}
            />
            <div>{touched.price && errors.price}</div>
          </div>

          <div>
          <label>Descrição:</label><br/>
            <input
              type="text"
              id="description"
              placeholder="Digite a descrição do produto"
              {...getFieldProps('description')}
            />
            <div>{touched.description && errors.description}</div>
          </div>

          <div>
          <label>Qauntidade:</label><br/>
            <input
              type="number"
              id="amount"
              placeholder="Digite a quantidade de produtos disponiveis"
              {...getFieldProps('amount')}
            />
            <div>{touched.amount && errors.amount}</div>
          </div>

          <div>
            <Select
              defaultValue={stateGender}
              components={animatedComponents}
              placeholder="Selecione os produtos"
              Select
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



          <button type='submit'>Atualizar produto</button>

          <ButtonRedirect page="ProductList" nameButton="Voltar" />
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateProduct;

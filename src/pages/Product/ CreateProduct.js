import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";
import ButtonRedirect from '../../components/ButtonRedirect';
import Create from '../../components/Create';

function CreateProduct() {

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState([{}]);
  console.log("selectedSupplier",selectedSupplier)
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
    supplier: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .max(1, 'No maximo um Fornecedor!')
      .required('Fornecedor obrigatório!')
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
        suppliers: selectedSupplier.map(id => id.value)
      }
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      console.log("body",body)
      try {
        console.log("body",body)
        const fetchResponse = await fetch('http://localhost:3001/product', settings);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/productList', { replace: true });
        };
      } catch (e) {
        console.log("body",body)
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
            <label>Fornecedor:</label><br />
            
            <Select
              components={animatedComponents}
              placeholder="Selecione o fornecedor"
              options={supplier}
              isMulti
              Select
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



          <button type='submit'>Criar novo produto</button>

          <ButtonRedirect page="ProductList" nameButton="Voltar" />
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateProduct;

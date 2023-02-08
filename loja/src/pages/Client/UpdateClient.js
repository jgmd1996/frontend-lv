import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function UpdateClient() {

  const navigate = useNavigate();
  const {state} = useLocation();
  const animatedComponents = makeAnimated();

  const [products, setProducts] = useState([]);
  const stateGender = state.item.product.map(producth => ({value: producth._id, label: producth.name}));
  const [selectedProduct, setSelectedProduct] = useState(stateGender);
 
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/product");
      const body = await response.json();
      const productsSelect = body.products.map(productApi => ({ value: productApi._id, label: productApi.name }));
      setProducts(productsSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("product", selectedProduct)
   }, [selectedProduct]);
  
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('name obrigatório!'),

    email: Yup.string()
    .min(1, 'Muito curto!')
    .max(500, 'Muito grande!')
    .required('Email obrigatório !'),

    telephone: Yup.number()
    .min(10, 'Muito curto!')
    .max(99999999999, 'Muito grande!')
    .required('Contato obrigatório!'),

    address: Yup.string()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Endereço obrigatório!'),

    dateOfBirth: Yup.number()
    .min(2, 'Muito curto!')
    .max(2999, 'Muito grande!')
    .required('Data de nascimento obrigatório!'),

    sex: Yup.string()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Sexo obrigatório!'),

    cpf: Yup.number()
    .min(11, 'Muito curto!')
    .max(99999999999, 'Muito grande!')
    .required('CPF obrigadorio'),

    product: Yup.array()
    .nullable(true)
    .min(1, 'Muito curto!')
    .required('produto obrigatório!')
  });

const formik = useFormik({
  initialValues: {
    id: state.item._id,
    name: state.item.name,
    email: state.item.email,
    telephone: state.item.telephone,
    address: state.item.address,
    dateOfBirth: state.item.dateOfBirth,
    sex: state.item.sex,
    cpf: state.item.cpf,
    product: state.item.product.map(productApi => ({ value: productApi._id, label: productApi.name }))
  },
  validationSchema: RegisterSchema,

  onSubmit: async (values) => {
    const body = { 
        id: values.id,
        name: values.name,
        email: values.email,
        telephone: values.telephone+"",
        address: values.address,
        dateOfBirth: values.dateOfBirth+"",
        sex: values.sex,
        cpf: values.cpf+"",
        product: selectedProduct.map(id => ({_id:id.value}))

     }
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
      console.log("body",body)
      const fetchResponse = await fetch('http://localhost:3001/client/',settings);  
      console.log("fetchResponse",fetchResponse);
      console.log("body",body)
      if (fetchResponse.status === 200) {
        formik.setFieldValue("name", null);
        navigate('/ClientList', { replace: true });
        console.log("body",body)
      }
    } catch (e) {
      console.log("body",body)
      console.error(e);
    }
  }
});

const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>

        <h1>Atuallizar cliente</h1>
        <div>
            <input
              type="text"
              id="name"
              placeholder="Digite o name"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <div>
            <input
              type="text"
              id="email"
              placeholder="Digite o email"
              {...getFieldProps('email')}
            />
            <div>{touched.email && errors.email}</div>
          </div>

          <div>
            <input
              type="text"
              id="telephone"
              placeholder="Digite o telephone"
              {...getFieldProps('telephone')}
            />
            <div>{touched.telephone && errors.telephone}</div>
          </div>

          <div>
            <input
              type="text"
              id="address"
              placeholder="Digite o endereço"
              {...getFieldProps('address')}
            />
            <div>{touched.address && errors.address}</div>
          </div>

          <div>
            <input
              type="text"
              id="dateOfBirth"
              placeholder="Digite o data de nascimento"
              {...getFieldProps('dateOfBirth')}
            />
            <div>{touched.dateOfBirth && errors.dateOfBirth}</div>
          </div>

          <div>
            <input
              type="text"
              id="sex"
              placeholder="Digite a sexo"
              {...getFieldProps('sex')}
            />
            <div>{touched.sex && errors.sex}</div>
          </div>

          <div>
            <input
              type="text"
              id="cpf"
              placeholder="Digite o CPF"
              {...getFieldProps('cpf')}
            />
            <div>{touched.cpf && errors.cpf}</div>
          </div>
          
          <div>
          <Select
            defaultValue={stateGender}
            components={animatedComponents}
            placeholder="Selecione os produtos"
            isMulti
            options={products}
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

          <button type='submit'  >Atualizar evento</button>
          <Link to="/">Volta para pagina inicial</Link>  
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateClient;

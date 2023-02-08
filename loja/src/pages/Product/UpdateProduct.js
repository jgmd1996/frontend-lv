import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";

function UpdateProduct() {
  
  const navigate = useNavigate();
  const {state} = useLocation();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Nome do produto obrigatório!'),
    price: Yup.number()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Preço obrigatório!'),
    description: Yup.string()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Descrição obrigatório!'),
    amount: Yup.number()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Quantidade obrigatório!'),
  });

  const formik = useFormik({
  initialValues: {
    id: state.item._id,
    name: state.item.name,
    price: state.item.price,
    description: state.item.description,
    amount: state.item.amount
  },
  validationSchema: RegisterSchema,

  onSubmit: async (values) => {
    const body = { 
      id: values.id,
      name: values.name,
      price: values.price+"",
      description: values.description ,
      amount: values.amount+""
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
      console.log("fetchResponse",fetchResponse);
      console.log("settings",settings)
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

        <div>
            <input
              type="text"
              id="name"
              placeholder="Digite o nome do novo produto"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
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

          <button type='submit'>Atualizar novo produto</button>
          <Link to="/">Voltar para pagina inicial </Link>
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateProduct;

import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Update from '../../components/Update';
import ButtonRedirect from '../../components/ButtonRedirect';
import {
  MenuItem,
  TextField,
} from '@material-ui/core';

function UpdateClient() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Nome obrigatório!'),

    email: Yup.string()
      .min(1, 'Muito curto!')
      .email('O e-mail deve ser válido! ')
      .max(500, 'Muito grande!')
      .required('E-mail obrigatório !'),

    telephone: Yup.number()
      .min(10000000000, 'Muito curto!')
      .max(99999999999, 'Muito grande!')
      .required('Contato obrigatório!'),

    address: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Endereço obrigatório!'),

    dateOfBirth: Yup.number()
      .min(10000000, 'Muito curto!')
      .max(99999999, 'Muito grande!')
      .required('Data de nascimento obrigatório!'),

    sex: Yup.string()
      .required('Sexo obrigatório!'),

    cpf: Yup.number()
      .min(10000000000, 'Muito curto!')
      .max(99999999999, 'Muito grande!')
      .required('CPF obrigadorio')
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
      cpf: state.item.cpf
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        id: values.id,
        name: values.name,
        email: values.email,
        telephone: values.telephone + "",
        address: values.address,
        dateOfBirth: values.dateOfBirth + "",
        sex: values.sex,
        cpf: values.cpf + ""

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
        const fetchResponse = await fetch('http://localhost:3001/client/', settings);
        if (fetchResponse.status === 200) {
          formik.setFieldValue("name", null);
          navigate('/ClientList', { replace: true });
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
          <Update name="Cliente" />
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
            <label>E-mail:</label><br />
            <input
              type='email'
              id="email"
              placeholder="Digite o E-mail"
              {...getFieldProps('email')}
            />
            <div>{touched.email && errors.email}</div>
          </div>

          <div>
            <label>Telefone:</label><br />
            <input
              type="number"
              id="telephone"
              placeholder="Digite o telefone"
              {...getFieldProps('telephone')}
            />
            <div>{touched.telephone && errors.telephone}</div>
          </div>

          <div>
            <label>Endereço:</label><br />
            <input
              type="text"
              id="address"
              placeholder="Digite o endereço"
              {...getFieldProps('address')}
            />
            <div>{touched.address && errors.address}</div>
          </div>

          <div>
            <label>Data de nascimento:</label><br />
            <input
              type="number"
              id="dateOfBirth"
              placeholder="Digite o data de nascimento"
              {...getFieldProps('dateOfBirth')}
            />
            <div>{touched.dateOfBirth && errors.dateOfBirth}</div>
          </div>
          <label>Sexo:</label><br />
          <TextField
            select
            fullWidth
            {...getFieldProps('sex')}
            error={Boolean(touched.sex && errors.sex)}
            helperText={touched.sex && errors.sex}
          >
            <MenuItem value='Masculino'>Masculino</MenuItem>
            <MenuItem value='Feminino'>Feminino</MenuItem>
          </TextField>

          <div>
            <label>CPF:</label><br />
            <input
              type="number"
              id="cpf"
              placeholder="Digite o CPF"
              {...getFieldProps('cpf')}
            />
            <div>{touched.cpf && errors.cpf}</div>
          </div>

          <button type='submit'  >Atualizar cliente</button>
          <ButtonRedirect page="ClientList" nameButton="Voltar" />
        </Form>
      </FormikProvider>
    </>
  );
}
export default UpdateClient;

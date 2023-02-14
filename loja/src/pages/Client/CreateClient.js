import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import "./style.css";
import ButtonRedirect from '../../components/ButtonRedirect';
import Create from '../../components/Create';

function CreateClient() {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({// aqui e onde fica a validaçao do formulario.
            
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Nome obrigatório!'),

      email: Yup.string()
      .min(1, 'Muito curto!')
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
      .min(2, 'Muito curto!')
      .max(50, 'Muito grande!')
      .required('Sexo obrigatório!'),

      cpf: Yup.number()
      .min(10000000000, 'Muito curto!')
      .max(99999999999, 'Muito grande!')
      .required('CPF obrigadorio')
  });

  const formik = useFormik({//aqui fica o valor inicial do formulário
    initialValues: {
      name: '',
      email: '',
      telephone: '',
      address: '',
      dateOfBirth: '',
      sex: '',
      cpf: '',
    },
    
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        name: values.name,
        email: values.email,
        telephone: values.telephone,
        address: values.address,
        dateOfBirth: values.dateOfBirth+"",
        sex: values.sex,
        cpf: values.cpf
      };
      const settings = {//aqui é onde vai subir o formulário já validado para o back-end.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      try {

        const fetchResponse = await fetch('http://localhost:3001/client', settings);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/ClientList', { replace: true });//aqui é onde vai redirecionar para página de listar clientes, quando os dados subirem para o back end corretamente
        }
      } catch (e) {
        console.error(e);
      }
    }
  });

 
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (//aqui fica os campos do formulário
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
         <Create name="Cliente"/>{/*componente de título e texto */}

          <div>
            <input
              type="text"
              id="name"
              placeholder="Digite o nome"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <div>
            <input
              type="text"
              id="email"
              placeholder="Digite o E-mail"
              {...getFieldProps('email')}
            />
            <div>{touched.email && errors.email}</div>
          </div>

          <div>
            <input
              type="text"
              id="telephone"
              placeholder="Digite o telefone"
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
              type="number"
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

          <div>{touched.category && errors.category}</div>
          <button type='submit'  >Cadastrar novo cliente</button>
          <ButtonRedirect page="ClientList" nameButton="Voltar"/>{/* componente de redirecionar para lista de clientes */}
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateClient;
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import RedirectPages from '../../components/RedirectPages';
import "./style.css";

function CreateClient() {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
            
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Nome obrigatório!'),

      email: Yup.string()
      .min(1, 'Muito curto!')
      .max(500, 'Muito grande!')
      .required('E-mail obrigatório !'),

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
      .required('CPF obrigadorio')
  });

  const formik = useFormik({
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
        dateOfBirth: values.dateOfBirth,
        sex: values.sex,
        cpf: values.cpf
      };
      console.log("body",body)
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      try {
        console.log("body",body)
        const fetchResponse = await fetch('http://localhost:3001/client', settings);
        console.log("fetchResponse", fetchResponse);
        console.log("settings",settings)
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/ClientList', { replace: true });
        }
      } catch (e) {
        console.error(e);
      }
      console.log("body",body)
    }
  });

 
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <h1>Cadastrar novo cliente</h1>

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

          <div>{touched.category && errors.category}</div>
          <button type='submit'  >Cadastrar novo cliente</button>
          <RedirectPages linkPage="/" page="Voltar para Home"/>
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateClient;
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import "./style.css";
import ButtonRedirect from '../../components/ButtonRedirect';
import Create from '../../components/Create';

function CreateSuppliers() {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({// aqui e onde fica a validaçao do formulario.
    socialDenomination: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Denominação social obrigatório!'),

      address: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Endereço da empresa obrigatório!'),

      neighborhood: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Bairro da empresa obrigatório!'),

      city: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Cidade obrigatório!'),

      uf: Yup.string()
      .min(2, 'Muito curto!')
      .max(2, 'Muito grande!')
      .required('UF obrigatório!'),

      telephone: Yup.number()
      .min(10000000000, 'Muito curto!')
      .max(99999999999, 'Muito grande!')
      .required('Telefone da empresa obrigatório!'),

      zipCode: Yup.number()
      .min(10000000, 'Muito curto!')
      .max(99999999, 'Muito grande!')
      .required('CEP obrigatório!'),

      email: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('E-mail obrigatório!'),

      cnpj: Yup.number()
      .min(10000000000000, 'Muito curto!')
      .max(99999999999999, 'Muito grande!')
      .required('CNPJ obrigatório!'),

      lineOfBusinesscontact: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Linha de negócios obrigatório!'),

      functions: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Função obrigatório!'),

      ProductName: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Name do produto obrigatório!'),

      price: Yup.number()
      .min(1, 'Muito curto!')
      .max(1000, 'Muito grande!')
      .required('Preço do produto obrigatório!'),
  });

  const formik = useFormik({//aqui fica o valor inicial do formulário
    initialValues: {
      socialDenomination: '',
      address: '',
      neighborhood: '',
      city: '',
      uf: '',
      telephone: '',
      zipCode: '',
      email: '',
      cnpj: '',
      lineOfBusinesscontact: '',
      functions: '',
      ProductName: '',
      price: '',
      
    },

    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        socialDenomination: values.socialDenomination,
        address: values.address,
        neighborhood: values.neighborhood,
        city: values.city,
        uf: values.uf,
        telephone: values.telephone+"",
        zipCode: values.zipCode + "",
        email: values.email,
        cnpj: values.cnpj + "",
        lineOfBusinesscontact: values.lineOfBusinesscontact,
        functions: values.functions,
        ProductName: values.ProductName,
        price: values.price + "",
        
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
        const fetchResponse = await fetch('http://localhost:3001/suppliers', settings);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/SuppliersList', { replace: true });//aqui é onde vai redirecionar para página de listar fornecedor, quando os dados subirem para o back end corretamente
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
        <Create name="Fornecedor"/>{/*componente de título e texto */}

          <div>
            <input
              type="text"
              id="socialDenomination"
              placeholder="Digite a denominação social da empresa"
              {...getFieldProps('socialDenomination')}
            />
            <div>{touched.socialDenomination && errors.socialDenomination}</div>
          </div>

          <div>
            <input
              type="text"
              id="address"
              placeholder="Digite o endereço da empresa"
              {...getFieldProps('address')}
            />
            <div>{touched.address && errors.address}</div>
          </div>

          <div>
            <input
              type="text"
              id="neighborhood"
              placeholder="Digite o bairro da empresa"
              {...getFieldProps('neighborhood')}
            />
            <div>{touched.neighborhood && errors.neighborhood}</div>
          </div>

          <div>
            <input
              type="text"
              id="city"
              placeholder="Digite o cidade da empresa"
              {...getFieldProps('city')}
            />
            <div>{touched.city && errors.city}</div>
          </div>

          <div>
            <input
              type="text"
              id="uf"
              placeholder="Digite o uf da empresa"
              {...getFieldProps('uf')}
            />
            <div>{touched.uf && errors.uf}</div>
          </div>

          <div>
            <input
              type="number"
              id="telephone"
              placeholder="Digite o telefone da empresa"
              {...getFieldProps('telephone')}
            />
            <div>{touched.telephone && errors.telephone}</div>
          </div>

          <div>
            <input
              type="number"
              id="zipCode"
              placeholder="Digite o CEP da empresa"
              {...getFieldProps('zipCode')}
            />
            <div>{touched.zipCode && errors.zipCode}</div>
          </div>

          <div>
            <input
              type="text"
              id="email"
              placeholder="Digite o E-mail da empresa"
              {...getFieldProps('email')}
            />
            <div>{touched.email && errors.email}</div>
          </div>

          <div>
            <input
              type="number"
              id="cnpj"
              placeholder="Digite o CNPJ da empresa"
              {...getFieldProps('cnpj')}
            />
            <div>{touched.cnpj && errors.cnpj}</div>
          </div>

          <div>
            <input
              type="text"
              id="lineOfBusinesscontact"
              placeholder="Digite o Linha de negócios da empresa"
              {...getFieldProps('lineOfBusinesscontact')}
            />
            <div>{touched.lineOfBusinesscontact && errors.lineOfBusinesscontact}</div>
          </div>

          <div>
            <input
              type="text"
              id="functions"
              placeholder="Digite a função da empresa"
              {...getFieldProps('functions')}
            />
            <div>{touched.functions && errors.functions}</div>
          </div>

          <div>
            <input
              type="text"
              id="ProductName"
              placeholder="Digite o name do produto"
              {...getFieldProps('ProductName')}
            />
            <div>{touched.ProductName && errors.ProductName}</div>
          </div>

          <div>
            <input
              type="number"
              id="price"
              placeholder="Digite o preço da empresa"
              {...getFieldProps('price')}
            />
            <div>{touched.price && errors.price}</div>
          </div>

          

          <div>{touched.category && errors.category}</div>
          <button type='submit'>Criar Fornecedor</button>
          <ButtonRedirect page="SuppliersList" nameButton="Voltar"/> {/* componente de redirecionar para lista de fornecedor */}
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateSuppliers;
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";
import ButtonRedirect from '../../components/ButtonRedirect';
import Create from '../../components/Create';

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
      const supplierssSelect = body.supplierss.map(suppliersApi => ({ value: suppliersApi._id, label: suppliersApi.ProductName }));//trasformando o id do fornecedor em value e nome em label pra poder selecionar no formulario
      setSupplier(supplierssSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("supplier", selectedSupplier)
  }, [selectedSupplier]);

  const RegisterSchema = Yup.object().shape({// aqui e onde fica a validaçao do formulario.
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

  const formik = useFormik({//aqui fica o valor inicial do formulário
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
        suppliers: selectedSupplier.map(id => ({ _id: id.value }))//mando somente o id de fornecedor ao subir o formulario
      }
      const settings = {//aqui é onde vai subir o formulário já validado para o back-end.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      try {
        const fetchResponse = await fetch('http://localhost:3001/product', settings);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/productList', { replace: true });//aqui é onde vai redirecionar para página de listar produto, quando os dados subirem para o back end corretamente
        };
      } catch (e) {
        console.error(e);
      };
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (//aqui fica os campos do formulário
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Create name="Produto"/>{/*componente de título e texto */}

        <div>
          {/*aqui seleciono os produtos que busquei do back end e trasformei em value e label */}
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
          
          <ButtonRedirect page="ProductList" nameButton="Voltar"/>{/* componente de redirecionar para lista de produtos */}
        </Form>
      </FormikProvider>
    </>
  );
}

export default  CreateProduct;

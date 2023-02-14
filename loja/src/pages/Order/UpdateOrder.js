import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Update from '../../components/Update';
import ButtonRedirect from '../../components/ButtonRedirect';

function UpdateOrder() {

  const navigate = useNavigate();
  const { state } = useLocation();//aqui é o objeto que vem do listar quando é chamado a funçao de atualizar
  const animatedComponents = makeAnimated();

  //selecionar e buscar clientes
  const [clientss, setClientss] = useState([]);
  const stateGender = state.item.client.map(clientsh => ({ value: clientsh._id, label: clientsh.name }));//trasformando id em value e nome do produto em label dos cliente
  const [selectedClients, setSelectedClients] = useState(stateGender);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/client");
      const body = await response.json();
      const clientssSelect = body.clients.map(clientsApi => ({ value: clientsApi._id, label: clientsApi.name }));//trasformando o id do cliente em value e nome do cliente em label pra poder selecionar no formulario
      setClientss(clientssSelect);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    formik.setFieldValue("client", selectedClients)
  }, [selectedClients]);
///////////////////////////////////////////////////////////////////

//selecionar e buscar produtos
const [productss, setProductss] = useState([]);
const stateProduct = state.item.products.map(productsh => ({ value: productsh._id, label: productsh.suppliers.map(ae => ae.ProductName) }));//trasformando id em value e nome do produto em label dos produtos
const [selectedProducts, setSelectedProducts] = useState(stateProduct);

useEffect(() => {
  async function fetchMyAPI() {
    let response = await fetch("http://localhost:3001/product");
    const body = await response.json();
    const productsSelect = body.products.map(productsApi => ({ value: productsApi._id, label: productsApi.suppliers.map(ae => ae.ProductName) }));//trasformando o id do produto em value e nome do fornecedor em label pra poder selecionar no formulario
    setProductss(productsSelect);
  }
  fetchMyAPI();
}, []);

useEffect(() => {
  formik.setFieldValue("products", selectedProducts)
}, [selectedProducts]);
//



  const RegisterSchema = Yup.object().shape({// aqui é onde fica a validação do formulário.
    description: Yup.string()
      .min(2, 'Descrição muito curto!')
      .max(200, 'Muito grande!')
      .required('Descrição obrigatório!'),
      amount: Yup.number()
      .min(1, 'Quantidade muito curto!')
      .max(1000, 'Valor maximo 1000!')
      .required('Quantidade obrigatório!'),
      products: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .required('Produto obrigatório!'),
      client: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .max(1, 'No maximo um produto!')
      .required('Cliente obrigatório!')
  });

  const formik = useFormik({//aqui fica o valor inicial do formulário com o state que veio do listar
    initialValues: {
      id: state.item._id,
      description: state.item.description,
      amount: state.item.amount,
      client: state.item.client.map(clientsApi => ({ value: clientsApi._id, label: clientsApi.ProductName })),
      products: state.item.products
    },
    validationSchema: RegisterSchema,
    
    onSubmit: async (values) => {
      const body = {
        id: values.id,
        name: values.name,
        description: values.description,
        amount: values.amount + "",//aqui tenho que transformar de número para string
        client: selectedClients.map(id => ({ _id: id.value })),//mando somente o id de cliente ao subir o formulario
        products: selectedProducts.map(id => ({ _id: id.value }))//mando somente o id de produto ao subir o formulario
      }
      const settings = {//aqui é onde vai subir o formulário já validado para o back-end.
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
        
      };
      
      try {
        const fetchResponse = await fetch('http://localhost:3001/order/', settings);
        if (fetchResponse.status === 200) {
          formik.setFieldValue("name", null);
          navigate('/OrderList', { replace: true });//aqui é onde vai redirecionar para a página de listar pedido, quando os dados subirem para o back end corretamente
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
      <Update name="Pedido" />{/*componente de título e texto */}
        <div>
          {/*aqui seleciono os produtos que busquei do back ends do state e trasformei em value e label */}
            <Select
              defaultValue={stateProduct}//para deixa o valor inicial preenchido
              components={animatedComponents}
              placeholder="Selecione os produtos"
              isMulti
              options={productss}//opções para selecionar
              onChange={(item) => setSelectedProducts(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}

            />
            <div>{touched.products && errors.products}</div>
          </div>

        <div>
           {/*aqui seleciono os produtos que busquei do back ends do state e trasformei em value e label */}
            <Select
              defaultValue={stateGender}//para deixa o valor inicial preenchido
              components={animatedComponents}
              placeholder="Selecione os clientes"
              isMulti
              options={clientss}//opções para selecionar
              onChange={(item) => setSelectedClients(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}

            />
            <div>{touched.client && errors.client}</div>
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

          

          <button type='submit'>Atualizar Pedido</button>
          
          <ButtonRedirect page="OrderList" nameButton="Voltar"/>{/* componete de redirecionar para lista de pedidos */}
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateOrder;

import RedirectPages from '../components/RedirectPages';

function Home() {
  return (
    <div>
      <form>
        <table align='center' border="100">
          <tbody>

            <tr>
              <td><RedirectPages NamePage="produtos"/></td>
              <td><RedirectPages NamePage="Fornecedores"/></td>
              <td><RedirectPages NamePage="Cliente"/></td>
            </tr>

            <tr align="center">
             <td><RedirectPages linkPage="createProduct" page="Criar produtos"/></td>
             <td><RedirectPages linkPage="CreateSuppliers" page="Criar Fornecedor"/></td>
             <td><RedirectPages linkPage="CreateClient" page="Criar nova Cliente"/></td>
            </tr>

            <tr>
            <td><RedirectPages linkPage="ProductList" page="Listar produtos"/></td>
            <td><RedirectPages linkPage="SuppliersList" page="Listar Fornecedores"/></td>
            <td><RedirectPages linkPage="ClientList" page="Listar Clientes"/></td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Home;
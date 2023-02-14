import ButtonRedirect from '../components/ButtonRedirect';

function Home() {
  return (
    <div>
      <form>
        <table align='center' border="100">
          <tbody>

            <tr>
            <td><ButtonRedirect page="SuppliersList" nameButton="Fornecedores"/></td>
            <td><ButtonRedirect page="ProductList" nameButton="Produtos"/></td>
            <td><ButtonRedirect page="ClientList" nameButton="Clientes"/></td>
            <td><ButtonRedirect page="OrderList" nameButton="Pedidos"/></td>
            </tr>
            
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Home;

//Pagina inicial pare redirecionar para as paginas de lista fornecedor produtos clientes e pedidos.
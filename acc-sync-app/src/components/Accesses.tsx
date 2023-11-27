import BasicTable from "./BasicTable";
import Layout from "./Layout";

const Accesses = () => {
  return (
    <Layout user="admin">
      <h1 className="p-4">Uprawnienia</h1>
      <div className="p-4">
        <BasicTable />
      </div>
    </Layout>
  );
};

export default Accesses;

import BasicTable from "./BasicTable";
import Layout from "./Layout";

const Roles = () => {
  return <Layout user="admin"><h1 className="p-4">Role</h1>
  <div className="p-4">
    <BasicTable />
  </div>
  </Layout>;
};

export default Roles;

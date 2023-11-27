import BasicTable from "./BasicTable";
import Layout from "./Layout";

const Apps = () => {
  return <Layout user="admin"><h1 className="p-4">Aplikacje</h1>
  <div className="p-4">
    <BasicTable />
  </div>
  </Layout>;
};

export default Apps;

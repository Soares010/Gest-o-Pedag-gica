import { Sidebar } from "../../components/Sidebar";
import { Auth } from "../auth";
import { Dashboard } from "../dashboard";
import { Finances } from "../finances";
import { Manager } from "../manager";
import { AddUser } from "../user";

function App() {
  return (
    <div >
      <Sidebar />
      {/* <Auth /> */}
      <main >
        {/* Mude aqui para testar as telas */}
        {/* <Dashboard /> */}
        <Manager />
        {/* <Finances /> */}

        {/* <AddUser /> */}
      </main>
    </div>
  );
}

export default App;

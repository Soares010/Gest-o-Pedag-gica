import { Sidebar } from "../../components/Sidebar";
import { Auth } from "../auth";
import { Dashboard } from "../dashboard";
import { AddUser } from "../user";

function App() {
  return (
    <div className="app-layout">
      {/* <Sidebar /> */}
        <Auth />
      <main className="main-container">
        {/* Mude aqui para testar as telas */}
        {/* <Dashboard /> */}
        {/* <AddUser /> */}
      </main>
    </div>
  );
}

export default App;

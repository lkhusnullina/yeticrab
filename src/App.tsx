import React, { useState } from "react";
import { TablePlace } from "./components/TablePlace/TablePlace";
import Admin from "./components/Admin/Admin";

import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <div className="App">
      <div className="container">
        <Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Admin>
        <TablePlace isAdmin={isAdmin}/>
      </div>
    </div>
  );
}

export default App;
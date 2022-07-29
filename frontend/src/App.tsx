import React from "react";
import Form from "./components/Form";

function App() {
  const hello = "";
  console.log(hello);
  return (
    <div className="App">
      <header className="App-header">
        <Form inputs={[{name:"name", pl:"name"}]} style="hello"/>
      </header>
    </div>
  );
}

export default App;

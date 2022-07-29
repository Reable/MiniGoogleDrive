import React from "react";

interface FormProps{
  inputs: {name:string, pl: string}[]
  style: string
}

function Form(props: FormProps) {
  return (
    <div className="form">
      <form action="">
      </form>
    </div>
  );
}

export default Form;

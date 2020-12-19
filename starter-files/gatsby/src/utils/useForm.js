import React from "react";

export default function useForm(defaults) {
  const [values, setValues] = React.useState(defaults);
  function updateValue(e) {
    //   Check if its a number and convert
    let { value } = e.target.value;
    if (e.target.type === "number") {
      value = parseInt(e.target.value);
    }
    setValues({
      // Copy the existing values into it
      ...values,
      // Update the new value that changed
      [e.target.name]: e.target.value,
    });
  }
  return { values, updateValue };
}

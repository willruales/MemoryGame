import React from 'react';

function NumberSetter({ setNum }) {
  const handleChange = (event) => {
    const newValue = +
    setNum(newValue); // Use the setNum function passed as a prop
  };

  return (
    <div>
  
    </div>
  );
}

export default NumberSetter;
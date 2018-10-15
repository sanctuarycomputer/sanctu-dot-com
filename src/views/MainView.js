import React from 'react';

const MainView = ({ model }) => {
  if (model.isError) return <h1>Something went wrong...</h1>;
  
  return (
    <h1>{model.fields.name}</h1>
  )
}

export default MainView;
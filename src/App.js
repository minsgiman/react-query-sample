import React, { useCallback } from "react";
import { useCoffeeQuery } from "./hooks/services/queries/useCoffeeQuery";
import { useUpdateCoffeeMutate } from "./hooks/services/mutations/useCoffeeMutate";

function App() {
  const { isLoading, data, isError, error } = useCoffeeQuery({
    type: "hot",
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const {
    mutate: updateCoffee,
    // isLoading: isUpdateLoading,
    // isError: isUpdateError,
  } = useUpdateCoffeeMutate();

  const handleClickUpdate = useCallback(() => {
    updateCoffee({
      type: "hot",
      coffee: [{ title: "test", description: "123" }],
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="App">
      <button onClick={handleClickUpdate}>UPDATE</button>
      <div>
        {data &&
          data.data &&
          data.data.map(({ id, title, description, image }) => {
            return (
              <li key={id}>
                <h2>{title}</h2>
                <img src={image} width="100" />
                <p>{description}</p>
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default App;

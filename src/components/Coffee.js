import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  useCoffeeQuery,
  useUpdateCoffeeMutate,
} from "./../hooks/services/queries/useCoffeeQuery";

function Coffee() {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useCoffeeQuery({
    type: "hot",
    select: (data) => data.data,
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

  const handleMoveToWine = useCallback(() => {
    navigate("/wine");
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleClickUpdate}>UPDATE</button>
      </div>
      <div>
        <button onClick={handleMoveToWine}>Move To Wine</button>
      </div>
      <div>
        {data &&
          data.map(({ id, title, description, image }) => {
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

export default Coffee;

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  useWineQuery,
  useUpdateWineMutate,
} from "./../hooks/services/queries/useWineQuery";

function Wine() {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useWineQuery({
    select: (data) => data.data,
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const {
    mutate: updateWine,
    // isLoading: isUpdateLoading,
    // isError: isUpdateError,
  } = useUpdateWineMutate({
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const handleClickUpdate = useCallback(() => {
    updateWine([{ title: "test", description: "123" }]);
  }, []);

  const handleMoveToWine = useCallback(() => {
    navigate("/");
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
        <button onClick={handleMoveToWine}>Move To Coffee</button>
      </div>
      <div>
        {data &&
          data.map(({ id, wine, image }) => {
            return (
              <li key={id}>
                <h2>{wine}</h2>
                <img src={image} width="100" />
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default Wine;

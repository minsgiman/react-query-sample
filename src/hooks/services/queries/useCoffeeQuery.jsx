import { useQuery } from "react-query";
import { coffeeKeys } from './../keys/coffee';
import { fetchCoffee } from "./../../../apis/coffeeAPI";

export const useCoffeeQuery = ({ type, onSuccess, onError }) => {
  return useQuery({
    queryKey: coffeeKeys.list(type),
    queryFn: () => fetchCoffee(type),
    cacheTime: 600 * 1000,
    staleTime: 300 * 1000,
    onSuccess,
    onError,
  });
};

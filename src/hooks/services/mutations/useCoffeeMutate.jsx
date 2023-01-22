import { useMutation, useQueryClient } from 'react-query';
import { coffeeKeys } from './../keys/coffee';
import { addCoffee } from './../../../apis/coffeeAPI'

export const useUpdateCoffeeMutate = () => {
    const queryClient = useQueryClient();
  
    return useMutation(addCoffee, {
      onSuccess: (data, params) => {
        if (data.data.error) {
          return;
        }

        const key = coffeeKeys.list(params.type)
        /** Query Invalidation */
        //queryClient.invalidateQueries(key)
  
        /** Handling Mutation Response */
        queryClient.setQueryData(key, (oldQueryData) => {
          return {
            ...oldQueryData,
            data: data.data,
          };
        });
      },
      /**Optimistic Update Start */
      onMutate: async (params) => {
        const key = coffeeKeys.list(params.type)

        await queryClient.cancelQueries(key);
        const previousData = queryClient.getQueryData(key);
        queryClient.setQueryData(key, (oldQueryData) => {
          //API 응답전에 미리 업데이트
          return {
            ...oldQueryData,
            data: params.coffee,
          };
        });
        return { previousData }; //에러 발생시 onError에서 이전 data로 다시 복원하기 위함.
      },
      onError: (_err, params, context) => {
        queryClient.setQueryData(coffeeKeys.list(params.type), context.previousData);
      },
      /**Optimistic Update End */
    });
};
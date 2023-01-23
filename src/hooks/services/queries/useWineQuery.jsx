import { useQuery, useMutation, useQueryClient } from "react-query";
import { wineKeys } from './../keys/wine';
import { fetchWine, addWine } from "./../../../apis/wineAPI";

export const useWineQuery = ({ onSuccess, onError, select }) => {
  return useQuery({
    queryKey: wineKeys.reds,
    queryFn: () => fetchWine(),
    onSuccess,
    onError,
    select
  });
};

export const useUpdateWineMutate = ({onSuccess, onError}) => {
    const queryClient = useQueryClient();
  
    return useMutation(addWine, {
      onSuccess: (data) => {
        if (data.data.error) {
          return;
        }

        /** Query Invalidation */
        queryClient.invalidateQueries(wineKeys.reds)

        onSuccess();
      },
      onError,
      /**Optimistic Update End */
    });
};
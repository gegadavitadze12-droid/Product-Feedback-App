import { useQuery } from "react-query";

const fetchProductRequests = async () =>
  await fetch("/api/staticdata").then((res) => res.json());

export const useProductRequests = () => {
  return useQuery({
    queryKey: ["productRequest"],
    queryFn: fetchProductRequests,
  });
};

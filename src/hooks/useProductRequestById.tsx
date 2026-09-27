import { ProductRequest } from "@/types";
import { useProductRequests } from "./useProductRequests";

const fetchProductRequests = async () =>
  await fetch("/api/staticdata").then((res) => res.json());

export const useProductRequestsById = (id: string) => {
  const { data, error, isLoading } = useProductRequests();

  let productRequest = null;
  if (!isLoading && !error && id) {
    productRequest = data.productRequests.find(
      (item: any) => item.id.toString() === id
    );
  }

  return {
    data: productRequest,
    error,
    isLoading,
  };
};

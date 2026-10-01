import { useQuery } from "react-query";
import { ProductRequest } from "@/types";

const STORAGE_KEY = "product_feedback_requests";

export const getStoredProductRequests = (): ProductRequest[] | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to read product requests:", error);
    return null;
  }
};

export const saveProductRequests = (productRequests: ProductRequest[]) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(productRequests)
    );
  } catch (error) {
    console.error("Failed to save product requests:", error);
  }
};

const fetchProductRequests = async () => {
  const response = await fetch("/api/staticdata");

  if (!response.ok) {
    throw new Error("Failed to fetch product requests");
  }

  const data = await response.json();

  const storedRequests = getStoredProductRequests();

  if (storedRequests) {
    return {
      ...data,
      productRequests: storedRequests,
    };
  }

  return data;
};

export const useProductRequests = () => {
  return useQuery({
    queryKey: ["productRequest"],
    queryFn: fetchProductRequests,
  });
};
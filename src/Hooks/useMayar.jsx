import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useMayar() {
  function getProducts() {
    return axios.get("https://dummyjson.com/products")
  }
let responsOpject = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    gcTime: 1000 * 60 * 5, // 5 minutes   garbage collection time for the cached data
    // select: (data) => { data.data.products.filter((product) => product.rating > 4)},
    // select: (data) => data.data.products,
  });
  return responsOpject;
}
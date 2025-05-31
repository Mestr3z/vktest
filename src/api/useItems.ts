import { getJSON } from "./client";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Item } from "../types/types";

export const DEFAULT_PAGE_SIZE = 20;

export function useItems(pageSize = DEFAULT_PAGE_SIZE) {
  return useInfiniteQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: async ({ pageParam = 1 }) => {
      return getJSON<Item[]>("/items", { _page: pageParam, _limit: pageSize });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === pageSize ? allPages.length + 1 : undefined,
  });
}

import React, { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useItems } from "../api/useItems";

global.fetch = jest.fn();

function HookTester({ pageSize, onChange }) {
  const state = useItems(pageSize);
  useEffect(() => {
    if (!state.isLoading) onChange(state);
  }, [state, onChange]);
  return null;
}

test("useItems loads pages", async () => {
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }, { id: 2 }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

  let hookState;
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  render(
    <QueryClientProvider client={qc}>
      <HookTester pageSize={2} onChange={(s) => (hookState = s)} />
    </QueryClientProvider>
  );

  await waitFor(() => expect(hookState.isSuccess).toBe(true));
  expect(hookState.data.pages[0]).toHaveLength(2);

  hookState.fetchNextPage();
  await waitFor(() => expect(hookState.data.pages[1]).toBeDefined());
  expect(hookState.data.pages[1]).toHaveLength(0);

  expect(fetch).toHaveBeenNthCalledWith(
    1,
    "http://localhost:4000/items?_page=1&_limit=2"
  );
  expect(fetch).toHaveBeenNthCalledWith(
    2,
    "http://localhost:4000/items?_page=2&_limit=2"
  );
});

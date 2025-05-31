import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ItemForm } from "../components/ItemForm";

global.fetch = jest.fn();

describe("ItemForm", () => {
  const setup = () => {
    const qc = new QueryClient({
      defaultOptions: { mutations: { retry: false } },
    });
    return render(
      <QueryClientProvider client={qc}>
        <ItemForm />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    fetch.mockReset();
  });

  it("показывает ошибки при пустом сабмите и не вызывает fetch", async () => {
    setup();

    await userEvent.click(screen.getByRole("button", { name: /Добавить/i }));
    expect(await screen.findAllByText(/Минимум 3 символа/i)).toHaveLength(3);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("валидный ввод и POST через fetch", async () => {
    setup();

    await userEvent.type(screen.getByLabelText(/Название/i), "ABC");
    await userEvent.type(screen.getByLabelText(/Категория/i), "DEF");
    await userEvent.type(screen.getByLabelText(/Описание/i), "GHI");
    await userEvent.clear(screen.getByLabelText(/Количество/i));
    await userEvent.type(screen.getByLabelText(/Количество/i), "5");
    await userEvent.clear(screen.getByLabelText(/Цена/i));
    await userEvent.type(screen.getByLabelText(/Цена/i), "123");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    const btn = screen.getByRole("button", { name: /Добавить/i });
    expect(btn).not.toBeDisabled();

    fireEvent.click(btn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "ABC",
          description: "GHI",
          category: "DEF",
          quantity: 5,
          price: 123,
        }),
      });
    });
  });
});

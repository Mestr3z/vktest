import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, TextField, Button, CircularProgress } from "@mui/material";

import { postJSON } from "../api/client";
import { newItemSchema, type NewItemFormValues } from "../utils/validation";

interface ItemFormProps {
  onSuccess?: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewItemFormValues>({
    resolver: zodResolver(newItemSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      category: "",
      quantity: 1,
      price: 0,
    },
  });

  const mutation = useMutation<unknown, Error, NewItemFormValues>({
    mutationFn: (newItem) => postJSON("/items", newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      reset();
      onSuccess?.();
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      p={2}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
      }}
    >
      <Box sx={{ gridColumn: "1 / -1" }}>
        <TextField
          label="Название"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isSubmitting}
        />
      </Box>

      <Box>
        <TextField
          label="Категория"
          fullWidth
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          disabled={isSubmitting}
        />
      </Box>

      <Box sx={{ gridColumn: "1 / -1" }}>
        <TextField
          label="Описание"
          fullWidth
          multiline
          rows={3}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          disabled={isSubmitting}
        />
      </Box>

      <Box>
        <TextField
          label="Количество"
          type="number"
          fullWidth
          {...register("quantity", { valueAsNumber: true })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
          disabled={isSubmitting}
        />
      </Box>

      <Box>
        <TextField
          label="Цена"
          type="number"
          fullWidth
          {...register("price", { valueAsNumber: true })}
          error={!!errors.price}
          helperText={errors.price?.message}
          disabled={isSubmitting}
        />
      </Box>

      <Box
        sx={{
          gridColumn: { xs: "1 / -1", sm: "2 / 3" },
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
        >
          Добавить
        </Button>
      </Box>
    </Box>
  );
};

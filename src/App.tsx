import React, { useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { ItemForm } from "./components/ItemForm";
import { ItemTable } from "./components/ItemTable";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Менеджер записей
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Добавить запись
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Добавить запись</DialogTitle>
        <DialogContent>
          <ItemForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      <Divider sx={{ my: 4 }} />

      <ItemTable />
    </Container>
  );
}

export default App;

import React, { useMemo, useRef, UIEvent } from "react";
import { useItems } from "../api/useItems";
import { Item } from "../types/types";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

export const ItemTable: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useItems();

  const items = data?.pages.flat() ?? [];
  const containerRef = useRef<HTMLDivElement>(null);

  const columns = useMemo(() => {
    if (!items.length) return [] as string[];
    return Object.keys(items[0]).slice(0, 15);
  }, [items]);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      scrollTop + clientHeight > scrollHeight * 0.9
    ) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return <Box color="error.main">{error?.message}</Box>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ height: 600 }}
      onScroll={onScroll}
      ref={containerRef}
    >
      <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
        <colgroup>
          {columns.map((col) => (
            <col key={col} style={{ width: `${100 / columns.length}%` }} />
          ))}
        </colgroup>

        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => (
            <TableRow key={(item as any).id}>
              {columns.map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {String((item as any)[col] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {isFetchingNextPage && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

"use client";

import { useState, useMemo } from "react";
import { Table, Box, Text, HStack } from "@chakra-ui/react";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { Pagination } from "./Pagination";

interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T>({
  columns,
  data,
  pageSize = 8,
  onRowClick,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  // Sorting Logic
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const requestSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Box bg="white" rounded="2xl" border="1px solid" borderColor="gray.200" overflow="hidden">
      <Table.Root size="lg" variant="line">
        <Table.Header bg="gray.50">
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeader
                key={String(col.accessor)}
                fontSize="xs"
                fontWeight="black"
                cursor={col.sortable ? "pointer" : "default"}
                onClick={() => col.sortable && requestSort(col.accessor)}
              >
                <HStack gap={2}>
                  <Text textTransform="uppercase">{col.header}</Text>
                  {col.sortable && (
                    <Box color={sortConfig?.key === col.accessor ? "emerald.600" : "gray.300"}>
                      {sortConfig?.key === col.accessor ? (
                        sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                      ) : (
                        <ArrowUpDown size={12} />
                      )}
                    </Box>
                  )}
                </HStack>
              </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader /> {/* Empty header for the chevron column */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {paginatedData.map((item, index) => (
            <Table.Row
              key={index}
              bg="white"
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((col) => (
                <Table.Cell key={String(col.accessor)}>
                  {col.render ? (
                    col.render(item[col.accessor], item)
                  ) : (
                    <Text fontSize="sm" fontWeight="medium">
                      {String(item[col.accessor])}
                    </Text>
                  )}
                </Table.Cell>
              ))}
              <Table.Cell textAlign="end">
                <ChevronRight size={18} className="text-gray-300" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Pagination component logic attached to local state */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Box>
  );
}
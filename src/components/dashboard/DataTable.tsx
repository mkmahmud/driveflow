"use client"

import { useState, useMemo } from "react"
import {
    Table,
    Box,
    HStack,
    IconButton,
    Text,
    Badge,
    Flex,
} from "@chakra-ui/react"
import { 
    ChevronLeft, 
    ChevronRight, 
    ArrowUpDown, 
    ArrowUp, 
    ArrowDown,
    MoreHorizontal
} from "lucide-react"

interface Column<T> {
    header: string
    accessor: keyof T
    sortable?: boolean
    render?: (value: any, item: T) => React.ReactNode
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    pageSize?: number
}

export default function DataTable<T>({ 
    columns, 
    data, 
    pageSize = 8 
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null)

    const sortedData = useMemo(() => {
        let sortableItems = [...data]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
                return 0
            })
        }
        return sortableItems
    }, [data, sortConfig])

    const totalPages = Math.ceil(sortedData.length / pageSize)
    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const requestSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    return (
        <Box 
            w="full" 
            bg="black" 
            rounded="2xl" 
            border="1px solid" 
            borderColor="gray.200" 
             overflow="hidden"
        >
            <Box overflowX="auto">
                <Table.Root size="md" variant="line" interactive>
                    <Table.Header bg="gray.50/50">
                        <Table.Row borderBottom="1px solid" borderColor="gray.100">
                            {columns.map((col) => (
                                <Table.ColumnHeader 
                                    key={String(col.accessor)} 
                                    py="5"
                                    px="6"
                                    cursor={col.sortable ? "pointer" : "default"}
                                    onClick={() => col.sortable && requestSort(col.accessor)}
                                    _hover={col.sortable ? { bg: "gray.100/50" } : {}}
                                    transition="all 0.2s"
                                >
                                    <HStack gap="3">
                                        <Text 
                                            fontWeight="600" 
                                            fontSize="xs" 
                                            color="gray.500" 
                                            letterSpacing="wider"
                                            textTransform="uppercase"
                                        >
                                            {col.header}
                                        </Text>
                                        {col.sortable && (
                                            <Box color={sortConfig?.key === col.accessor ? "teal.600" : "gray.300"}>
                                                {sortConfig?.key === col.accessor 
                                                    ? (sortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)
                                                    : <ArrowUpDown size={14}/>}
                                            </Box>
                                        )}
                                    </HStack>
                                </Table.ColumnHeader>
                            ))}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {paginatedData.map((item, index) => (
                            <Table.Row 
                                key={index} 
                                bg={"white"} 
                                transition="background 0.2s"
                            >
                                {columns.map((col) => (
                                    <Table.Cell key={String(col.accessor)} py="4" px="6" borderBottom="1px solid" borderColor="gray.50" _hover={{color:"white"}}>
                                        <Box fontSize="sm" color="gray.700" fontWeight="500" >
                                            {col.render 
                                                ? col.render(item[col.accessor], item) 
                                                : String(item[col.accessor])}
                                        </Box>
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>

            {/* Pagination Footer */}
            <Flex 
                justify="space-between" 
                align="center"
                p="5" 
                bg="white" 
                borderTop="1px solid" 
                borderColor="gray.100"
            >
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Showing <Text as="span" color="gray.900" fontWeight="600">{(currentPage - 1) * pageSize + 1}</Text> to <Text as="span" color="gray.900" fontWeight="600">{Math.min(currentPage * pageSize, data.length)}</Text> of <Text as="span" color="gray.900" fontWeight="600">{data.length}</Text>
                </Text>

                <HStack gap="3">
                    <IconButton
                        aria-label="Previous Page"
                        size="sm"
                        variant="subtle"
                        rounded="lg"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        bg="gray.50"
                        _hover={{ bg: "gray.100" }}
                    >
                        <ChevronLeft size={18} />
                    </IconButton>

                    <Flex align="center" gap="1">
                        <Box px="3" py="1" bg="teal.50" color="teal.700" rounded="md" fontSize="xs" fontWeight="bold">
                            {currentPage}
                        </Box>
                        <Text fontSize="xs" color="gray.400" fontWeight="bold">of</Text>
                        <Box px="3" py="1" color="gray.600" fontSize="xs" fontWeight="bold">
                            {totalPages || 1}
                        </Box>
                    </Flex>

                    <IconButton
                        aria-label="Next Page"
                        size="sm"
                        variant="subtle"
                        rounded="lg"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        bg="gray.50"
                        _hover={{ bg: "gray.100" }}
                    >
                        <ChevronRight size={18} />
                    </IconButton>
                </HStack>
            </Flex>
        </Box>
    )
}
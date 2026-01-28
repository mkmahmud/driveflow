"use client";

import { useEffect, useRef, useState } from "react";
import {
    Box,
    Container,
    Heading,
    Stack,
    Table,
    Badge,
    Button,
    Flex,
    HStack,
    Text,
    Icon,
    SimpleGrid,
    Center,
    Dialog,
    Skeleton,
} from "@chakra-ui/react";

import {
    Eye,
    Download,
    FileText,
    Car as CarIcon,
} from "lucide-react";
import Image from "next/image";
import { trpc } from "@/trpc/client";
import { format } from "date-fns";





export default function PaymentDashboard() {
    const [open, setOpen] = useState(false);
    const [selectedTxn, setSelectedTxn] = useState("" as any);
    const invoiceRef = useRef<HTMLDivElement>(null);
    console.log(selectedTxn)

    // Get payments data
    const { data: myPayments, isLoading } = trpc.payment.getMyPayments.useQuery();



    const [libs, setLibs] = useState<{
        html2canvas: any;
        jsPDF: any;
    } | null>(null);

    /* Load PDF libs on client only */
    useEffect(() => {
        Promise.all([import("html2canvas"), import("jspdf")]).then(
            ([html2canvasLib, jspdfLib]) => {
                setLibs({
                    html2canvas: html2canvasLib.default,
                    jsPDF: jspdfLib.jsPDF,
                });
            }
        );
    }, []);

    const openInvoice = (txn: any) => {
        setSelectedTxn(txn);
        setOpen(true);
    };

    const downloadPDF = async () => {
        if (!invoiceRef.current || !selectedTxn || !libs) return;

        const canvas = await libs.html2canvas(invoiceRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new libs.jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice-${selectedTxn.id}.pdf`);
    };

    return (
        <Box bg="gray.50" minH="100vh" py={10}>
            <Container maxW="container.xl">
                <Stack gap={8}>
                    <Heading size="lg" fontWeight="900">
                        Payment History
                    </Heading>

                    {/* -------- TABLE -------- */}
                    <Box bg="#FFFFFF" rounded="2xl" border="1px solid" borderColor="#EDF2F7" overflow="hidden">
                        <Table.Root variant="line">
                            <Table.Header bg="#F7FAFC">
                                <Table.Row borderTop="1px solid" borderColor="#0D9488">
                                    <Table.ColumnHeader color="#ffffff" py={4}>ID</Table.ColumnHeader>
                                    <Table.ColumnHeader color="#ffffff">Amount</Table.ColumnHeader>
                                    <Table.ColumnHeader color="#ffffff">Status</Table.ColumnHeader>
                                    <Table.ColumnHeader color="#ffffff" textAlign="end">Action</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {myPayments?.map((txn) => (
                                    <Table.Row key={txn.id} bg="white" border={"none"}>
                                        <Table.Cell fontWeight="bold" color="#2D3748">{txn.id}</Table.Cell>

                                        <Table.Cell fontWeight="bold" color="#1A202C">
                                            ${txn.amount.toFixed(2)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge
                                                colorPalette={txn.status === "Completed" ? "green" : "orange"}
                                                rounded="full"
                                                variant="subtle"
                                            >
                                                {txn.status}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell textAlign="end">
                                            <Button
                                                size="sm"
                                                variant="surface"
                                                colorPalette="teal"
                                                onClick={() => openInvoice(txn)}
                                            >
                                                <Eye size={14} style={{ marginRight: '6px' }} /> Invoice
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                                {isLoading && Array.from({ length: 3 }).map((_, index) => (
                                    <Table.Row key={index} bg="white" border="none">
                                        <Table.Cell>
                                            <Skeleton height="16px" width="80px" borderRadius="md" />
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Skeleton height="16px" width="60px" borderRadius="md" />
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Skeleton height="20px" width="90px" borderRadius="full" />
                                        </Table.Cell>

                                        <Table.Cell textAlign="end">
                                            <Skeleton height="32px" width="90px" borderRadius="md" />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table.Root>
                    </Box>
                </Stack>
            </Container>

            {/* -------- INVOICE DIALOG -------- */}
            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="lg" >
                <Dialog.Content rounded="2xl">
                    <Dialog.Header bg={"white"}>
                        <Flex justify="space-between" w={"full"} align="center">
                            <HStack>
                                <Icon as={FileText} />
                                <Text fontWeight="bold">Payment Invoice</Text>
                            </HStack>

                            <Button
                                size="sm"
                                colorPalette="teal"
                                onClick={downloadPDF}
                            >
                                <Download size={14} /> Download PDF
                            </Button>
                        </Flex>
                    </Dialog.Header>

                    <Dialog.CloseTrigger />

                    <Dialog.Body bg={"white"}>
                        <Box ref={invoiceRef} p={8} bg="white">
                            <Flex justify="space-between" mb={6}>
                                <Box>

                                    <Flex>
                                        <Box>
                                            <Image src="/logo.png" alt="Drive Flow Logo" width={50} height={50} />
                                        </Box>
                                        <Box>
                                            <Text fontWeight="900" color="teal.600">
                                                Drive Flow.
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                Dhaka, Bangladesh
                                            </Text>
                                        </Box>
                                    </Flex>


                                </Box>
                                <Box textAlign="right">
                                    <Text fontWeight="bold">INVOICE</Text>
                                    <Text fontSize="xs">#{selectedTxn?.id}</Text>
                                </Box>
                            </Flex>

                            <SimpleGrid columns={2} gap={6} mb={6}>
                                <Box>
                                    <Text fontSize="xs" color="gray.400">
                                        BILL TO
                                    </Text>
                                    <Text fontWeight="bold">Valued Customer</Text>
                                </Box>
                                <Box textAlign="right">
                                    <Text fontSize="xs" color="gray.400">
                                        DATE
                                    </Text>
                                    <Text fontWeight="bold">{selectedTxn && format(new Date(selectedTxn?.updatedAt), "dd MMM yyyy, hh:mm a")}</Text>
                                </Box>
                            </SimpleGrid>

                            <Box bg="gray.50" p={5} rounded="xl">
                                <Flex justify="space-between" align="center">
                                    <HStack>
                                        <Center bg="white" p={2} rounded="lg">
                                            <CarIcon size={20} />
                                        </Center>
                                        <Text fontWeight="bold">{selectedTxn?.booking?.car?.name}</Text>
                                    </HStack>
                                    <Text fontWeight="bold">
                                        ${selectedTxn?.amount?.toFixed(2)}
                                    </Text>
                                </Flex>

                                <Box
                                    borderTop="1px dashed"
                                    borderColor="gray.200"
                                    my={4}
                                />

                                <Flex justify="space-between" fontWeight="900">
                                    <Text>Total Paid</Text>
                                    <Text color="teal.600">
                                        ${selectedTxn?.amount?.toFixed(2)}
                                    </Text>
                                </Flex>
                            </Box>
                        </Box>
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Root>
        </Box>
    );
}

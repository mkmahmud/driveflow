import {
    Box,
    Flex,
    Stack,
    Image,
    Badge,
    Text,
    Heading,
    HStack,
    SimpleGrid,
    Button,
    Separator,
} from "@chakra-ui/react";
import { Calendar, MapPin, ReceiptText, ChevronRight } from "lucide-react";

const formatDate = (date: any) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const statusColorMap = {
    CONFIRMED: "green",
    PENDING: "yellow",
    CANCELLED: "red",
};

const BookingCard = ({ booking }: { booking: any }) => {
    const statusColor = statusColorMap[booking.status as keyof typeof statusColorMap]  || "gray";

    return (
        <Box
            bg="white"
            rounded="3xl"
            p="5"
            border="1px solid"
            borderColor="gray.100" 
            transition="all 0.2s"
            _hover={{ shadow: "sm", borderColor: "teal.100" }}
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                gap="6"
                align={{ base: "stretch", md: "center" }}
            >
                {/* Car Image */}
                <Box
                    w={{ base: "full", md: "200px" }}
                    h="120px"
                    rounded="2xl"
                    overflow="hidden"
                >
                    <Image
                        src={booking.car.image}
                        alt={booking.car.name}
                        w="full"
                        h="full"
                        objectFit="cover"
                    
                    />
                </Box>

                {/* Details */}
                <Stack flex="1" gap="3">
                    <Flex justify="space-between" align="center">
                        <HStack gap="2">
                            <Badge
                                colorPalette={statusColor}
                                variant="subtle"
                                rounded="full"
                                px="3"
                            >
                                {booking.status}
                            </Badge>
                            <Text fontSize="xs" fontWeight="bold" color="gray.400">
                                ID: {booking.id.slice(-6)}
                            </Text>
                        </HStack>

                        <Text fontWeight="900" fontSize="xl" color="teal.600">
                            ${booking.totalPrice}
                        </Text>
                    </Flex>

                    <Heading size="md" fontWeight="bold">
                        {booking.car.name}
                    </Heading>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                        <HStack color="gray.500">
                            <Calendar size={14} />
                            <Text fontSize="xs" fontWeight="semibold">
                                {formatDate(booking.startDate)} –{" "}
                                {formatDate(booking.endDate)}
                            </Text>
                        </HStack>

                        <HStack color="gray.500">
                            <MapPin size={14} />
                            <Text fontSize="xs" fontWeight="semibold">
                                {booking.car.location}
                            </Text>
                        </HStack>
                    </SimpleGrid>
                </Stack>

                {/* Actions */}
                <Separator
                    orientation="vertical"
                    h="80px"
                    display={{ base: "none", md: "block" }}
                />

                <Stack direction={{ base: "row", md: "column" }} gap="2">
                    <Button
                        variant="ghost"
                        colorPalette="teal"
                        size="sm"
                        rounded="xl"
                        gap="2"
                    >
                        <ReceiptText size={16} />
                        Invoice
                    </Button>

                    <Button
                        colorPalette="teal"
                        size="sm"
                        rounded="xl"
                        px="6"
                        fontWeight="bold"
                    >
                        Manage <ChevronRight size={14} />
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
};

export default BookingCard;

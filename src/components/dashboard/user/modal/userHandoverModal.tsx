"use client"

import { toaster } from "@/components/ui/toaster";
import { trpc } from "@/trpc/client";
import {
    Box,
    Button,
    Circle,
    Dialog,
    Flex,
    Heading,
    Portal,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react"
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface UserHandoverModalProps {
    booking: any;
    open: boolean;
    onClose: () => void;
}

export default function UserHandoverModal({ booking, open, onClose }: UserHandoverModalProps) {

    // Trpc
    const getUploadUrl = trpc.car.getUploadUrlForAll.useMutation();
    const updatebookinPickUp = trpc.booking.updateBooking.useMutation();

    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        image: "" as string,
        images: [] as string[]
    });


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);

        // 1. Store the actual File objects for the S3 upload process
        setSelectedFiles(prev => [...prev, ...fileArray]);

        // 2. Store the local URLs for UI previewing
        const newImagePreviewUrls = fileArray.map(file => URL.createObjectURL(file));

        setFormData(prev => ({
            ...prev,
            image: prev.image || newImagePreviewUrls[0],
            images: [...prev.images, ...newImagePreviewUrls]
        }));
    };

    const removeImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
            image: index === 0 ? prev.images[1] || "" : prev.image
        }));
    };


    const handleSubmit = async () => {
        try {
            setIsUploading(true);
            const finalS3Urls: string[] = [];


            // 1. Upload each file to S3
            for (const file of selectedFiles) {
                const { signedUrl, publicUrl } = await getUploadUrl.mutateAsync({
                    fileName: file.name,
                    fileType: file.type,
                });

                await fetch(signedUrl, {
                    method: "PUT",
                    body: file,
                    headers: { "Content-Type": file.type },
                });

                finalS3Urls.push(publicUrl);
            }


            // ?Update Pickup Images in Booking 
            await updatebookinPickUp.mutateAsync({
                bookingId: booking.id,
                pickupPhotos: finalS3Urls,
            });

            console.log("Final S3 URLs:", finalS3Urls);

            toaster.success({ title: "Upload Successful", description: "Car pickup images uploaded successfully." });
            onClose();


        } catch (err) {
            console.error(err);
            toaster.error({ title: "Upload Failed", description: "Something went wrong during upload." });
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(details) => !details.open && onClose()}
            size="lg"
            placement="center"


        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content rounded="3xl" p={2} bg={"white"}>
                        <Dialog.Header>
                            <Dialog.Title fontWeight="900" fontSize="xl">
                                Pickup and confirm
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <MediaUpload
                                formData={formData}
                                setFormData={setFormData}

                                onSubmit={handleSubmit}
                                fileInputRef={fileInputRef}
                                handleImageUpload={handleImageUpload}
                                removeImage={removeImage}
                                isUploading={isUploading}
                            />
                        </Dialog.Body>


                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}


function MediaUpload({ formData, setFormData, onPrev, onSubmit, fileInputRef, handleImageUpload, removeImage, isUploading }: any) {
    return (
        <Stack gap="6" w="full">
            <Heading size="lg" fontWeight="800">Upload Images</Heading>

            <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />

            <Box
                border="2px dashed" borderColor="teal.200" rounded="3xl" p="10" bg="teal.50/20"
                textAlign="center" w="full" cursor="pointer" _hover={{ bg: "teal.50" }}
                onClick={() => fileInputRef.current?.click()}
            >
                <Circle size="12" bg="teal.600" color="white" mx="auto" mb="4"><Upload size={20} /></Circle>
                <Text fontWeight="bold" color="teal.900">Click to Select Car Images</Text>
                <Text fontSize="xs" color="gray.500">You can select multiple photos at once</Text>
            </Box>

            {formData.images.length > 0 && (
                <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
                    {formData.images.map((url: string, index: number) => (
                        <Box key={index} position="relative" h="100px" rounded="xl" overflow="hidden" border="1px solid" borderColor="gray.100">
                            <img src={url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <Circle
                                position="absolute" top="1" right="1" size="5" bg="red.500" color="white" cursor="pointer"
                                onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                            >
                                <X size={12} />
                            </Circle>
                            {index === 0 && <Box position="absolute" bottom="0" w="full" bg="teal.600" color="white" fontSize="9px" textAlign="center">PRIMARY</Box>}
                        </Box>
                    ))}
                </SimpleGrid>
            )}



            <Flex gap="4" mt="4" direction={{ base: "column", md: "row" }}>
                <Button
                    colorPalette="teal" flex="2" h="14" rounded="2xl" fontWeight="black"
                    onClick={onSubmit}
                    loading={isUploading}
                    loadingText="Uploading to S3..."
                >
                    Submit
                </Button>
            </Flex>
        </Stack>
    )
}
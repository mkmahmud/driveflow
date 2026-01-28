"use client";

import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Badge,
    Image,
    Flex,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import KycUploadInput from "../Form/KycUploadInput";
import { trpc } from "@/trpc/client";
import { useAuth } from "@/hooks/useAuth";

export default function KycVerificationCard() {
    const utils = trpc.useUtils();
    const { user, refreshUser, isLoading: authLoading } = useAuth();

    const [front, setFront] = useState<File | null>(null);
    const [back, setBack] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    //   Fetch KYC Status
    const { data: kycStatus, isLoading: statusLoading } = trpc.user.getKycStatus.useQuery(undefined, {
        enabled: !!user,
    });

    //   Mutations
    const getUploadUrl = trpc.user.getUploadUrl.useMutation();
    const saveKycUrls = trpc.user.saveKycUrls.useMutation();


    //   @ts-ignore
    const hasSubmitted = kycStatus?.isKycUploaded || user?.isKycUploaded;
    //   @ts-ignore
    const isVerified = kycStatus?.isIdentityVerified || user?.isIdentityVerified;

    //  Memoized Previews to prevent flickering 
    const frontUrl = useMemo(() => (front ? URL.createObjectURL(front) : null), [front]);
    const backUrl = useMemo(() => (back ? URL.createObjectURL(back) : null), [back]);

    const handleSubmit = async () => {
        if (!front || !back) {
            alert("Please upload both sides of your license.");
            return;
        }

        try {
            setIsUploading(true);
            const finalS3Urls: string[] = [];
            const files = [front, back];

            //   Get Signed URLs and Upload to S3
            for (const file of files) {
                const { signedUrl, publicUrl } = await getUploadUrl.mutateAsync({
                    fileName: file.name,
                    fileType: file.type,
                });

                const res = await fetch(signedUrl, {
                    method: "PUT",
                    body: file,
                    headers: { "Content-Type": file.type },
                });

                if (!res.ok) throw new Error(`S3 Upload failed for ${file.name}`);
                finalS3Urls.push(publicUrl);
            }

            //  Update DB
            await saveKycUrls.mutateAsync({ urls: finalS3Urls });

            //  Invalidate tRPC cache and Refresh Auth
            await utils.user.getKycStatus.invalidate();
            await refreshUser();

            alert("Verification documents submitted successfully!");

        } catch (err) {
            console.error("Upload Error:", err);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    //   initial loading states
    if (authLoading || statusLoading) {
        return (
            <Center maxW="360px" h="450px" bg="emerald.900" rounded="3xl">
                <VStack gap={4}>
                    <Spinner size="xl" color="emerald.300" />
                    <Text color="emerald.200" fontSize="sm" fontWeight="medium">Checking Status...</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <Box
            maxW="360px"
            p="6"
            rounded="3xl"
            className="bg-gradient-to-b from-emerald-800 to-emerald-900"
            color="white"
            position="relative"
           
        >
            <VStack align="stretch"  >
                {/* Header Section */}
                <Flex align="center" justifyContent="space-between">
                    <ShieldCheck size={36} className="text-emerald-300" />
                    <Box textAlign="right">
                        <Badge variant="subtle" colorPalette="whiteAlpha" rounded="full" px="3">
                            KYC PORTAL
                        </Badge>
                        <Text fontWeight="black" fontSize="lg" mt="1">
                            {isVerified ? "Verified" : hasSubmitted ? "In Review" : "Required"}
                        </Text>
                    </Box>
                </Flex>

                <Heading size="xl" fontWeight="800" letterSpacing="tight">
                    {hasSubmitted ? "Identity Verification" : "Verify Your Identity"}
                </Heading>

                <Text fontSize="sm" color="emerald.100" lineHeight="tall">
                    {hasSubmitted
                        ? "Your documents are currently under review. This process usually takes 2-4 hours during business days."
                        : "Upload your driver's license to start booking high-performance vehicles."}
                </Text>

                {/* Action/Status Section */}
                {!hasSubmitted ? (
                    <VStack align="stretch" mt="2">
                        <Box>
                            <KycUploadInput
                                label="License Front"
                                file={front}
                                onChange={setFront}
                            />
                            {frontUrl && (
                                <Image src={frontUrl} mt="3" rounded="xl" maxH="110px" w="full" objectFit="cover" border="2px solid" borderColor="whiteAlpha.200" />
                            )}
                        </Box>

                        <Box>
                            <KycUploadInput
                                label="License Back"
                                file={back}
                                onChange={setBack}

                            />
                            {backUrl && (
                                <Image src={backUrl} mt="3" rounded="xl" maxH="110px" w="full" objectFit="cover" border="2px solid" borderColor="whiteAlpha.200" />
                            )}
                        </Box>

                        <Button
                            mt="4"
                            rounded="2xl"
                            size="xl"
                            bg="white"
                            color="emerald.800"
                            fontWeight="900"
                            fontSize="md"
                            _hover={{ bg: "emerald.50", transform: "translateY(-2px)" }}
                            _active={{ transform: "translateY(0)" }}
                            transition="all 0.2s"
                            onClick={handleSubmit}
                            loading={isUploading}
                            loadingText="Uploading Files..."
                        >
                            Finish Submission
                        </Button>
                    </VStack>
                ) : (
                    <Box
                        mt="4"
                        p="8"
                        bg="whiteAlpha.100"
                        rounded="2xl"
                        border="2px dashed"
                        borderColor={isVerified ? "emerald.400" : "orange.400"}
                    >
                        <VStack  >
                            <Center
                                p="4"
                                bg={isVerified ? "emerald.500" : "orange.500"}
                                rounded="full"
                                shadow="lg"
                            >
                                {isVerified ? <CheckCircle2 size={32} /> : <Clock size={32} />}
                            </Center>
                            <VStack  >
                                <Text fontWeight="bold" fontSize="lg">
                                    {isVerified ? "All Set!" : "Verification Pending"}
                                </Text>
                                <Text fontSize="xs" textAlign="center" opacity={0.7}>
                                    {isVerified
                                        ? "Your identity is confirmed. Enjoy your ride!"
                                        : "We'll notify you via email as soon as your ID is approved."}
                                </Text>
                            </VStack>
                        </VStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}
"use client";

import { Box, Center, VStack, Text, Icon } from "@chakra-ui/react";
import { Car, Settings } from "lucide-react";

export default function Loading() {
    return (
        <Center minH="100vh"  >
            <VStack  >
                {/* MOTION STAGE */}
                <Box
                    position="relative"
                    w="320px"
                    h="120px"
                    overflow="hidden"
                    rounded="2xl"
                >
                    {/* Light streaks */}
                    <Box className="streak s1" />
                    <Box className="streak s2" />
                    <Box className="streak s3" />

                    {/* Car */}
                    <Box
                        position="absolute"
                        bottom="32px"
                        left="50%"
                        transform="translateX(-50%)"
                        color="#38BDF8"
                        className="car"
                    >
                        <Car size={44} strokeWidth={1.8} />
                    </Box>

                    {/* Ground glow */}
                    <Box
                        position="absolute"
                        bottom="24px"
                        left="50%"
                        transform="translateX(-50%)"
                        w="140px"
                        h="2px"
                        bg="linear-gradient(90deg, transparent, #38BDF8, transparent)"
                        opacity={0.6}
                    />
                </Box>

             
            </VStack>

            {/* GLOBAL STYLES */}
            <style jsx global>{`
        .car {
          animation: float 3s ease-in-out infinite;
        }

        .streak {
          position: absolute;
          top: 20%;
          width: 120px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(56, 189, 248, 0.7),
            transparent
          );
          opacity: 0.4;
          animation: streakMove 1.6s linear infinite;
        }

        .s1 {
          top: 30%;
          animation-delay: 0s;
        }
        .s2 {
          top: 50%;
          animation-delay: 0.4s;
        }
        .s3 {
          top: 70%;
          animation-delay: 0.8s;
        }

        @keyframes streakMove {
          from {
            transform: translateX(-140px);
          }
          to {
            transform: translateX(460px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -6px);
          }
        }
      `}</style>
        </Center>
    );
}

"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Button,
  Separator,
  Badge,
  Icon,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { Cookie, ShieldCheck, BarChart3, Target, Info } from "lucide-react";

export default function CookieSettingsPage() {
  const [settings, setSettings] = useState({
    essential: true, // Always true
    analytics: true,
    marketing: false,
    personalization: true,
  });

  const savePreferences = () => {
    // Logic to save to localstorage or API
    console.log("Saved preferences:", settings);
  };

  return (
    <Box maxW="800px" mx="auto" py={12} px={6}>
      {/* Header Section */}
      <VStack align="start" gap={1} mb={10}>
        <HStack color="teal.600" mb={2}>
          <Cookie size={20} />
          <Text fontSize="xs" fontWeight="black" letterSpacing="widest">
            PRIVACY CENTER
          </Text>
        </HStack>
        <Heading size="3xl" fontWeight="900" letterSpacing="-0.03em">
          Cookie Preferences
        </Heading>
        <Text color="gray.500" fontSize="md" maxW="600px">
          We use cookies to enhance your experience, serve personalized ads, and
          analyze our traffic. Manage your settings below.
        </Text>
      </VStack>

      {/* Main Settings Container */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        rounded="3xl"
        overflow="hidden"
        bg="white"
      >
        {/* Item 1: Essential (Immutable) */}
        <CookieItem
          title="Strictly Necessary Cookies"
          description="These are required for the website to function (e.g., security, authentication). They cannot be switched off."
          icon={ShieldCheck}
          isEnabled={true}
          isImmutable={true}
        />
        <Separator borderColor="gray.100" />

        {/* Item 2: Analytics */}
        <CookieItem
          title="Analytics & Performance"
          description="Helps us understand how visitors interact with the site by collecting and reporting information anonymously."
          icon={BarChart3}
          isEnabled={settings.analytics}
          onChange={() =>
            setSettings({ ...settings, analytics: !settings.analytics })
          }
        />
        <Separator borderColor="gray.100" />

        {/* Item 3: Personalization */}
        <CookieItem
          title="Personalization"
          description="Allows the site to remember choices you make (like your language or region) to provide enhanced features."
          icon={Info}
          isEnabled={settings.personalization}
          onChange={() =>
            setSettings({
              ...settings,
              personalization: !settings.personalization,
            })
          }
        />
        <Separator borderColor="gray.100" />

        {/* Item 4: Marketing */}
        <CookieItem
          title="Marketing & Targeting"
          description="Used to deliver adverts more relevant to you and your interests. They also limit the number of times you see an ad."
          icon={Target}
          isEnabled={settings.marketing}
          onChange={() =>
            setSettings({ ...settings, marketing: !settings.marketing })
          }
        />
      </Box>

      {/* Footer Actions */}
      <Flex justify="space-between" align="center" mt={8}>
        <Button variant="ghost" color="gray.500" fontWeight="bold" size="sm">
          Reset to default
        </Button>
        <HStack gap={4}>
          <Button
            variant="outline"
            borderColor="gray.200"
            rounded="xl"
            px={8}
            fontWeight="bold"
          >
            Reject All
          </Button>
          <Button
            bg="black"
            color="white"
            rounded="xl"
            px={8}
            fontWeight="bold"
            onClick={savePreferences}
          >
            Save Preferences
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

// --- Internal Component ---

function CookieItem({
  title,
  description,
  icon: LucideIcon,
  isEnabled,
  isImmutable,
  onChange,
}: any) {
  return (
    <Flex
      p={6}
      align="start"
      gap={6}
      transition="background 0.2s"
      _hover={{ bg: "gray.50/50" }}
    >
      <Box p={3} bg="gray.50" rounded="2xl" color="gray.600">
        <LucideIcon size={24} />
      </Box>

      <VStack align="start" flex="1" gap={1}>
        <HStack>
          <Text fontWeight="800" fontSize="md">
            {title}
          </Text>
          {isImmutable && (
            <Badge
              variant="surface"
              colorPalette="gray"
              fontSize="2xs"
              rounded="md"
            >
              Required
            </Badge>
          )}
        </HStack>
        <Text fontSize="sm" color="gray.500" lineHeight="tall">
          {description}
        </Text>
      </VStack>

      <Box pt={1}>
        <Switch.Root
          colorPalette="teal"
          disabled={isImmutable}
          checked={isEnabled}
          onCheckedChange={onChange}
        />
      </Box>
    </Flex>
  );
}

"use client"

import {
  Box, Button, Container, Flex, Heading, Input,
  Stack, Text, SimpleGrid, Circle,
  Textarea, NativeSelect, Field
} from "@chakra-ui/react"
import {
  MapPin, Calendar, DollarSign, Info,
  Upload, ChevronRight, Zap, Settings2, X
} from "lucide-react"
import { useState, useRef } from "react"

export default function AddNewCar() {
  const [step, setStep] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    type: "Luxury",
    pricePerDay: 0,
    securityDeposit: 0,
    seats: 4,
    transmission: "Automatic",
    fuelType: "Petrol",
    engineSize: "",
    horsepower: 0,
    availableFrom: "",
    availableTo: "",
    location: "",
    description: "",
    image: "",
    images: [] as string[]
  })

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  // --- WORKING IMAGE HANDLER ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    // Create temporary local URLs so we can see the images and log them
    const newImagePreviewUrls = fileArray.map(file => URL.createObjectURL(file));

    setFormData(prev => ({
      ...prev,
      image: newImagePreviewUrls[0], // Set the first one as primary
      images: [...prev.images, ...newImagePreviewUrls] // Add all to the gallery
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      image: index === 0 ? prev.images[1] || "" : prev.image
    }));
  };

  const handleSubmit = () => {
    console.log("Final Vehicle Data for Prisma:", {
      ...formData,
      year: Number(formData.year),
      pricePerDay: Number(formData.pricePerDay),
      securityDeposit: Number(formData.securityDeposit),
      seats: Number(formData.seats),
      horsepower: Number(formData.horsepower),
      availableFrom: formData.availableFrom ? new Date(formData.availableFrom) : null,
      availableTo: formData.availableTo ? new Date(formData.availableTo) : null,
    });
    alert("Check console to see all your data including images!");
  }

  return (
    <Container maxW="full" py="6">
      <Stack gap="8" w="full">
        <Box>
          <Heading size="3xl" fontWeight="900" letterSpacing="tight">Vehicle Setup</Heading>
          <Text color="gray.500">Configure your car listing for the marketplace.</Text>
        </Box>

        <Box bg="white" p={{ base: 4, md: 8 }} rounded="3xl" border="1px solid" borderColor="gray.200" w="full" shadow="none">
          {step === 1 && <BasicDetails formData={formData} setFormData={setFormData} onNext={nextStep} />}
          {step === 2 && <TechnicalSpecs formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />}
          {step === 3 && (
            <MediaUpload
              formData={formData}
              setFormData={setFormData}
              onPrev={prevStep}
              onSubmit={handleSubmit}
              fileInputRef={fileInputRef}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
            />
          )}
        </Box>
      </Stack>
    </Container>
  )
}

/* --- STEP 1: BASIC DETAILS --- */
function BasicDetails({ formData, setFormData, onNext }: any) {
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
  return (
    <Stack gap="6" w="full">
      <Heading size="lg" fontWeight="800">1. Identity & Location</Heading>
      <FormInput label="Listing Title" placeholder="e.g. 2024 Porsche 911 Carrera" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" w="full">
        <FormInput label="Brand" placeholder="Tesla" value={formData.brand} onChange={(e: any) => setFormData({ ...formData, brand: e.target.value })} />
        <FormInput label="Model" placeholder="Model S" value={formData.model} onChange={(e: any) => setFormData({ ...formData, model: e.target.value })} />
        <Field.Root w="full">
          <Field.Label fontSize="xs" fontWeight="bold" color="gray.500" mb="2">Year</Field.Label>
          <NativeSelect.Root size="lg" w="full">
            <NativeSelect.Field bg="gray.50" rounded="xl" border="1px solid" borderColor="gray.100" h="14" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })}>
              {years.map(y => <option className="bg-white" key={y} value={y}>{y}</option>)}
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Field.Root>
      </SimpleGrid>
      <FormInput label="Pickup Address" icon={MapPin} placeholder="City, State or Full Address" value={formData.location} onChange={(e: any) => setFormData({ ...formData, location: e.target.value })} />
      <Button colorPalette="teal" h="14" rounded="2xl" onClick={onNext} fontWeight="bold" w="full" mt="4">Continue to Tech Specs <ChevronRight size={18} /></Button>
    </Stack>
  )
}

/* --- STEP 2: TECH SPECS --- */
function TechnicalSpecs({ formData, setFormData, onNext, onPrev }: any) {
  return (
    <Stack gap="6" w="full">
      <Heading size="lg" fontWeight="800">2. Performance & Pricing</Heading>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap="4" w="full">
        <SelectField label="Fuel Type" value={formData.fuelType} onChange={(v: any) => setFormData({ ...formData, fuelType: v })} options={["Petrol", "Electric", "Hybrid", "Diesel"]} />
        <SelectField label="Transmission" value={formData.transmission} onChange={(v: any) => setFormData({ ...formData, transmission: v })} options={["Automatic", "Manual"]} />
        <SelectField label="Seats" value={formData.seats} onChange={(v: any) => setFormData({ ...formData, seats: v })} options={["2", "4", "5", "7", "8+"]} />
        <SelectField label="Body Type" value={formData.type} onChange={(v: any) => setFormData({ ...formData, type: v })} options={["Luxury", "SUV", "Sedan", "Coupe", "Convertible"]} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
        <FormInput label="Engine Size (Optional)" icon={Settings2} placeholder="e.g. 2.0L" value={formData.engineSize} onChange={(e: any) => setFormData({ ...formData, engineSize: e.target.value })} />
        <FormInput label="Horsepower" icon={Zap} type="number" placeholder="450" value={formData.horsepower} onChange={(e: any) => setFormData({ ...formData, horsepower: e.target.value })} />
      </SimpleGrid>
      <Box p="6" bg="teal.50/30" rounded="2xl" border="1px dashed" borderColor="teal.200">
        <Text fontSize="sm" fontWeight="bold" color="teal.800" mb="4">Availability Dates</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
          <FormInput label="Start Date" type="date" icon={Calendar} value={formData.availableFrom} onChange={(e: any) => setFormData({ ...formData, availableFrom: e.target.value })} />
          <FormInput label="End Date" type="date" icon={Calendar} value={formData.availableTo} onChange={(e: any) => setFormData({ ...formData, availableTo: e.target.value })} />
        </SimpleGrid>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
        <FormInput label="Daily Rate ($)" icon={DollarSign} type="number" value={formData.pricePerDay} onChange={(e: any) => setFormData({ ...formData, pricePerDay: e.target.value })} />
        <FormInput label="Security Deposit ($)" icon={Info} type="number" value={formData.securityDeposit} onChange={(e: any) => setFormData({ ...formData, securityDeposit: e.target.value })} />
      </SimpleGrid>
      <Flex gap="4" pt="4" direction={{ base: "column", md: "row" }}><Button variant="surface" flex="1" h="14" rounded="2xl" onClick={onPrev}>Back</Button><Button colorPalette="teal" flex="2" h="14" rounded="2xl" onClick={onNext} fontWeight="bold">Continue to Photos <ChevronRight size={18} /></Button></Flex>
    </Stack>
  )
}

/* --- STEP 3: MEDIA (FIXED FOR UPLOADS) --- */
function MediaUpload({ formData, setFormData, onPrev, onSubmit, fileInputRef, handleImageUpload, removeImage }: any) {
  return (
    <Stack gap="6" w="full">
      <Heading size="lg" fontWeight="800">3. Finalize Listing</Heading>

      {/* Hidden native input */}
      <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />

      {/* Clickable Dropzone */}
      <Box
        border="2px dashed" borderColor="teal.200" rounded="3xl" p="10" bg="teal.50/20"
        textAlign="center" w="full" cursor="pointer" _hover={{ bg: "teal.50" }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Circle size="12" bg="teal.600" color="white" mx="auto" mb="4"><Upload size={20} /></Circle>
        <Text fontWeight="bold" color="teal.900">Click to Select Car Images</Text>
        <Text fontSize="xs" color="gray.500">You can select multiple photos at once</Text>
      </Box>

      {/* Visual Preview of uploaded images */}
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

      <Stack gap="2" w="full">
        <Text fontSize="xs" fontWeight="bold" color="gray.500" ml="1">Public Description</Text>
        <Textarea placeholder="Tell users what makes this car special..." rounded="2xl" bg="gray.50" p="4" minH="120px" w="full" border="1px solid" borderColor="gray.100" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </Stack>

      <Flex gap="4" mt="4" direction={{ base: "column", md: "row" }}>
        <Button variant="surface" flex="1" h="14" rounded="2xl" onClick={onPrev}>Back</Button>
        <Button colorPalette="teal" flex="2" h="14" rounded="2xl" fontWeight="black" onClick={onSubmit}>Submit to Console</Button>
      </Flex>
    </Stack>
  )
}

/* --- REUSABLE HELPERS --- */
function FormInput({ label, icon: LucideIcon, type = "text", ...props }: any) {
  return (
    <Field.Root w="full">
      <Field.Label fontSize="xs" fontWeight="bold" color="gray.500" mb="2" ml="1">{label}</Field.Label>
      <Flex align="center" bg="gray.50" rounded="xl" px="4" h="14" border="1px solid" borderColor="gray.100" w="full" _focusWithin={{ borderColor: "teal.500", bg: "white", ring: "1px", ringColor: "teal.500" }}>
        {LucideIcon && <LucideIcon size={18} className="text-teal-600 mr-3" />}
        <Input type={type} variant="unstyled" fontSize="sm" fontWeight="medium" w="full" {...props} css={type === "date" ? { "&::-webkit-calendar-picker-indicator": { cursor: "pointer", filter: "invert(40%) sepia(80%) saturate(500%) hue-rotate(130deg)" } } : {}} />
      </Flex>
    </Field.Root>
  )
}

function SelectField({ label, options, onChange, value }: any) {
  return (
    <Field.Root w="full">
      <Field.Label fontSize="xs" fontWeight="bold" color="gray.500" mb="2" ml="1">{label}</Field.Label>
      <NativeSelect.Root size="lg" w="full">
        <NativeSelect.Field bg="gray.50" rounded="xl" border="1px solid" borderColor="gray.100" h="14" w="full" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((opt: string) => <option className="bg-white" key={opt} value={opt}>{opt}</option>)}</NativeSelect.Field>
      </NativeSelect.Root>
    </Field.Root>
  )
}
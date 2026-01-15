import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server'; // Import the TYPE only

export const trpc = createTRPCReact<AppRouter>();
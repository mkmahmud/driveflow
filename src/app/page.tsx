"use client";

import { trpc } from '@/trpc/client';

export default function Home() {
  const cars = trpc.car.getAll.useQuery();

  if (cars.isLoading) return <div>Loading cars...</div>;
  if (cars.error) return <div>Error loading cars: {cars.error.message}</div>;
  if (cars) console.log(cars.data);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Available Cars</h1>
      <div className="grid gap-4">
        {
          cars.data && cars.data
        }
      </div>
    </main>
  );
}
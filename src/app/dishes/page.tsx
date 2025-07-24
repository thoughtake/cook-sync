"use client";

import DishInfo from "@/components/dishes/dishes-info";
import { useModal } from "@/context/modal-context";
import useDishes from "@/hooks/useDishes";
import { Timer } from "lucide-react";
import Image from "next/image";

const DishesPage = () => {
  const { dishes } = useDishes();
  const { showModal } = useModal();

  return (
    <>
      <ul className="flex flex-wrap gap-4 py-5">
        {dishes.map((dish) => (
          <li
            key={dish.id}
            className="relative basis-[calc(33.333%-1rem)] max-w-[calc(33.333%-1rem)] h-70 rounded shadow-md overflow-hidden hover:outline-primary hover:outline-2"
          >
            <button
              className="absolute top-0 left-0 w-full h-full cursor-pointer rounded z-2"
              onClick={() => {
                showModal(<DishInfo dish={dish} />);
              }}
            ></button>
            <div className="relative w-full h-48">
              {dish.imageUrl ? (
                <Image
                  src={dish.imageUrl}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center bg-cancel text-white w-full h-full">
                  <span className="font-bold text-4xl">No Image</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="font-bold text-xl mb-2">{dish.name}</div>
              <div className="flex">
                <div className="mr-1">
                  <Timer />
                </div>
                <div className="font-bold">
                  <span className="text-md mr-0.5">{dish.timeMinutes}</span>
                  <span className="text-sm">分</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DishesPage;

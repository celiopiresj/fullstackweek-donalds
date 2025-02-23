"use server";
import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface createOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: createOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const productWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPriceAndQuantity = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productWithPrices.find(
      (productWithPrice) => productWithPrice.id === product.id,
    )!.price,
  }));

  await db.order.create({
    data: {
      consumptioMethod: input.consumptionMethod,
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      status: "PENDING",
      total: productsWithPriceAndQuantity.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      orderProducts: {
        createMany: {
          data: productsWithPriceAndQuantity,
        },
      },
      restaurantId: restaurant.id,
    },
  });
  redirect(
    `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`,
  );
};

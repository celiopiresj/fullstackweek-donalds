import { OrderStatus, Prisma } from "@prisma/client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.FINESHED:
      return "Finalizado";
    case OrderStatus.IN_PREPARATION:
      return "Em preparo";
    case OrderStatus.PENDING:
      return "Pendente";
    case OrderStatus.CANCELLED:
      return "Cancelado";
    default:
      return "";
  }
};

const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.FINESHED:
      return "bg-green-500 text-white";
    case OrderStatus.IN_PREPARATION:
      return "bg-yellow-500 text-white";
    case OrderStatus.PENDING:
      return "bg-gray-200 text-gray-500";
    case OrderStatus.CANCELLED:
      return "bg-red-500 text-white";
    default:
      return "";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card key={order.id}>
      <CardContent className="space-y-4 p-5">
        <div
          className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${getStatusStyle(
            order.status,
          )}`}
        >
          {getStatusLabel(order.status)}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image
              src={order.restaurant.avatarImageUrl}
              alt={order.restaurant.name}
              className="rounded-sm"
              fill
            />
          </div>
          <p className="text-sm font-semibold">{order.restaurant.name}</p>
        </div>
        <Separator />
        <div className="space-y-2">
          {order.orderProducts.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                {orderProduct.quantity}
              </div>
              <p className="text-sm">{orderProduct.product.name}</p>
            </div>
          ))}
        </div>
        <Separator />
        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
      </CardContent>
    </Card>
  );
};

export default OrderItem;

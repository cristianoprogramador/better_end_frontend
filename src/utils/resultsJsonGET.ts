export const resultsGEt = {
  orderId: "e58619f4-07e7-4253-89bb-7589c1c52880",
  orderDate: "1970-01-01T00:00:45.095Z",
  customer: {
    id: "9d0a462a-9a41-4c0c-b4a7-3e6026f36fef",
    name: "James Torres",
    email: "raymondstanton@example.net",
    phone: "+1-918-993-7326x876",
    address: "7333 Hunter Village",
    city: "Natalieland",
    state: "CT",
    zipCode: "34154",
  },
  shippingCost: 14.61,
  totalOrderValue: 28.11,
  status: "Shipped",
  paymentMethod: "Bank Transfer",
  items: [
    {
      productId: "b1044074-d8c6-41c9-896b-58eed88cb6a4",
      productName: "Apple",
      category: {
        id: "ecc20d03-3629-47c4-b6ca-322080858ab7",
        name: "Fruits",
      },
      price: 1.5,
      quantity: 9,
      totalPrice: 13.5,
    },
  ],
};

export const updatePostgreSQLCode = `
async updatePostgreSQL(): Promise<void> {
  // Update order status
  await this.prismaPostgresql.order.updateMany({
    where: {
      status: "Pending",
      orderDate: {
        gte: new Date("2023-06-01"),
        lte: new Date("2024-07-31"),
      },
      totalOrderValue: {
        gte: 100,
      },
    },
    data: {
      status: "Updated",
      updatedAt: new Date(),
    },
  });

  // Find related customers
  const affectedOrders = await this.prismaPostgresql.order.findMany({
    where: {
      status: "Updated",
      orderDate: {
        gte: new Date("2023-06-01"),
        lte: new Date("2024-07-31"),
      },
      totalOrderValue: {
        gte: 100,
      },
    },
    select: {
      id: true,
      customerId: true,
    },
  });



  const customerIds = affectedOrders.map((order) => order.customerId);
  const orderIds = affectedOrders.map((order) => order.id);

  await this.prismaPostgresql.orderItem.updateMany({
    where: {
      orderId: {
        in: orderIds,
      },
    },
    data: {
      quantity: {
        increment: 1,
      },
    },
  });

  // Update the address of related customers
  await this.prismaPostgresql.customer.updateMany({
    where: {
      id: {
        in: customerIds,
      },
    },
    data: {
      address: "123 Updated St",
      city: "Updated City",
      state: "Updated State",
      zipCode: "00000",
    },
  });
}`;

export const updateMongoDBCode = `
async updateMongoDB(): Promise<void> {
  // Update order status
  await this.db.collection("Order").updateMany(
    {
      status: "Pending",
      orderDate: {
        $gte: new Date("2023-06-01"),
        $lte: new Date("2024-07-31"),
      },
      totalOrderValue: {
        $gte: 100,
      },
    },
    {
      $set: {
        status: "Updated",
        updatedAt: new Date(),
      },
    }
  );

  // Find affected customers
  const affectedOrders = await this.db
    .collection("Order")
    .find(
      {
        status: "Updated",
        orderDate: {
          $gte: new Date("2023-06-01"),
          $lte: new Date("2024-07-31"),
        },
        totalOrderValue: {
          $gte: 100,
        },
      },
      { projection: { id: 1, customerId: 1 } }
    )
    .toArray();

  const customerIds = affectedOrders.map((order) => order.customerId);
  const orderIds = affectedOrders.map((order) => order.id);

  await this.db.collection("OrderItem").updateMany(
    {
      orderId: {
        $in: orderIds,
      },
    },
    {
      $inc: {
        quantity: 1,
      },
    }
  );

  // Update the address of related customers
  await this.db.collection("Customer").updateMany(
    {
      id: {
        $in: customerIds,
      },
    },
    {
      $set: {
        address: "123 Updated St",
        city: "Updated City",
        state: "Updated State",
        zipCode: "00000",
      },
    }
  );
}`;

export const deleteMongoDBCode = `
async deleteMongoDB(): Promise<{
    totalDeletedOrders: number;
    totalOrderValueDeleted: number;
  }> {

  const oldOrders = await this.db.collection("Order")
  .find(
    {
      orderDate: {
        $lte: new Date("2022-12-31"),
      },
    },
    { projection: {
     _id: 1,
     totalOrderValue: 1
    } }
  ).toArray();

  const orderIds = oldOrders.map((order) => order._id);

  const totalOrderValue = oldOrders.reduce(
    (sum, order) => sum + order.totalOrderValue,
    0
  );

  await this.db.collection("OrderItem").deleteMany({
    orderId: { $in: orderIds },
  });

  await this.db.collection("Order").deleteMany({
    _id: { $in: orderIds },
  });

  return {
    totalDeletedOrders: orderIds.length,
    totalOrderValueDeleted: totalOrderValue,
  };
}
`;

export const deletePostgreSQLCode = `
async deletePostgreSQL(): Promise<{
    totalDeletedOrders: number;
    totalOrderValueDeleted: number;
  }> {

  const oldOrders = await this.prismaPostgresql.order
  .findMany({
    where: {
      orderDate: {
        lte: new Date("2022-12-31"),
      },
    },
    select: {
      id: true,
      totalOrderValue: true,
    },
  });

  const orderIds = oldOrders.map((order) => order.id);

  const totalOrderValue = oldOrders.reduce(
    (sum, order) => sum + order.totalOrderValue,
    0
  );

  await this.prismaPostgresql.orderItem.deleteMany({
    where: {
      orderId: { in: orderIds },
    },
  });

  await this.prismaPostgresql.order.deleteMany({
    where: { id: { in: orderIds } },
  });

  return {
    totalDeletedOrders: orderIds.length,
    totalOrderValueDeleted: totalOrderValue,
  };
}
`;

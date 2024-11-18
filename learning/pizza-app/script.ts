type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  pizza: Pizza;
  status: "ordered" | "completed";
  id: number;
};

const menu: Pizza[] = [
  { id: 1, name: "Margeritha", price: 8 },
  { id: 2, name: "Pepperoni", price: 8 },
  { id: 3, name: "Hawaiian", price: 8 },
  { id: 4, name: "Veggie", price: 8 },
];

let nextOrderId = 1;
let cashRegister = 100;
const orderQueue: Order[] = [];

const addToArray = <T>(array: T[], item: T): T[] => {
  array.push(item);
  return array;
};

addToArray<Pizza>(menu, {
  id: menu.length + 1,
  name: "Broccoli Parm",
  price: 14,
});
addToArray<Order>(orderQueue, {
  id: orderQueue.length + 1,
  pizza: menu[2],
  status: "completed",
});

const addNewPizza = (pizza: Omit<Pizza, "id">): Pizza => {
  const newPizza: Pizza = {
    id: menu.length + 1,
    ...pizza,
  };
  menu.push(newPizza);

  return newPizza;
};

const placeOrder = (pizzaName: string): Order => {
  const pizza = menu.find((el) => el.name === pizzaName);
  if (!pizza) {
    throw new Error("pizza to order not found");
  }

  cashRegister += pizza.price;

  const newOrder: Order = {
    pizza: pizza,
    status: "ordered",
    id: nextOrderId++,
  };
  orderQueue.push(newOrder);

  return newOrder;
};

const completeOrder = (orderId: number): Order => {
  const order = orderQueue.find((el) => el.id === orderId);

  if (!order) {
    throw new Error("Order can't be completeOrder. Order ID not found.");
  }
  order.status = "completed";

  return order;
};

const getPizzaDetail = (
  identifier: Pizza["id"] | Pizza["name"]
): Pizza | undefined => {
  const pizza = menu.find((el) => {
    if (typeof identifier === "string") {
      return el.name === identifier;
    }

    if (typeof identifier === "number") {
      return el.id === identifier;
    }

    return undefined;
  });

  return pizza;
};

addNewPizza({ name: "BBQ Chicken", price: 12 });
completeOrder(2);

console.log("Menu: ", menu);
console.log("Cash: ", cashRegister);
console.log("Order queue: ", orderQueue);
console.log("Pizza detail: ", getPizzaDetail(1));

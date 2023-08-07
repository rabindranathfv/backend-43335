import OrderService from "../dao/orders.dao.js";
import UserService from "../dao/users.dao.js";
import BussinessService from "../dao/bussiness.dao.js";

const orderService = new OrderService();
const userService = new UserService();
const bussinessService = new BussinessService();

export const getOrders = async (req, res) => {
  // TODO: AGREGAR TRY CATCH
  const data = await orderService.getOrders();

  return res.json({
    message: `getOrders`,
    order: data,
  });
};

export const getOrderById = async (req, res) => {
  const { oid } = req.params;
  const data = await orderService.getOrdersById(oid);

  // TODO: validar sino existe la orden

  return res.json({
    message: `getOrderById`,
    order: data,
  });
};

export const createOrder = async (req, res) => {
  const orderBody = req.body;
  const { user, bussiness, products } = orderBody;
  const data = await orderService.createOrder(orderBody);

  // TENEMOS LA DATA DEL USUARIO
  const userData = await userService.getUserById(user);
  // tenemos LA DATA DE LOS PRODUCT O "Bussiness"
  const bussinessData = await bussinessService.getBussinessById(bussiness);

  const actualOrders = bussinessData.products.filter((product) => {
    return products.includes(product.id);
  });

  const sumOrders = actualOrders.reduce((acc, prev) => {
    acc += prev.price;
    return acc;
  }, 0);

  const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

  let order = {
    number: orderNumber,
    bussiness,
    users: user,
    status: "pending",
    products: actualOrders.map((product) => product.id),
    totalPrice: sumOrders,
  };

  const newOrder = await orderService.createOrder(order);

  userData.orders.push(newOrder._id);
  await userService.updateUserById(user, userData);

  return res.json({
    message: `createOrder`,
    order: newOrder,
  });
};

export const updateOrderById = async (req, res) => {
  const { oid } = req.params;
  const { resolve } = req.query;

  const data = await orderService.getOrderById(oid);
  data.status = resolve;

  const dataUpd = await orderService.updateOrderById(data._id || oid, data);

  return res.json({
    message: `updateOrderById`,
    order: dataUpd,
  });
};

export const deleteOrderById = async (req, res) => {
  const { oid } = req.params;
  const data = await orderService.deleteOrderById(oid);
  return res.json({
    message: `deleteOrderById`,
    order: data,
  });
};

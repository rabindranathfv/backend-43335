import BussinessService from "../dao/bussiness.dao.js";

const bussinessService = new BussinessService();

export const getBussiness = async (req, res) => {
  // TODO: Agregar try catch
  const data = await bussinessService.getBussiness();

  return res.json({
    message: `getBussiness`,
    bussiness: data,
  });
};

export const getBussinessById = async (req, res) => {
  const { bid } = req.params;
  const data = await bussinessService.getBussinessById(bid);

  // TODO: Validar sino existe ese elemento

  return res.json({
    message: `getBussinessById`,
    bussiness: data,
  });
};

export const createBussiness = async (req, res) => {
  const bussinessBody = req.body;
  const data = await bussinessService.createBussiness(bussinessBody);

  return res.json({
    message: `createBussiness`,
    bussiness: data,
  });
};

export const updateBussinessById = async (req, res) => {
  const { bid } = req.params;
  const data = await bussinessService.updateBussinessById(bid, req.body);

  return res.json({
    message: `updateBussinessById`,
  });
};

export const deleteBussinessById = async (req, res) => {
  const { bid } = req.params;
  const data = await bussinessService.deleteBussinessById(bid);

  return res.json({
    message: `deleteBussinessById`,
  });
};

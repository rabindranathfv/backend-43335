import bussinessModel from "../model/bussiness.model.js";

export default class BussinessDao {
  getBussiness = async () => {
    try {
      const data = await bussinessModel.find();
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: bussiness.dao.js:9 ~ BussinessDao ~ getBussiness= ~ error:",
        error
      );
      return null;
    }
  };

  getBussinessById = async (bid) => {
    try {
      const data = await bussinessModel.findOne({ _id: bid });
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: bussiness.dao.js:22 ~ BussinessDao ~ getBussinessById= ~ error:",
        error
      );
      return null;
    }
  };

  createBussiness = async (bussiness) => {
    try {
      const data = await bussinessModel.create(bussiness);
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: bussiness.dao.js:35 ~ BussinessDao ~ createBussiness= ~ error:",
        error
      );
      return null;
    }
  };

  updateBussinessById = async (bid, bussiness) => {
    try {
      const data = await bussinessModel.updateOne({ _id: bid }, bussiness);
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: bussiness.dao.js:48 ~ BussinessDao ~ updateBussinessById= ~ error:",
        error
      );
      return null;
    }
  };

  deleteBussinessById = async (bid) => {
    try {
      const data = await bussinessModel.deleteOne({ _id: id });
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: bussiness.dao.js:61 ~ BussinessDao ~ deleteBussinessById ~ error:",
        error
      );
      return null;
    }
  };
}

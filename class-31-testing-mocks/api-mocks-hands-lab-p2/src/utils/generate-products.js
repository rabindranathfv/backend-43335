import { faker } from "@faker-js/faker";

faker.locale = "es";

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.datatype.number({
      min: 0,
      max: 500,
    }),
    id: faker.database.mongodbObjectId(),
    description: faker.lorem.paragraph(),
    code: faker.datatype.uuid(),
  };
};

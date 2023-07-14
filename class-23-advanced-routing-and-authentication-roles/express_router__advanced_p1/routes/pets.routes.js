const { Router, Request } = require("express");


const router = Router();

const pets = [];

router.get("/:petName([a-zA-Z]+)", (req, res) => {
  const { petName } = req;
  console.log("🚀 ~ file: pets.routes.js:9 ~ router.get ~ petName:", petName);
  const findPet = pets.find(
    (pet) => pet.name.toLowerCase() === petName.toLowerCase()
  );

  if (!findPet) {
    return res
      .status(404)
      .json({ message: `this pet ${petName} does not exist` });
  }

  return res.json({ message: `the pet info sucess`, pet: findPet });
});

router.get("/", (req, res) => {
  return res.json({
    message: `list of pets`,
    pets: pets,
  });
});

router.post("/", (req, res) => {
  const { name, specie } = req.body;
  const newPeth = {
    name: name.toLowerCase(),
    specie: specie.toLowerCase(),
  };

  pets.push(newPeth);
  return res.json({
    message: `pet created successfuly`,
    pet: newPeth,
  });
});

router.put("/:petName([a-zA-Z]+)", (req, res) => {
  try {
    const { petName } = req;
    const infoPet = pets.find(
      (pet) => pet.name.toLowerCase() === petName.toLowerCase()
    );

    if (!infoPet) {
      return res
        .status(404)
        .json({ message: `this pet ${petName} does not exist` });
    }

    infoPet.adopted = true;
    // const updatedPet = { ...infoPet, adopted: true };
    // pets[idPet] = { ...updatedPet };
    return res.json({ message: `pet ${petName} is updated`, pet: infoPet });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:68 ~ router.put ~ error:", error);
  }
});

router.param("petName", (req, res, next, petName) => {
  console.log("PROCESANDO LA MASCOTA CON ROUTER.PARAM", petName);
  if (!petName) {
    req.petName = null;
  }

  req.petName = petName;
  next();
});

module.exports = router;

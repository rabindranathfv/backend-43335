const { login } = require("./auth.login");

describe("Login function", () => {
  it("No se proporcion el usuario entonces deberia retornar No se ha proporcionado un usuario", () => {
    // pre setup
    console.log = jest.fn();

    // nucleo de la prueba
    const isAuth = login("", "123");

    // condiciones q deben cumplir
    expect(isAuth).toBe(null);
    expect(isAuth).toBeFalsy();
    expect(console.log).toHaveBeenCalledWith(
      "No se ha proporcionado un usuario"
    );
  });

  it("should log an error message if no password is provided", () => {
    console.log = jest.fn();

    const isAuth = login("coderUser", "");

    expect(isAuth).toBe(undefined);
    expect(isAuth).toBeFalsy();
    expect(console.log).toHaveBeenCalledWith(
      "No se ha proporcionado un usuario"
    );
  });

  it("should log an error message if the user is incorrect", () => {
    console.log = jest.fn();

    const result = login("wrongUser", "123");

    expect(console.log).toHaveBeenCalledWith("Credenciales incorrectas");
    expect(result).toBe(false);
  });

  it("should log an error message if the password is incorrect", () => {
    console.log = jest.fn();

    const result = login("coderHouse", "wrongPassword");

    expect(console.log).toHaveBeenCalledWith("Contraseña incorrecta");
    expect(result).toBe(false);
  });

  it("should log a success message if the user and password match", () => {
    console.log = jest.fn();

    const result = login("coderHouse", "123");

    expect(console.log).toHaveBeenCalledWith("logueado");
    expect(result).toBe(true);
  });
});

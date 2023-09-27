import supertest from "supertest";

const BASE_API_URL = "http://localhost:6000";
const LIBRARY_BOOKS = "/api/libraries";

describe("functional test::::", () => {
  let requester;
  // TODO: ACTUALIZAR EL ID CON UNO EXISTENTE
  const getId = `64f6583d0eb48751cf338d5c`;

  beforeEach(() => {
    requester = supertest(`${BASE_API_URL}`);
  });
  describe("library endpoints::", () => {
    it("should get all libraryes with StatusCode 200", async () => {
      const { statusCode, ok, _body } = await requester.get(`${LIBRARY_BOOKS}`);

      expect(ok).toBeDefined();
      expect(statusCode).toBe(200);
      expect(_body.libraries.length > 0).toBe(true);
      expect(Array.isArray(_body.libraries)).toBe(true);
    });

    it("should getLibraryById with StatusCode 200", async () => {
      const { statusCode, ok, _body } = await requester.get(
        `${LIBRARY_BOOKS}/${getId}`
      );

      expect(ok).toBeDefined();
      expect(statusCode).toBe(200);
      expect(_body.library.name).toBe("library NYC");
      expect(_body.library.location).toBe("NYC");
      expect(Array.isArray(_body.library.books)).toBe(true);
    });

    it("should call createLibrary and response with StatusCode 200", async () => {
      const bodyLib = {
        name: "TEST LIB",
        location: "BA",
      };
      const { statusCode, ok, _body } = await requester
        .post(`${LIBRARY_BOOKS}`)
        .send(bodyLib);

      expect(ok).toBeDefined();
      expect(statusCode).toBe(200);
      expect(_body.message).toBe(`create library OK`);
      expect(_body.library.name).toBe(bodyLib.name);
      expect(_body.library.location).toBe(bodyLib.location);
      expect(Array.isArray(_body.library.books)).toBe(true);
    });

    it("should call createLibrary and response with StatusCode 400", async () => {
      const bodyLib = {
        location: "BA",
      };
      const { statusCode, ok, _body } = await requester
        .post(`${LIBRARY_BOOKS}`)
        .send(bodyLib);

      expect(ok).toBeDefined();
      expect(statusCode).toBe(400);
      expect(_body.errors[0].message).toBe("library name is Required");
    });

    it("should call deletelibraryById and response with StatusCode 200", async () => {
      const bodyLib = {
        name: "TEST LIB",
        location: "BA",
      };
      const {
        statusCode: status,
        ok: okCreate,
        _body: bodyCreate,
      } = await requester.post(`${LIBRARY_BOOKS}`).send(bodyLib);

      expect(okCreate).toBeDefined();
      expect(status).toBe(200);
      expect(bodyCreate.message).toBe(`create library OK`);
      expect(bodyCreate.library.name).toBe(bodyLib.name);

      const libraryId = bodyCreate.library._id;

      const { statusCode, ok, _body } = await requester.delete(
        `${LIBRARY_BOOKS}/${libraryId}`
      );

      expect(ok).toBeDefined();
      expect(statusCode).toBe(200);
      expect(_body.message).toBe(`deletelibraryById OK with id: ${libraryId}`);
      expect(_body.library).toBeDefined();
    });

    it("should call updateLibraryById and response with StatusCode 200", async () => {
      const bodyLib = {
        name: "TEST LIB2",
        location: "Madrid",
      };
      const {
        statusCode: status,
        ok: okCreate,
        _body: bodyCreate,
      } = await requester.post(`${LIBRARY_BOOKS}`).send(bodyLib);

      expect(okCreate).toBeDefined();
      expect(status).toBe(200);
      expect(bodyCreate.message).toBe(`create library OK`);
      expect(bodyCreate.library.name).toBe(bodyLib.name);

      const libraryId = bodyCreate.library._id;

      const bodyUpdate = {
        name: "libreria Principal",
      };

      const { statusCode, ok, _body } = await requester
        .put(`${LIBRARY_BOOKS}/${libraryId}`)
        .send(bodyUpdate);

      expect(ok).toBeDefined();
      expect(statusCode).toBe(200);
      expect(_body.message).toBe(`updateLibraryById OK with id: ${libraryId}`);
      expect(_body.library).toBeDefined();
      expect(_body.library.acknowledged).toBe(true);
    }, 100000);
  });
});

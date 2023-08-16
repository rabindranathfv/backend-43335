import { Router } from "express";
import { generateUser } from "../utils/generate-users.js";
import { EnumErrors, HttpResponse } from "../middleware/error-handler.js";

const router = Router();

const httpResp = new HttpResponse();

router.get("/", async (req, res) => {
  try {
    let users = [];
    for (let index = 0; index < 100; index++) {
      users.push(generateUser());
    }

    return httpResp.OK(res, `generated users`, users);
  } catch (error) {
    return httpResp.Error(
      res,
      `Something wrong happens generating users`,
      error?.message
    );
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid || isNaN(uid) || uid < 0) {
      return httpResp.BadRequest(
        res,
        `${EnumErrors.INVALID_PARAMS} - Invalid Params for userId `,
        req.params
      );
    }

    return res.json({
      message: `generate users`,
      user: { name: "mock data" },
    });
  } catch (error) {
    return httpResp.Error(res, `something wrong happens`, error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    // TODO: DESCOMENTAR
    if (!name) {
      return httpResp.BadRequest(res, `missing name in body`);
    }
    // throw new Error(EnumErrors.DATABASE_ERROR);
    return httpResp.OK(res, `created users`, { name: `fake user` });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:32 ~ router.post ~ error:", error);
    return httpResp.Error(res, `something wrong happens`, error.message);
  }
});

export default router;

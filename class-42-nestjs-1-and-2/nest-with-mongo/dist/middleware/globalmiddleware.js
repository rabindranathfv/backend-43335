"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlobalMiddleware {
    use(req, res, next) {
        console.log(`RUNNING MDW: ${req.method} at ${req.url} received`);
        next();
    }
}
exports.default = GlobalMiddleware;
//# sourceMappingURL=globalmiddleware.js.map
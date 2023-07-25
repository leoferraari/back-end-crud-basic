"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/use-cases/register.ts
var register_exports = {};
__export(register_exports, {
  RegisterCustomerCase: () => RegisterCustomerCase
});
module.exports = __toCommonJS(register_exports);

// src/use-cases/errors/customers-already-exists-error.ts
var CustomersAlreadyExistsError = class extends Error {
  constructor() {
    super("A customer with that email already exists.");
  }
};

// src/use-cases/register.ts
var RegisterCustomerCase = class {
  constructor(costumersRepository) {
    this.costumersRepository = costumersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({ name, email, telephone }) {
      const userWithSameEmail = yield this.costumersRepository.findByEmail(email);
      if (userWithSameEmail) {
        throw new CustomersAlreadyExistsError();
      }
      const customer = yield this.costumersRepository.create({
        name,
        email,
        telephone
      });
      return {
        customer
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterCustomerCase
});

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

// src/http/controllers/customers/list-customers.ts
var list_customers_exports = {};
__export(list_customers_exports, {
  listCustomers: () => listCustomers
});
module.exports = __toCommonJS(list_customers_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/prisma/prisma-customers-repository.ts
var PrismaCustomersRepository = class {
  create(data) {
    return __async(this, null, function* () {
      const customer = yield prisma.customers.create({
        data
      });
      return customer;
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield prisma.customers.findUnique({
        where: {
          email
        }
      });
      return user;
    });
  }
  getAllCustomers() {
    return __async(this, null, function* () {
      const allCustomers = yield prisma.customers.findMany({});
      return allCustomers;
    });
  }
};

// src/use-cases/list-customers.ts
var ListCustomersCase = class {
  constructor(costumersRepository) {
    this.costumersRepository = costumersRepository;
  }
  execute() {
    return __async(this, null, function* () {
      const allCustomers = yield this.costumersRepository.getAllCustomers();
      return {
        allCustomers
      };
    });
  }
};

// src/use-cases/factories/make-list-customers-use-case.ts
function makeListCustomersUseCase() {
  const usersRepository = new PrismaCustomersRepository();
  const listCustomersUseCase = new ListCustomersCase(
    usersRepository
  );
  return listCustomersUseCase;
}

// src/http/controllers/customers/list-customers.ts
function listCustomers(request, reply) {
  return __async(this, null, function* () {
    try {
      const registerUseCase = makeListCustomersUseCase();
      const customers = yield registerUseCase.execute();
      return reply.status(200).send({
        customers
      });
    } catch (err) {
      return reply.status(500).send();
    }
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listCustomers
});

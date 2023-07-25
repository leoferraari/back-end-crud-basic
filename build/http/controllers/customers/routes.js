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

// src/http/controllers/customers/routes.ts
var routes_exports = {};
__export(routes_exports, {
  customersRoutes: () => customersRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controllers/customers/register.ts
var import_zod = require("zod");

// src/use-cases/errors/customers-already-exists-error.ts
var CustomersAlreadyExistsError = class extends Error {
  constructor() {
    super("A customer with that email already exists.");
  }
};

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

// src/use-cases/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const usersRepository = new PrismaCustomersRepository();
  const registerUseCase = new RegisterCustomerCase(
    usersRepository
  );
  return registerUseCase;
}

// src/http/controllers/customers/register.ts
function register(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      email: import_zod.z.string().email(),
      telephone: import_zod.z.string().min(11)
    });
    const { name, email, telephone } = registerBodySchema.parse(request.body);
    try {
      const registerUseCase = makeRegisterUseCase();
      yield registerUseCase.execute({
        name,
        email,
        telephone
      });
    } catch (err) {
      if (err instanceof CustomersAlreadyExistsError) {
        return reply.status(409).send({ message: err.message });
      }
      return reply.status(500).send();
    }
    return reply.status(201).send();
  });
}

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

// src/http/controllers/customers/routes.ts
function customersRoutes(app) {
  return __async(this, null, function* () {
    app.post("/customers", register);
    app.get("/customers", listCustomers);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customersRoutes
});

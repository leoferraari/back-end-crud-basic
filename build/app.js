"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));
var import_zod3 = require("zod");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/http/controllers/customers/register.ts
var import_zod2 = require("zod");

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
    const registerBodySchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      email: import_zod2.z.string().email(),
      telephone: import_zod2.z.string().min(11)
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
function customersRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/customers", register);
    app2.get("/customers", listCustomers);
  });
}

// src/app.ts
var import_cors = __toESM(require("@fastify/cors"));
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
});
app.register(customersRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof import_zod3.ZodError) {
    return reply.status(400).send({ messsage: "Validation error.", issues: error.format() });
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
  }
  return reply.status(500).send({ message: "Internal server error. " });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});

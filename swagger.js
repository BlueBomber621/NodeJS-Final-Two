const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "My API",
    description: "An API that shows data.",
  },
  host: "nodejs-final-two.onrender.com",
  schemes: ["https"],
};

const outputfile = "./swagger.json";
const endpointFiles = ["./server/routes/objects.js"];

// Run to
swaggerAutogen(outputfile, endpointFiles, doc);

// Generates the swagger.json file
swaggerAutogen(outputfile, endpointFiles, doc).then(async () => {
  await import("./app.js");
});

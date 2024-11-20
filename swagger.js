const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "My API",
    description: "An API that shows data.",
  },
  host: "",
  schemes: ["https"],
};

const outputfile = "./swagger.json";
const endpointFiles = ["./routes/objects.js"];

// Run to
swaggerAutogen(outputfile, endpointFiles, doc);

// Generates the swagger.json file
swaggerAutogen(outputfile, endpointFiles, doc).then(async () => {
  await import("./server.js");
});

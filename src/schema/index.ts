import * as fs from "fs";
import * as path from "path";

import Ajv from "ajv";

const ajv = new Ajv({
    allErrors: true,
    format: "full",
    jsonPointers: true
});

const schemaDir = path.join(__dirname, "../../schema");

// read the schema directory
const allFileNames = fs.readdirSync(schemaDir);

// Here all the files will be indexed and cached to ajv
// and then they can be used by reference (id)
allFileNames.filter(fileName => fileName.endsWith(".json")).forEach(schemaFileName => {
    const file = require(`${schemaDir}/${schemaFileName}`);
    ajv.addSchema(file, file.$id);
});

// THE ajv instance is exported
// so that can be used and not instantiated everywhere
// because it has cached the compiled javascript validation function
export default ajv;

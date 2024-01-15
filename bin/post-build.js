import fs from "fs-extra";
import fsx from "fs";
import path from "path";
import jscodeshift from "jscodeshift";
import { exec } from "child_process";
// import replaceImportStatement from "./replace-import-statement";

// function replaceImportStatement(fileInfo, api) {
//   try {
//     const j = api.jscodeshift;
//     const { source } = fileInfo;
//     const ast = j(source);

//     // Remove all import declarations
//     ast.find(j.ImportDeclaration).remove();

//     return ast.toSource();
//   } catch (error) {
//     console.error("******", error);
//   }
// }

const codemodScript = "bin/replace-import-statement.js";
const codemodFileToFix = "dist/scripts/common/service-worker.ts";

function replaceImportStatement(fileInfo, api) {
  try {
    const j = api.jscodeshift;
    const { source } = fileInfo;

    // Specify the parser option here
    const ast = j(source, { parser: "ts" });

    // Remove all import declarations
    ast.find(j.ImportDeclaration).remove();

    return ast.toSource();
  } catch (error) {
    console.error("******", error);
  }
}

const extensionSourceDirectory = "src-extension";
const buildDirectory = "dist";

const getServiceWorkerPath = (extension = "ts") => {
  return path.join(
    buildDirectory,
    "scripts",
    "common",
    `service-worker.${extension}`
  );
};

const [, messageKeys] = fs
  .readFileSync("src/constants/messageKeys.ts", "utf-8")
  .split("export");

/**
 
 1. "transpile" service-worker.ts ===> service-worker.js
 */

fs.copySync(extensionSourceDirectory, buildDirectory, { overwrite: true });

const file = fs.readFileSync(codemodScript, "utf-8");

console.log("======", file);

const command = `npx jscodeshift --parser ts -t ${codemodScript} ${codemodFileToFix}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Command stderr: ${stderr}`);
    return;
  }

  console.log(`Command output: ${stdout}`);
});

/**
  What if??
  1. Write the chrome service worker and content scripts in TypeScript
  2. Transpile to JavaScript post-build
  3. Use union as message keys
 */

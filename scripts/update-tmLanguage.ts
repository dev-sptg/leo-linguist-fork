import fs from "fs";
import path from "path";
import plist from "plist";

(async () => {
  const prepareJSONforYaml = (json) => {
    delete json["extension"];
    delete json["scope"];
    json["fileTypes"] = ["leo"];
    return json;
  } 
  const expectationsFileJSON = path.join(
    __dirname,
    "../syntaxes/leo.tmLanguage.json"
  );
  const expectationsFilePlist = path.join(
    __dirname,
    "../syntaxes/leo.tmLanguage"
  );
  // To get latest version of leo.tmLanguage, need to have actual leo-lsp repository in the same level 
  // After run script if there are changes in syntaxes folder, make commit and push
  const tmLanguageExpectationFile = path.join(
    __dirname,
    "../../leo-lsp/vscode-extension/syntaxes/leo.tmLanguage.json"
  );
  const isExist = await fs.existsSync(tmLanguageExpectationFile);
  if (!isExist) {
    throw "leo.tmLanguage.json not found!";
  }
  const content = await fs.promises.readFile(
    tmLanguageExpectationFile,
    { encoding: "utf8" }
  );
  const plistContent = plist.build(JSON.parse(content));
  await fs.promises.writeFile(
    expectationsFileJSON,
    content,
  );
  await fs.promises.writeFile(
    expectationsFilePlist,
    plistContent,
  );
})();

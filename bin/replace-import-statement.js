module.exports = function (fileInfo, api) {
  console.log("************* FI:  ", fileInfo);
  const j = api.jscodeshift;
  const { source } = fileInfo;
  const ast = j(source);

  // Remove all import declarations
  ast.find(j.ImportDeclaration).remove();

  return ast.toSource();
};

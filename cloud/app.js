/**
 * Routing & Single Page Application
 * https://help.back4app.com/hc/en-us/articles/360031634031-Routing-Single-Page-Application-
 */
// eslint-disable-next-line no-undef
const path = require("path");
const unRoutedPaths = [
  "apps",
  "batch",
  "requestPasswordReset",
  "files",
  "login",
  "logout",
  "user",
  "users",
  "Roles",
  "parse",
  "schemas",
  "functions",
  "classes",
  "aggregate",
  "cloud_code",
  "config",
  "hooks",
  "push_audiences",
  "installations",
  "push",
  "sessions",
  "events",
  "jobs",
  "export_progress",
  "export_data",
  "graphql",
  "purge",
  // To import data thanks https://blog.back4app.com/parse-json-files/ (thank you to Parse Platform team)
  "import_data",
];
// eslint-disable-next-line no-undef
app.use((req, res, next) => {
  const pathParts = req.path.split("/").filter((p) => p !== "");
  if (req.path.indexOf(".") > 0 || unRoutedPaths.includes(pathParts[0])) {
    next();
  } else {
    // eslint-disable-next-line no-undef
    res.sendFile(path.join(`${__dirname}/public/index.html`));
  }
});

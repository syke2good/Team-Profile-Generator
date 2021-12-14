const path = require("path");
const fs = require("fs");

const distsDir = path.resolve(__dirname, "../dists");

const render = employees => {
  const html = [];

  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let dist = fs.readFileSync(path.resolve(distsDir, "manager.html"), "utf8");
  dist = replacePlaceholders(dist, "name", manager.getName());
  dist = replacePlaceholders(dist, "role", manager.getRole());
  dist = replacePlaceholders(dist, "email", manager.getEmail());
  dist = replacePlaceholders(dist, "id", manager.getId());
  dist = replacePlaceholders(dist, "officeNumber", manager.getOfficeNumber());
  return dist;
};

const renderEngineer = engineer => {
  let dist = fs.readFileSync(path.resolve(distsDir, "engineer.html"), "utf8");
  dist = replacePlaceholders(dist, "name", engineer.getName());
  dist = replacePlaceholders(dist, "role", engineer.getRole());
  dist = replacePlaceholders(dist, "email", engineer.getEmail());
  dist = replacePlaceholders(dist, "id", engineer.getId());
  dist = replacePlaceholders(dist, "github", engineer.getGithub());
  return dist;
};

const renderIntern = intern => {
  let dist = fs.readFileSync(path.resolve(distsDir, "intern.html"), "utf8");
  dist = replacePlaceholders(dist, "name", intern.getName());
  dist = replacePlaceholders(dist, "role", intern.getRole());
  dist = replacePlaceholders(dist, "email", intern.getEmail());
  dist = replacePlaceholders(dist, "id", intern.getId());
  dist = replacePlaceholders(dist, "school", intern.getSchool());
  return dist;
};

const renderMain = html => {
  const dist = fs.readFileSync(path.resolve(distsDir, "main.html"), "utf8");
  return replacePlaceholders(dist, "team", html);
};

const replacePlaceholders = (dist, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return dist.replace(pattern, value);
};

module.exports = render;
import express from "express";
const app = express();

import employees from "#db/employees";

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// These are called "middleware"
app.get("/employees", (req, res) => {
  res.send(employees);
});

app.get("/employees/random", (req, res, next) => {
  /* HAD SOME HELP HERE W. CHATGPT HINTS
   1. Kept thinking I needed to sort through employees arrys
   2. Stomped on the following below - not knowing it was regarding placement of the syntax or "middleware"
    -  Be very careful about where you write this middleware!
       A request is handled by the _first_ handler with a matching route. 
  */

  const random = Math.floor(Math.random() * employees.length);
  const employee = employees[random];

  try {
    if (employee === undefined) {
      res.status(404).send("There is no employee with that id.");
    } else {
      res.send(employee);
    }
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", (req, res, next) => {
  // HAD SOME HELP HERE W. CHATGPT HINTS
  // https://www.google.com/search?client=safari&rls=en&q=.find+javascript+to+locate+array+id&ie=UTF-8&oe=UTF-8

  const employeeID = Number(req.params.id);

  /*
  Got this wrong on quized. Below shows why (beginner method):
  const { id } = req.params;
  const employeeID = Number(id);
  */

  const matchID = employees.find((employee) => employee.id === employeeID);

  try {
    if (matchID === undefined) {
      res.status(404).send("There is no employee with that id.");
    } else {
      res.send(matchID);
    }
  } catch (err) {
    next(err);
  }
});

export default app;

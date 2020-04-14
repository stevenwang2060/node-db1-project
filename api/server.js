const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/accounts", (req, res) => {
    db.select("*")
      .from("accounts")
      .then((accounts) => {
        res.json(accounts);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Can't retrieve accounts", err });
      });
  });
  
  server.get("/accounts/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first()
      .then((account) => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(500).json({ msg: "Account not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "Server error", err });
      });
  });
  
  server.post("/accounts", (req, res) => {
    db("accounts")
      .insert(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) =>
        res.status(500).json({ msg: "Failed to create account", err })
      );
  });
  
  server.put("/accounts/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .update(req.body)
      .then((count) => {
        if (count) {
          res.json({ updated: count });
        } else {
          res.status(404).json({ msg: "Not found" });
        }
      })
      .catch((err) =>
        res.status(500).json({ msg: "Internal server error", err })
      );
  });
  
  server.delete("/accounts/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del()
      .then((account) => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(500).json({ msg: "Account can't be deleted" });
        }
      });
  });

module.exports = server;
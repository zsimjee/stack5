import express from "express";
import { json } from "body-parser";

import { deleteDynamoDbItem, getDynamoDbItem, putDynamoDbItem, updateDynamoDbItem } from "./dynamodb-item";
import { deletePostgresItem, getPostgresDbItem, createPostgresDbItem, updatePostgresItem  } from "./postgresdb-item";
import { deleteItem, getItem, putItem, updateItem, listItems } from "./local-item";
import fetch from 'node-fetch';


// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// App handlers
const app = express();
const parser = json();

app.get("/", (req:any, res:any) => {
  res.status(200).send("hello world!");
});

app.get("/cookies", (req:any, res:any) => {
  res.set('Access-Control-Expose-Headers', 'field');
  res.set('set-cookies', 'a=b');
  res.set('set-cookies', 'c=d');
  res.status(200).send("hello world!");
});

app.get("/log", (req:any, res:any) => {
  console.log("HI!");
  res.status(200).send("hello world!");
});

app.get("/example", async (req:any, res:any) => {
  const response = await fetch('https://example.com/');
  const body = await response.text();

  res.status(200).send(body);
});

app.get("/ping", (req:any, res:any) => {
  res.status(200).send("pong");
});

app.get('/local-item/:id', parser, getItem);
app.get('/local-item', parser, listItems);
app.post('/local-item', parser, putItem);
app.put('/local-item/:id', parser, updateItem);
app.delete('/local-item', parser, deleteItem);

app.put('/dynamodb-item', parser, putDynamoDbItem);
app.post('/dynamodb-item', parser, updateDynamoDbItem);
app.get('/dynamodb-item', parser, getDynamoDbItem);
app.delete('/dynamodb-item', parser, deleteDynamoDbItem);

app.get('/postgres-item/:id', parser, getPostgresDbItem);
app.get('/postgres-item', parser, getPostgresDbItem);
app.post('/postgres-item', parser, createPostgresDbItem);
app.put('/postgres-item/:id', parser, updatePostgresItem);
app.delete('/postgres-item/:id', parser, deletePostgresItem);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

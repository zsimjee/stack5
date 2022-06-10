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
  res.set('set-cookie', 'a=b');
  res.set('set-cookie', 'c=d');
  res.set('custom-header', 'asdfsadf');
  res.set('Server', 'Cowboy');
  res.set('Date', 'Fri, 10 Jun 2022 18:57:54 GMT');
  res.set('Connection', 'keep-alive');
  res.set('Strict-Transport-Security', 'max-age=16070400; includeSubDomains');
  res.set('X-Frame-Options', 'deny');
  res.set('X-Xss-Protection', '1; mode=block');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Cache-Control', 'no-cache, no-store');
  res.set('Location', 'https://staging.snapcell.us.com/session/new');
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.set('Set-Cookie','_snapcell_session o7ZzYvXstLiUQkN%2B6cxvHFcb5ecoVmXYpiC4NfLYU9NO%2FAx5br6Ln64xUHzf1KhhXpbCuynmC7XKgIXmO6vvIgcOSrRWnd7WnbPz8%2BQYzBEvogGpQB29FF1pQYPHiGv8tLAZgBDa1%2FzFrQ8UWKX7mD4Yc7HMcf3buWbfI%3D--VqwAmejBx1TmsY52--kVDge8rZhhCU9Xrml6z4EQ%3D%3D; path=/; secure; HttpOnly');
  res.set('X-Request-Id', '2462b679-03c1-435b-9415-178ab3bbbb43');
  res.set('X-Runtime', '0.005792');
  res.set('Transfer-Encoding', 'chunked');
  res.set('Via', '1.1 vegur');
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

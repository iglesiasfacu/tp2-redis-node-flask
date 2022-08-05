const redis = require("redis");
const express = require("express");
const app = express();
const port = 3000;
app.set("port", port);

// creamos cliente redis
const redisClient = redis.createClient();

const connectRedis = async () => {
  try {
    await redisClient.connect().then();
    console.log("conectado a redis");
  } catch (error) {
    console.log("error al conectarse a redis:\n", error);
  }
};

connectRedis();

const setData = async () => {
  try {
    await redisClient.set("key1", "react");
    await redisClient.set("key2", "angular");
    await redisClient.set("key3", "vue");
    await redisClient.set("key4", "svelt");
  } catch (error) {
    console.log("error al insertar datos:\n");
    console.error(error);
  }
};

const getData = async () => {
  const array = ["key1", "key2", "key3", "key4"];
  try {
    for (const item of array) {
      console.log(await redisClient.get(item));
    }
  } catch (error) {
    console.log("error al mapear datos:\n");
    console.error(error);
  }
};

const setDataList = async () => {
  try {
    await redisClient.lPush("arrayData", ["goku", "vegeta", "gohan", "trunks"]);
  } catch (error) {
    console.log("error al insertar datos en la lista:\n");
    console.error(error);
  }
};

const getDataList = async () => {
  try {
    console.log(await redisClient.LRANGE("arrayData", 0, -1));
  } catch (error) {
    console.log("error al mapear datos en la lista:\n");
    console.error(error);
  }
};

const redisData = async () => {
  await setData();
  await getData();
  console.log("_______________________________________");
  await setDataList();
  await getDataList();
};

redisData();

app.listen(app.get("port"), () => {
  console.log("Listening on port", port);
});

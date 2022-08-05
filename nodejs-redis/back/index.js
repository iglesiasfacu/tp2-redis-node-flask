const redis = require("redis");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;
app.set("port", port);

/**
 * para pruebas en local revisar IP del contenedor con:
 * docker inspect <container id> | grep "IPAddress"
 * url: "redis://<IPAddress>:6379"
 */

const redisClient = redis.createClient({
  url: "redis://node_redis_db:6379",
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("conectado a redis");
  } catch (error) {
    console.log("error al conectarse a redis:\n", error);
  }
};

connectRedis();

app.get("/list/:episode", async (req, res) => {
  const { episode } = req.params;
  try {
    const data = await redisClient.lRange(episode, 0, -1);
    res.send(JSON.stringify(data));
  } catch (error) {
    res.send("Error al listar los personajes:", error);
  }
});

app.post("/create", (req, res) => {
  const { episode, character } = req.body;
  try {
    redisClient.lPush(episode, [character]);
    res.send("Personaje creado");
  } catch (error) {
    res.send("Error al cargar el personaje:", error);
  }
});

app.delete("/delete", (req, res) => {
  const { episode, character } = req.body;
  try {
    redisClient.lRem(episode, 1, character);
    res.send("Personaje eliminado");
  } catch (error) {
    res.send("Error al eliminar el personaje:", error);
  }
});

app.listen(app.get("port"), () => {
  console.log("Listening on port ");
});

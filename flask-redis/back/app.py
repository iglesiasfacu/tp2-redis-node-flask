from flask import Flask, render_template, request
from redis import Redis
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def connect_db():
  conection = Redis(host='flask-redis-db', port=6379, decode_responses=True)
  if(conection.ping()):
    print('Conectado a redis')
  else:
    print('Error al conectarse a redis')
  return conection

@app.route('/')
def index():
  return 'Api flask con redis'

@app.route("/initializeDb", methods=["POST"])
def initializeDb():
  if request.method == "POST":
    redisDb = connect_db()

    redisDb.select(0)
    redisDb.set("ch1", "Chapter 1 - The Mandalorian")
    redisDb.set("ch2", "Chapter 2 - The Child")
    redisDb.set("ch3", "Chapter 3 - The Sin")
    redisDb.set("ch4", "Chapter 4 - Sanctuary")
    redisDb.set("ch5", "Chapter 5 - The Gunslinger")
    redisDb.set("ch6", "Chapter 6 - The Prisoner")
    redisDb.set("ch7", "Chapter 7 - The Reckoning")
    redisDb.set("ch8", "Chapter 8 - Redemption")

    redisDb.select(1)
    redisDb.set("ch1", "available")
    redisDb.set("ch2", "available")
    redisDb.set("ch3", "available")
    redisDb.set("ch4", "available")
    redisDb.set("ch5", "available")
    redisDb.set("ch6", "available")
    redisDb.set("ch7", "available")
    redisDb.set("ch8", "available")
  return "ok"

@app.route("/listChapters")
def listChapters():
  redisDb = connect_db()

  redisDb.select(0)
  keys = redisDb.keys('*')
  keys.sort()
  chapters = {}

  for i in keys:
    chapters[str(i)] = redisDb.get(i)
  
  return json.dumps(chapters)

@app.route("/listStatus")
def listStatus():
  chapters_keys=["ch1","ch2","ch3","ch4","ch5","ch6","ch7","ch8"]

  redisDb = connect_db()

  redisDb.select(1)
  keys = redisDb.keys('*')
  status = {}
  
  for chapters_key in chapters_keys:
    if chapters_key not in keys:
      redisDb.set(chapters_key, "available")

  update_keys = redisDb.keys('*')
  
  for i in update_keys:
    status[str(i)]=redisDb.get(i) 

  return json.dumps(status)

@app.route("/rentChapter", methods=["POST"])
def rentChapter():
    if request.method == "POST":
        print(request.args["keyChapter"])
        conexion = connect_db()
        conexion.select(1)
        conexion.setex(request.args["keyChapter"], 240, "reserved")
    return "ok"

@app.route("/confirmRent", methods=["POST"])
def confirmRent():
    if request.method == "POST":
        print(request.args["keyChapter"])
        conexion = connect_db()
        conexion.select(1)
        conexion.setex(request.args["keyChapter"], 86400, "rented")
    return "ok"

if __name__ == '__main__':
  app.run(host='localhost', port='5000', debug=True)
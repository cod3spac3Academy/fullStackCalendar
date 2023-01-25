const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const cors = require("cors");
// importar las rutas
const logins = require("./routes/loginRoutes");
const events = require("./routes/eventRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));

app.use("/auth", logins);
app.use("/events", events);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
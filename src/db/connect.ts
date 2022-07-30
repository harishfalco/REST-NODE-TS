import mongoose , {ConnectOptions}from "mongoose";
import log from "../logger";
import config from "config";

function connect() {

    const URL = config.get("dbUri") as string;

    return mongoose.connect(URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    } as ConnectOptions )
    .then(() => log.info(`DB connected`))
    .catch((err) => log.error(`An error occured : ${err}`))
}

export default connect;
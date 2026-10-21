import mongoose from "mongoose";

function dbconnection() {
    const DB_URL = "mongodb+srv://sameerprivate436_db_user:yLV5AbRXZQbQ7XgS@cluster0.3irprsm.mongodb.net/TODO-DATA"
    const db = mongoose.connect(DB_URL);
    db.then((data) =>
        console.log("data", data.connection._connectionString)
    ).catch((error) => console.log("error", error)
    )
}
export default dbconnection
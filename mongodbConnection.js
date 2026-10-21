import mongoose from "mongoose";

function dbconnection() {
    const DB_URL = "mongodb+srv://sameerprivate436_db_user:JelVBWeDIXRNWv1j@cluster0.3irprsm.mongodb.net/"
    const db = mongoose.connect(DB_URL);
    db.then((data) =>
        console.log("data", data.connection._connectionString)
    ).catch((error) => console.log("error", error)
    )
}
export default dbconnection
import express, { request } from "express";
import TodoModel from "./todoModel.js";
import dbconnection from "./mongodbConnection.js";
import cors from "cors"


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

dbconnection();


app.get("/", (request, response) => {
    response.send("server is active");
});


// ==================  TODO GET REQUEST
app.get("/todo", async (request, response) => {
    try {

        const limit = request.query.limit || 10;
        const page = request.query.page || 1;

        const q = request.query.search;
        const query = !q ? {} : { title: { $regex: q, $options: "i" } };

        const skip = (page - 1) * limit;

        console.log(query)
        const todos = await TodoModel.find(query).skip(skip).limit(limit);
        const totalDocumentcount = await TodoModel.countDocuments(query);
        response.status(200).json({ todos, totalDocumentcount })
    } catch (error) {
        response.status(500).json({ message: `error${error}` })
    }
});


app.get("/todo/:id", async function (req, res) {
    try {
        const todoId = req.params.id;

        const todos = await TodoModel.findById(todoId);

        res.status(200).json({ todos });

    } catch (error) {
        res.status(500).json({ message: `Error:${error}` });
    }
});

// =====================  TODO POST REQUEST
app.post("/todo", async (request, response) => {
    try {
        const payload = request.body;
        console.log(payload);
        const newTodo = await TodoModel.create(payload);
        const todo = await newTodo.save();
        response.status(201).json({ message: "todo created succesfully" })
    } catch (error) {
        response.status(500).json({ message: "internal server error", error })
    }
});

// =========================== TODO PUT REQUEST 
app.put("/todo/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const payload = request.body;

        const todo = await TodoModel.findByIdAndUpdate(id, payload, { new: true });
        if (!todo) {
            return response.status(404).json({ message: "todo not found" })
        }
        response.status(200).json({ message: "todo updated succesfully" })
    } catch (error) {
        response.status(500).json({ message: `error${error}` })
    }
});

// ==================================== TODO DELETE REQUEST

app.delete("/todo/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const todo = await TodoModel.findByIdAndDelete(id);

        if (!todo) {
            return response.status(404).json({ message: "todo not found for given id" })
        };

        response.status(200).json({ message: "todo deleted succesfully" })
    } catch (error) {
        response.status(500).json({ message: `error${error}` })
    }

});

app.listen(8080, (error) => {
    console.log("server active on port 8080");

})
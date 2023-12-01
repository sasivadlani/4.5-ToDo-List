import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// let todayList = [];
// let workList = [];

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
    name: String
};

const TodayTask = mongoose.model("TodayTask", itemSchema);

const CompltedTodayTask = mongoose.model("CompltedTodayTask", itemSchema);

const task1 = new TodayTask({
    name: "This Task"
});

const task2 = new TodayTask({
    name: "That Task"
});

const task3 = new TodayTask({
    name: "Task"
});

const defaultTodayTasks = [task1, task2, task3];

// TodayTask.insertMany(defaultTodayTasks);

app.get("/", (req, res) => {
    TodayTask.find({})
    .then((documents) => {
        // console.log(documents);
      res.render("index.ejs", { tasks: documents });
    });
});

app.post("/addtask", (req, res) => {
    const text = req.body.todaytask;

    const newTodayTask = new TodayTask({name: text});
    newTodayTask.save();
    // todayList.push({ text, isCompleted: false });
    res.redirect("/");
});

app.post("/deletetask", (req, res) => {
    // console.log(req.body.taskcompletion);
    const checkedtaskid = req.body.taskcompletion;
    // const completedtask = new CompltedTodayTask({name: })

    const task = TodayTask.findById(checkedtaskid);
    
    const completedtask = new CompltedTodayTask({name: task.name});
    
    completedtask.save();
    TodayTask.findByIdAndDelete(checkedtaskid).catch((err) =>{
        console.log(err);
    });


    // TodayTask.findByIdAndDelete(checkedtaskid).catch((err) =>{
    //     console.log(err);
    // });
    // const newTodayTask = new TodayTask({name: text});
    // newTodayTask.save();
    // // todayList.push({ text, isCompleted: false });
    res.redirect("/");
});

app.listen(port, (req, res) => {
    console.log(`Listening in port ${port}`);
});

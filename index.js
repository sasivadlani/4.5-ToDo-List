import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let todayList = [];
let workList = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { tasks: todayList });
});

app.post("/addtask", (req, res) => {
    const text = req.body.todaytask;
    todayList.push({ text, isCompleted: false });
    res.redirect("/");
});

app.get("/workpage", (req, res) => {
    res.render("worktasks.ejs", { wtasks: workList });
});

app.post("/work", (req, res) => {
    const wtext = req.body.worktask;

    workList.push({wtext, isCompleted: false});
    // console.log(workList);
    res.redirect("/workpage");
})

app.listen(port, (req, res) => {
    console.log(`Listening in port ${port}`);
});

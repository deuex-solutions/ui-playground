const express = require("express");
const Router = express.Router();
const DB = require("./DB");
const ObjectId = require("mongodb").ObjectId;

Router.post("/join", (req, res) => {
  const { quizId, uid } = req.body;
  if (!quizId || !uid)
    return res.status(500).json({ error: "Incomplete Parameters" });

  DB.withDB(async (db) => {
    try {
      const cursor = db
        .collection("quizzes")
        .find({ _id: new ObjectId(quizId) })
        .project({
          responses: 0,
          "questions.options.isCorrect": 0,
        });

      const quizData = await cursor.toArray();
      if (!quizData[0].isOpen)
        res.status(500).json({ error: "ERR:QUIZ_ACCESS_DENIED" });
      else {
        const cursor2 = db.collection("users").find({
          $and: [{ uid }, { attemptedQuiz: ObjectId(quizId) }],
        });

        const quiz2 = await cursor2.toArray();
        if (quiz2[0]) {
          console.log("quiz already attempted");
          res.status(200).json({
            error: "ERR:QUIZ_ALREADY_ATTEMPTED",
          });
        } else res.status(200).json(quizData[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "ERR:QUIZ_NOT_FOUND" });
    }
  }, res);
});

Router.post("/submit", (req, res) => {
  const quiz = req.body;
  if (!quiz) return res.status(500).json({ error: "Incomplete Parameters" });
  DB.submitQuiz(quiz, res);
});

Router.post("/create", (req, res) => {
  const quiz = req.body;
  if (!quiz) return res.status(500).json({ error: "Incomplete Parameters" });

  quiz.questions.forEach((question, i) => {
    question["id"] = i + 1;
  });
  DB.createQuiz(quiz, res);
});

Router.post("/edit", (req, res) => {
  const { quizId, uid, title, questions, isOpen } = req.body;

  DB.withDB(async (db) => {
    try {
      await db.collection("quizzes").updateOne(
        {
          $and: [{ uid }, { _id: ObjectId(quizId) }],
        },
        {
          $set: {
            title,
            questions,
            isOpen,
          },
        },
        (err, result) => {
          if (err) throw err;
          res.status(200).json({
            message: "Quiz Updated Successfully.",
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

Router.post("/responses", (req, res) => {
  const reqBody = req.body;
  DB.getResponses(reqBody, res);
});

Router.post("/admin/responses", (req, res) => {
  const reqBody = req.body;
  DB.getQuizDetails(reqBody, res);
});
module.exports = Router;

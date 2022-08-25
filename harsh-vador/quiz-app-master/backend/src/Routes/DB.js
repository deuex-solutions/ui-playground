const MongoClient = require("mongodb");
const Evaluate = require("../Logic/EvaluateQuiz");
const ObjectId = require("mongodb").ObjectId;
const API_KEY = require("../db-config").database;

const DBStart = async () => {
  console.log("DB server connecting...");
  const client = await MongoClient.connect(API_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db("quiz-app");
};
DBStart();
const withDB = async (operations, res) => {
  try {
    await operations(db);
    // client.close()
  } catch (error) {
    console.log("Error connecting to DB : ", error);
    res.status(500).json({ message: "Error Connecting to db ", error });
  }
};

const createUser = async (uid, name, email, res) => {
  await withDB(async (db) => {
    const user = await db.collection("users").findOne({ uid: uid });
    if (!user) {
      const result = await db.collection("users").insertOne({
        uid,
        name,
        email,
        createdQuiz: [],
        attemptedQuiz: [],
      });
      res.status(200).json({ message: "User Created successfully." });
    } else {
      res.status(200).json({ message: "User Record Exist" });
    }
  });
};

const createQuiz = async (quiz, res) => {
  try {
    await withDB(async (db) => {
      quiz["responses"] = [];
      const result = await db.collection("quizzes").insertOne(quiz);
      res.status(200).json({
        message: "Quiz created successfully",
        quizId: result.insertedId,
      });
      const query = { uid: quiz.uid };
      const addQuiz = {
        $push: { createdQuiz: result.insertedId },
      };
      await db.collection("users").updateOne(query, addQuiz);
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
    console.log("Error : ", error);
  }
};

const submitQuiz = async (submittedQuiz, res) => {
  withDB(async (db) => {
    try {
      // Check whether the user has already submitted the Quiz
      const validationCursor = db.collection("users").find({
        $and: [
          { uid: submittedQuiz.uid },
          { attemptedQuiz: ObjectId(submittedQuiz.quizId) },
        ],
      });
      const quizData = await validationCursor.toArray();
      const email = submittedQuiz.email;

      // If the quiz is already submitted, DONOT submit it.
      if (quizData[0]) {
        console.log("quiz already attempted");
        return res.status(200).json({
          error: "ERR:QUIZ_ALREADY_ATTEMPTED",
        });
      }
      const cursor = db
        .collection("quizzes")
        .find({ _id: new ObjectId(submittedQuiz.quizId) })
        .project({ questions: 1 });

      const quiz = await cursor.toArray();

      console.log("in quiz store");
      const score = Evaluate(quiz[0].questions, submittedQuiz.questions);
      res.status(200).json({ score });

      // Update in quizzes responses
      await db.collection("quizzes").updateOne(
        { _id: new ObjectId(submittedQuiz.quizId) },
        {
          $push: {
            responses: { uid: submittedQuiz.uid, score: score, email },
          },
        }
      );
      // Update user's attempted quizzes
      await db.collection("users").updateOne(
        { uid: submittedQuiz.uid },
        {
          $push: {
            attemptedQuiz: ObjectId(submittedQuiz.quizId),
          },
        }
      );
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error });
    }
  });
};

const getResponses = (obj, res) => {
  withDB(async (db) => {
    const cursor = db
      .collection("quizzes")
      .find({ _id: new ObjectId(obj.quizCode), uid: obj.uid })
      .project({ responses: 1 });
    const cursorData = await cursor.toArray();
    const responses = cursorData[0].responses;
    res.status(200).json({ responses });
  }, res);
};

const getQuizDetails = (obj, res) => {
  withDB(async (db) => {
    const getquiz = db
      .collection("quizzes")
      .find({ _id: new ObjectId(obj.quizCode) })
      .project({ responses: 1 });
    const data = await getquiz.toArray();
    const responses = data[0].responses;
    res.status(200).json({ responses });
  }, res);
};

module.exports.withDB = withDB;
module.exports.createUser = createUser;
module.exports.createQuiz = createQuiz;
module.exports.submitQuiz = submitQuiz;
module.exports.getResponses = getResponses;
module.exports.getQuizDetails = getQuizDetails;

import React, { useState, useEffect } from "react";
import "./AdminDashBoard.css";
import CreatedQuizCard from "../../components/QuizCard/CreatedQuizCard";
import JoinedQuizCard from "../../components/QuizCard/JoinedQuizCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CreateQuiz from "../CreateQuiz/CreateQuiz";

const AdminDashBoard = ({ user }) => {
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editQuiz, setEditQuiz] = useState([]);
  useEffect(() => {
    if (!user.uid) {
      setLoading(false);
      return;
    }
    const fetchQuizData = async () => {
      const results = await fetch(`/API/users/${user.uid}`);
      const quizData = await results.json();
      if (quizData.createdQuiz) setCreatedQuizzes(quizData.createdQuiz);
      if (quizData.attemptedQuiz) setAttemptedQuizzes(quizData.attemptedQuiz);
      setLoading(false);
    };
    if (user) fetchQuizData();
  }, [user]);

  const editQuizHandle = async (title, questions, isOpen) => {
    if (!title) setEditQuiz([]);
    else {
      setLoading(true);
      console.dir({
        quizId: createdQuizzes[editQuiz]._id,
        uid: user.uid,
        title,
        questions,
        isOpen,
      });
      const results = await fetch("/API/quizzes/edit", {
        method: "POST",
        body: JSON.stringify({
          quizId: createdQuizzes[editQuiz]._id,
          uid: user.uid,
          title,
          questions,
          isOpen,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const submitData = await results.json();
      console.dir(submitData);
      const temp = [...createdQuizzes];
      temp[editQuiz[0]].title = title;
      temp[editQuiz[0]].questions = questions;
      temp[editQuiz[0]].isOpen = isOpen;
      setCreatedQuizzes(temp);
      setEditQuiz([]);
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  if (editQuiz.length)
    return (
      <CreateQuiz
        user={user}
        quizTitle={createdQuizzes[0].title}
        questions={createdQuizzes[0].questions}
        isOpen={createdQuizzes[0].isOpen}
        editQuizHandle={editQuizHandle}
      />
    );
  return (
    <div className="dash-body">
      <div className="quizzes">
        <div className="heading">
          <div className="line-left" />
          <h2>All Quiz </h2>
          <div className="line" />
        </div>
        <div className="card-holder">
          {createdQuizzes.map((quiz, key) => (
            <>
              <CreatedQuizCard
                key={key}
                index={key}
                setEditQuiz={setEditQuiz}
                title={quiz.title}
                code={quiz._id}
                responses={quiz.responses}
                questions={quiz.questions?.length}
                isOpen={quiz.isOpen}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;

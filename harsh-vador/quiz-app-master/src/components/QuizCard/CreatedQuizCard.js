import { IconButton } from "@material-ui/core";
import { EditRounded } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./QuizCard.css";
import firebase from "../../firebase/firebase";

const CreatedQuizCard = ({
  title,
  responses,
  code,
  questions,
  isOpen,
  index,
  setEditQuiz,
}) => {
  const name = firebase.auth().currentUser.displayName;
  return (
    <div className="quiz-card">
      <div>
        <h1 id="created-quiz-title">{title}</h1>
        <p className="card-code">Code: {code}</p>
      </div>
      <div id="horizontal-line"></div>
      <div id="row">
        {name == "Admin" && (
          <div id="responses">
            <Link to={`/responses/${code}`} style={{ fontWeight: "bold" }}>
              Responses : {Number(responses?.length || "0")}
            </Link>
          </div>
        )}
        <div id="questions">Questions : {questions}</div>
      </div>
      <div className="bottom-bar">
        {isOpen ? <div id="open">Active</div> : <div id="closed">Inactive</div>}
        <a href={`/attempt-quiz/${code}`} style={{ textDecoration: "none" }}>
          Attempt Quiz
        </a>
        {name == "Admin" && (
          <IconButton onClick={() => setEditQuiz([index])}>
            <EditRounded />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default CreatedQuizCard;

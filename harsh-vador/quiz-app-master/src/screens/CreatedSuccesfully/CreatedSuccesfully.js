import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatedSuccesfully.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import firebase from "../../firebase/firebase";

const CreatedSuccesfully = ({ match }) => {
  const [Copy, setCopy] = useState("copy");
  const name = firebase.auth().currentUser.displayName;

  return (
    <div id="created-quiz">
      <div id="created-quiz-div">
        <div id="message">
          <h2 className="b">Quiz Created Successfully!</h2>
          <p>Share the follwong code</p>
        </div>
        <input
          type="text"
          id={Copy}
          value={match.params.quizCode}
          disabled={true}
        />
        <CopyToClipboard
          text={match.params.quizCode}
          onCopy={() => {
            setCopy("copied");
          }}
        >
          <button className="button wd-200">
            {Copy === "copy" ? "Copy Code" : "Code Copied!"}
          </button>
        </CopyToClipboard>
        {name == "Admin" ? (
          <Link to={"/view-quiz"}>
            <button className="button wd-200">Dashboard</button>
          </Link>
        ) : (
          <Link to={"/dashboard"}>
            <button className="button wd-200">Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default CreatedSuccesfully;

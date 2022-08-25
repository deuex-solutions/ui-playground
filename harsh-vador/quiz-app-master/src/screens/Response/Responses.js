import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import firebase from "../../firebase/firebase";
import ResponsesTable from "../../components/ResponsesTable";

const Responses = ({ match }) => {
  const quizId = match.params.quizCode;
  const uid = firebase.auth().currentUser.uid;
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);

  const getResponses = async () => {
    const res = await fetch("/API/quizzes/responses", {
      method: "POST",
      body: JSON.stringify({ quizCode: quizId, uid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setResponses(result.responses);
    setLoading(false);
  };
  const getAdminResponse = async () => {
    const res = await fetch("/API/quizzes/admin/responses", {
      method: "POST",
      body: JSON.stringify({ quizCode: quizId, uid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setResponses(result.responses);
    setLoading(false);
  };

  useEffect(() => {
    uid !== "uixUNnZ64VWMLcnQ4IDqkDmsNzE2"
      ? getResponses()
      : getAdminResponse();
  }, [quizId, uid]);
  if (loading) return <LoadingScreen />;
  else
    return (
      <div className="margin-top">
        <h2 style={{ color: "var(--accent-bhagwa)" }}>Responses</h2>
        <ResponsesTable responses={responses} />
      </div>
    );
};

export default Responses;

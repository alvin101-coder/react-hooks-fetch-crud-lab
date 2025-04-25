import React from "react";

function QuestionItem({ question, setQuestions, questions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={(e) => {
            fetch(`http://localhost:4000/questions/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                correctIndex: +e.target.value,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                const newQuestions = questions.map((questSus) => {
                  if (questSus.id === id) {
                    return { ...questSus, correctIndex: +e.target.value };
                  } else {
                    return questSus;
                  }
                });
                setQuestions(newQuestions);
                console.log(question);
              });
          }}
        >
          {options}
        </select>
      </label>
      <button
        onClick={(event) => {
          fetch(`http://localhost:4000/questions/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              const remainingQuestions = questions.filter(
                (quest) => quest.id !== id
              );
              setQuestions(remainingQuestions);
              console.log(data);
              console.log(questions);
            });
        }}
      >
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
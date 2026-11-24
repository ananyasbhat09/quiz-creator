
"use client";

import { useState, useEffect } from "react";
import { saveQuestion, getQuestions, deleteQuestion } from "../quizManager";

export default function QuizCreator() {
  const [question, setQuestion] = useState("");
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [D, setD] = useState("");
  const [correct, setCorrect] = useState("A");
  const [questions, setQuestions] = useState([]);

  async function loadQuestions() {
    const data = await getQuestions();
    setQuestions(data);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      question,
      optionA: A,
      optionB: B,
      optionC: C,
      optionD: D,
      correctAnswer: correct
    };

    try {
      await saveQuestion(data);
      alert("Question saved!");

      setQuestion("");
      setA("");
      setB("");
      setC("");
      setD("");
      setCorrect("A");

      loadQuestions();
    } catch (error) {
      console.log(error);
      alert("Error saving question");
    }
  }
  async function handleDelete(id) {
  try {
    await deleteQuestion(id);
    await loadQuestions();
    alert("Question deleted!");
  } catch (error) {
    console.log(error);
    alert("Error deleting question");
  }
}

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Quiz Creator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border p-2 w-full" placeholder="Enter Question"
          value={question} onChange={e => setQuestion(e.target.value)} required />

        <input className="border p-2 w-full" placeholder="Option A"
          value={A} onChange={e => setA(e.target.value)} required />

        <input className="border p-2 w-full" placeholder="Option B"
          value={B} onChange={e => setB(e.target.value)} required />

        <input className="border p-2 w-full" placeholder="Option C"
          value={C} onChange={e => setC(e.target.value)} required />

        <input className="border p-2 w-full" placeholder="Option D"
          value={D} onChange={e => setD(e.target.value)} required />

        <select className="border p-2 w-full"
          value={correct} onChange={e => setCorrect(e.target.value)}>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>

        <button className="bg-blue-600 text-white p-3 w-full rounded">
          Save Question
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Saved Questions
      </h2>

      {questions.map((q, index) => (
        <div key={q.id} className="border p-4 mb-4 rounded">
          <h3 className="font-bold">{index + 1}. {q.question}</h3>
          <p>A. {q.optionA}</p>
          <p>B. {q.optionB}</p>
          <p>C. {q.optionC}</p>
          <p>D. {q.optionD}</p>
          <p className="text-green-700 font-bold">
            Correct Answer: Option {q.correctAnswer}
            <button
  onClick={() => handleDelete(q.id)}
  className="bg-red-600 text-white px-3 py-2 rounded mt-2"
>
  Delete
</button>
          </p>
        </div>
      ))}
    </div>
  );
}

import { ref, push, set, get, remove } from "firebase/database";
import { database } from "./firebaseConfig";

// Save a new question
export async function saveQuestion(data) {
  const questionRef = push(ref(database, "quiz-questions"));
  await set(questionRef, data);
}

// Fetch all saved questions
export async function getQuestions() {
  const questionRef = ref(database, "quiz-questions");
  const snapshot = await get(questionRef);

  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...data
    }));
  }

  return [];
}


export async function deleteQuestion(id) {
  const questionRef = ref(database, `quiz-questions/${id}`);
  await remove(questionRef);
}

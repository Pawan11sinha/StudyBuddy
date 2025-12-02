import { apiConnector } from "../apiconnector";
import { quizEndpoints } from "../apis";

const { QUIZ_RANDOM_API, QUIZ_ATTEMPT_API, QUIZ_HISTORY_API } = quizEndpoints;

export const getRandomQuiz = (token, category, difficulty, limit = 10) => {
  const url =
    `${QUIZ_RANDOM_API}?category=${encodeURIComponent(category)}` +
    `&difficulty=${encodeURIComponent(difficulty)}` +
    `&limit=${limit}`;

  return apiConnector(
    "GET",
    url,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const saveQuizAttempt = (token, payload) => {
  return apiConnector(
    "POST",
    QUIZ_ATTEMPT_API,
    payload,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const getQuizHistory = (token) => {
  return apiConnector(
    "GET",
    QUIZ_HISTORY_API,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

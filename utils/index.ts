import {
  AnswerResponse,
  AnswersResponse,
  CommentInput,
  CommentResponse,
  ErrorResponse,
  QuestionResponse,
  QuestionsResponse,
} from "@/types";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getQuestions: () => Promise<
  QuestionsResponse & ErrorResponse
> = async () => {
  try {
    const res = await fetch(`${API_URL}/questions?sort[0]=updatedAt:asc`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    console.log("🚀 ~ getQuestions ~ data", data);

    return data;
  } catch (error) {
    console.log("🚨 ~ getQuestions", error);
    return {
      error: { message: "Unable to fetch questions" },
    };
  }
};

const createQuestion = async (question: {
  qText: string;
  user: string;
}): Promise<QuestionResponse & ErrorResponse> => {
  console.log("🚀 ~ createQuestion ~ question", question);

  try {
    const res = await fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          qText: question.qText,
          user: question.user,
        },
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("🚨 ~ createQuestion", error);
    return {
      error: { message: "Unable to create question" },
    };
  }
};

const getComments = async (answer: string) => {
  try {
    const res = await fetch(
      `${API_URL}/comments?populate=*&filters[answer][documentId]=${answer}&sort[0]=updatedAt:asc`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        cache: "no-store",
      },
    );
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ getComments", error);
    return {
      error: { message: "Unable to fetch comments" },
    };
  }
};

const createComment: (
  comment: CommentInput,
) => Promise<CommentResponse & ErrorResponse> = async ({
  cText,
  user,
  answer,
}: CommentInput) => {
  try {
    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: { cText, user, answer } }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ createComment", error);
    return {
      error: { message: "Unable to create comment" },
    };
  }
};

const createAnswer = async (answer: {
  aText: string;
  user: string;
  questionId: string;
}): Promise<AnswerResponse & ErrorResponse> => {
  console.log("🚀 ~ createAnswer ~ answer", answer);

  try {
    const res = await fetch(`${API_URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          aText: answer.aText,
          user: answer.user,
          question: answer.questionId,
        },
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("🚨 ~ createAnswer", error);
    return {
      error: { message: "Unable to create answer" },
    };
  }
};

const getQuestion: (
  id: string,
) => Promise<QuestionResponse & ErrorResponse> = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/questions/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ getQuestion", error);
    return {
      error: { message: "Unable to fetch question" },
    };
  }
};

const getAnswers: (
  question: string,
) => Promise<AnswersResponse & ErrorResponse> = async (question: string) => {
  try {
    const res = await fetch(
      `${API_URL}/answers?populate=*&filters[question][documentId]=${question}&sort[0]=createdAt:asc`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        cache: "no-store",
      },
    );
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ getAnswers", error);
    return {
      error: { message: "Unable to fetch answers" },
    };
  }
};

export {
  getQuestion,
  getQuestions,
  createQuestion,
  getAnswers,
  createAnswer,
  getComments,
  createComment,
};

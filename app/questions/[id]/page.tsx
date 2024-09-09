// ./questions/[id]/page.tsx

import AnswerCard from "@/components/Answer/Card";
import AnswerForm from "@/components/Answer/Form";
import { getAnswers, getQuestion } from "@/utils";
import Link from "next/link";

const QuestionPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  // get the question id from the path
  const id = params.id;
  // fetch the question and answers
  const question = await getQuestion(id as string);
  const answers = await getAnswers(id as string);
  return (
    <main>
      {id && question.data ? (
        <>
          <header className="bg-stone-50 px-4 py-12 dark:bg-stone-900 lg:px-6">
            <div className="wrapper mx-auto max-w-3xl">
              <h1 className="mb-2 text-4xl font-black leading-tight">
                {question.data.qText}
              </h1>
              <p>
                Asked by {question.data.user} on{" "}
                {new Date(question.data.createdAt).toDateString()}
              </p>
            </div>
          </header>
          <section className="site-section bg-sla px-4 py-12 lg:px-6">
            <div className="wrapper mx-auto max-w-3xl">
              <AnswerForm id={id} />
            </div>
          </section>
          <section className="site-section px-4 py-12 lg:px-6">
            <div className="wrapper mx-auto max-w-3xl">
              <header className="section-header mb-8">
                <h2 className="text-2xl">Answers</h2>
              </header>
              <ul className="flex flex-col gap-4">
                {answers?.data?.length ? (
                  answers?.data?.map((answer) => (
                    <li className="" key={answer?.documentId}>
                      <AnswerCard answer={answer} />
                    </li>
                  ))
                ) : (
                  <p>No answers yet. Be the first!</p>
                )}
              </ul>
            </div>
          </section>
        </>
      ) : (
        <header className="bg-stone-50 px-4 py-12 dark:bg-stone-900 lg:px-6">
          <div className="wrapper mx-auto max-w-3xl">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              Oops! Question not found
            </h1>
            <Link className="underline" href="/">
              Maybe you&apos;d like to ask a question?
            </Link>
          </div>
        </header>
      )}
    </main>
  );
};

export default QuestionPage;

/* eslint-disable import/order */
import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import HomeFilter from "@/components/HomeFilter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestion, getQuestions } from "@/lib/actions/question.action";
import { api } from "@/lib/api";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";

interface SearchParams {
  searchParams: Promise<{ [Key: string]: string }>;
}
// const questions = [
//   {
//     _id: "1",
//     title: "What is React?",
//     description:
//       "I'm new to frontend development. Can someone explain what React is and why it's so popular?",
//     tags: [
//       { _id: "1", name: "React" },
//       { _id: "2", name: "JavaScript" },
//     ],
//     author: {
//       _id: "1",
//       name: "John Doe",
//       image:
//         "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
//     },
//     upvotes: 10,
//     answers: 5,
//     views: 100,
//     createdAt: new Date(),
//   },
//   {
//     _id: "2",
//     title: "How to learn JavaScript?",
//     description: "I want to learn JavaScript, can anyone help me?",
//     tags: [
//       { _id: "2", name: "JavaScript" },
//       { _id: "1", name: "React" },
//     ],
//     author: {
//       _id: "1",
//       name: "John Doe",
//       image:
//         "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
//     },
//     upvotes: 10,
//     answers: 5,
//     views: 100,
//     createdAt: new Date(),
//   },
// ];
// const test = async () => {
//   try {
//     // await dbConnect();
//     // throw new Error("Test error");
//     // throw new ValidationError({
//     //   title: ["Required"],
//     //   tags: ['"JavaScript" is not a valid tag.'],
//     // });
//     return await api.users.getAll();
//   } catch (error) {
//     return handleError(error);
//   }
// };

export default async function Home({ searchParams }: SearchParams) {
  // const session = await auth();
  // console.log("Session: ", session);

  const { query, filter, page, pageSize } = await searchParams;
  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};
  // const filteredQuestions = questions.filter((question) => {
  //   const matchesQuery = question.title
  //     .toLowerCase()
  //     .includes(query.toLowerCase());
  //   const matchesFilter = filter
  //     ? question.tags[0].name.toLowerCase() === filter
  //     : true;
  //   return matchesQuery && matchesFilter;
  // });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}> Ask a Questions</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />

      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
      {/* {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      )} */}
    </>
  );
}

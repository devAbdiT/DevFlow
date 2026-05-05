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
          iconPosition="left"
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
    </>
  );
}

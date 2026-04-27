"use client";
/* eslint-disable import/order */
import React, { useRef, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "../ui/form";
import { CardContent } from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import TagCard from "../cards/TagCard";
import { z } from "zod";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface Params {
  question?: Question;
  isEdit?: boolean;
}
const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();
      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };
  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);
    if (newTags.length === 0) {
      form.setError("tags", { type: "manual", message: "Tags are required" });
    }
  };
  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    // console.log(data);
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question?._id,
          ...data,
        });

        if (result.success) {
          toast.success("Success", {
            description: "Question Updated successfully",
          });
          if (result.data) router.push(ROUTES.QUESTION(result.data?._id));
        } else {
          toast.error(`Error ${result.status}`, {
            description: result.error?.message || "Something went wrong",
          });
        }
        return;
      }
      const result = await createQuestion(data);

      if (result.success) {
        toast.success("Success", {
          description: "Question created successfully",
        });
        if (result.data) router.push(ROUTES.QUESTION(result.data?._id));
      } else {
        toast.error(`Error ${result.status}`, {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form
        action=""
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col"
            >
              <FieldLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="form-rhf-input-username"
              >
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] rounded-1.5 border w-ful"
              />
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person
              </FieldDescription>
            </Field>
          )}
        />

        <FormField
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col"
            >
              <FieldLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="form-rhf-input-username"
              >
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>
              <FormControl>
                <Editor
                  editorRef={editorRef}
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FieldDescription>
            </Field>
          )}
        />
        <FormField
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col gap-3"
            >
              <FieldLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="form-rhf-input-username"
              >
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] rounded-1.5 border w-full"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {" "}
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to descripe what your question is about. You
                need to press enter to add a tag.
              </FieldDescription>
            </Field>
          )}
        />
        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient w-fit !text-light-900"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
              </>
            ) : (
              <>{isEdit ? "Edit" : "Ask A Question"} </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;

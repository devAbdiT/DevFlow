"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  // zodResolver	A bridge between Zod and React Hook Form

  // const handleSubmit: SubmitHandler<T> = async (data) => {
  //   const result = (await onSubmit(data)) as ActionResponse;

  //   if (result?.success) {
  //     toast.success(
  //       formType === "SIGN_IN"
  //         ? "Signed in successfully"
  //         : "Signed up successfully"
  //     );
  //     router.push(ROUTES.HOME);
  //   } else {
  //     toast.error(`Error ${result?.status || "Unknown"}`, {
  //       description: result?.error?.message || "Something went wrong",
  //     });
  //   }
  // };

  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log("🔵 FORM SUBMIT STARTED. Data:", data); // ← ADD THIS

    const result = (await onSubmit(data)) as ActionResponse;
    console.log("🔵 RESULT from onSubmit:", result); // ← ADD THIS

    if (result?.success) {
      console.log("🔵 SUCCESS! Showing toast and redirecting"); // ← ADD THIS
      toast.success(
        formType === "SIGN_IN"
          ? "Signed in successfully"
          : "Signed up successfully"
      );
      router.push(ROUTES.HOME);
    } else {
      console.log("🔵 FAILURE! Error:", result?.error); // ← ADD THIS
      toast.error(`Error ${result?.status || "Unknown"}`, {
        description: result?.error?.message || "Something went wrong",
      });
    }
  };
  const buttonText = formType === "SIGN_IN" ? "Sign in" : "Sign up";

  return (
    <Fragment>
      <CardContent>
        <form
          id="form-rhf-input"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-10"
        >
          <FieldGroup>
            {Object.keys(defaultValues).map((field) => (
              <Controller
                key={field}
                name={field as Path<T>}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex w-full flex-col gap-2.5"
                  >
                    <FieldLabel
                      className="paragraph-medium text-dark400_light700"
                      htmlFor={`form-rhf-input-${field}`}
                    >
                      {field === "email"
                        ? "Email Address"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </FieldLabel>
                    <Input
                      required
                      type={field === "password" ? "password" : "text"}
                      {...controllerField}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                    {fieldState.invalid && fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-5 flex flex-col">
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="paragraph paragraph-medium min-h-12 rounded-2 px-4 py-3 font-inter !text-light-900"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="form-rhf-input"
            disabled={form.formState.isSubmitting}
            className="primary-gradient paragraph paragraph-medium min-h-12 rounded-2 px-4 py-3 font-inter !text-light-900"
          >
            {form.formState.isSubmitting
              ? buttonText === "Sign in"
                ? "Signing In..."
                : "Signing Up..."
              : buttonText}
          </Button>
        </Field>
        <div className="mt-4">
          {formType === "SIGN_IN" ? (
            <p>
              Don't have an account?{" "}
              <Link
                href={ROUTES.SIGN_UP}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href={ROUTES.SIGN_IN}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </CardFooter>
    </Fragment>
  );
};

export default AuthForm;

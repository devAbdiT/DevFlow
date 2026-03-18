"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {};
  const buttonText = formType === "SIGN_IN" ? "Sign in" : "Sign up";
  return (
    <Fragment>
      <CardContent>
        <form
          id="form-rhf-input"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-10
          space-y-6"
        >
          <FieldGroup>
            {Object.keys(defaultValues).map((field) => (
              <Controller
                key={field}
                name={field as Path<T>}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex w-full flex-col gap-2.5"
                  >
                    <FieldLabel
                      className="paragraph-medium text-dark400_light700"
                      htmlFor="form-rhf-input-username"
                    >
                      {field.name === "email"
                        ? "Email Address"
                        : field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                    </FieldLabel>
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      {...field}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-5">
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className=" paragraph paragraph-medium min-h-12 rounded-2 px-4 py-3 font-inter !text-light-900"
          >
            Reset
          </Button>
          <Button
            form="form-rhf-input"
            disabled={form.formState.isSubmitting}
            className="primary-gradient paragraph paragraph-medium min-h-12 rounded-2 px-4 py-3 font-inter !text-light-900"
          >
            {form.formState.isSubmitting
              ? buttonText === "Sign in"
                ? "Signin In..."
                : "Signing Up..."
              : buttonText}
          </Button>
        </Field>
      </CardFooter>
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
    </Fragment>
  );
};

export default AuthForm;

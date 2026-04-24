import { Button } from "@base-ui/react";
import { LogOut, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import NavLinks from "./navbar/NavLinks";

import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

const LeftSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks userId={userId} />
      </div>

      <div className="flex flex-col gap-3">
        {userId ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              className="base-medium w-fit !bg-transparent px-4 py-3 flex items-center gap-2"
            >
              <LogOut className="size-5 text-black dark:text-white" />
              <span className="max-lg:hidden text-dark300_light900">
                Logout
              </span>
            </Button>
          </form>
        ) : (
          <>
            <Link href={ROUTES.SIGN_IN}>
              <Button
                className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                asChild
              >
                <Image
                  src="/icons/account.svg"
                  alt="Account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  {" "}
                  Log In
                </span>
              </Button>
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <Button
                className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
                asChild
              >
                <Image
                  src="/icons/sign-up.svg"
                  alt="Account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSidebar;

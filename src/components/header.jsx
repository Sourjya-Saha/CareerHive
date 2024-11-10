import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, HeartIcon, PenBox } from "lucide-react";
const Header = () => {
  const [showSignIn, setSignIn] = useState(false);
  const  {user} = useUser();

  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    if (search.get("sign-in")) {
      setSignIn(true);
    }
  }, [search]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center sm:px-[50px] pr-[30px]">
        <Link>
          <div>
            {" "}
            <img src="/logo.png" className="h-[200px]" />{" "}
          </div>
        </Link>
        <div className="flex gap-8 mb-[23px]">
          <SignedOut>
            <div className="px-10">
              {" "}
              <Button variant="outline" onClick={() => setSignIn(true)}>
                Login
              </Button>
            </div>
          </SignedOut>
          <SignedIn>
            {/*add a condition here */}
            {user?.unsafeMetadata?.role==='recruiter' &&( <Link to="/post-job">
              <Button variant="destructive" className="rounded-full ">
                <PenBox size={20} className="mr-2" />
                Post a Job{" "}
              </Button>
            </Link>) }
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href="/my-jobs"
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<HeartIcon size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpFallbackRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;

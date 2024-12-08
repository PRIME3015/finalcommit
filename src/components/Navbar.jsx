import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Bookmark, BriefcaseBusiness, Heart, HomeIcon, PenBox } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  const navigate=useNavigate();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const clickHandler = () => {
   navigate("/");
  };

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 shadow-lg rounded-xl">
        <div className="logo">
          <span className="font-bold text-white text-2xl">TalentConnect</span>
        </div>
        
          <button onClick={clickHandler} className="ml-auto mr-2 text-zinc-50 text-xl sm:mr-7">
            <HomeIcon/>
          </button>
        <div className="flex items-center gap-6">
          <SignedOut>
            <Button
              variant="destructive"
              onClick={() => setShowSignIn(true)}
              className="text-white bg-red-600 hover:bg-red-700 transition duration-300"
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {/* PostJobs button only visible to recruiters */}
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/PostJobs">
                <Button
                  variant="outline"
                  className="text-slate-950 border-white hover:bg-white hover:text-teal-600 transition duration-300 px-4 py-2 rounded-full"
                >
                  <PenBox size={20} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:block">
                    Post a job</span>
                </Button>
              </Link>
            )}

            {/* User Profile Button with Dropdown */}
            <UserButton
              appearance={{ elements: { avatarBox: "w-12 h-12" } }}
              className="relative"
            >
              <UserButton.MenuItems className="absolute right-0 mt-2 bg-white text-gray-700 rounded-lg shadow-lg p-2">
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/MyJobs"
                  className="block px-4 py-2 rounded-lg hover:bg-teal-100 transition duration-200"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Bookmark size={20} stroke="blue"/>}
                  href="/SavedJobs"
                  className="block px-4 py-2 rounded-lg hover:bg-teal-100 transition duration-200"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

        </div>
      </nav>

      {/* Sign-In Modal */}

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlay}
        >
          <div className="bg-white p-4 rounded-lg">
            <SignIn
              signUpForceRedirectUrl="/OnBoarding"
              fallbackRedirectUrl="/OnBoarding"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

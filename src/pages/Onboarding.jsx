import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const Navigate = useNavigate();
  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        Navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.log("Error updating role:", err);
      });
  };
  useEffect(()=>{
    if(user?.unsafeMetadata?.role){
      Navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      )

    }
  },[user])
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        Join as a...
      </h2>
      <div className="mt-10 sm:mt-16 flex items-center justify-center gap-4 w-full md:px-40 px-20">
        <Button
          variant="blue"
          className="sm:h-[100px] sm:w-[250px] h-20 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="sm:h-[100px] sm:w-[250px] h-20  text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;

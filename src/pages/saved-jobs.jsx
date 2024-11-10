import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SavedJobs = () => {
  const { isLoaded } = useUser();
  const [page, setPage] = useState(1);
  const limit = 6; // Number of saved jobs per page

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs, {
    page,
    limit,
  });

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded, page]);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => prev + 1);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="sm:px-[100px] px-[30px]">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-[20px]">
            {savedJobs?.length ? (
              savedJobs?.map((saved) => (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobSaved={fnSavedJobs}
                  savedInit={true}
                />
              ))
            ) : (
              <div>No Saved Jobs 👀</div>
            )}
          </div>

          <Pagination >
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePreviousPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          </div>
       
      )}
    </div>
  );
};

export default SavedJobs;

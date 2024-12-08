import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use_fetch";
import { useUser } from "@clerk/clerk-react";
import { getCompanies } from "@/api/apiCompanies";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const { isLoaded } = useUser();

  // Job query
  const { fn: fnJobs, data: dataJobs = [], loading: loadingJobs } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  // Fetch job data when dependencies change
  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  // Search company query
  const { fn: fnCompanies, data: dataCompanies = [] } = useFetch(getCompanies);

  // Fetch company data when user is loaded
  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  // Form handlers
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    setSearchQuery(query || "");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompanyId("");
    setLocation("");
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  // Ensure dataJobs is valid before slicing
  const currentPosts = Array.isArray(dataJobs) ? dataJobs.slice(firstPostIndex, lastPostIndex) : [];

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Recent Jobs
      </h1>

      {/* Job Filter Form */}
      <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3">
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" variant="destructive" className="h-full sm:w-28">
          Search
        </Button>
      </form>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompanyId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataCompanies.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">
          Clear Filters
        </Button>
      </div>

      {/* Loading Indicator */}
      {loadingJobs && (
        <LoaderCircle className="h-10 animate-spin justify-items-center justify-center" />
      )}

      {/* Display Jobs */}
      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentPosts.length > 0 ? (
            currentPosts.map((job) => <JobCard key={job.id} job={job} saveInit={!!job.saved?.length} />)
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="pt-5">
        <PaginationSection
          totalPosts={dataJobs.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default JobListing;

function PaginationSection({ totalPosts, postsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} disabled={currentPage === 1} />
        </PaginationItem>
        {pageNumbers.map((page) => (
          <PaginationItem key={page} active={currentPage === page}>
            <PaginationLink onClick={() => setCurrentPage(page)}>{page}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} disabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

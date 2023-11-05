import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allCourse,
  enroll,
  allenroll,
  profile,
  search,
} from "../../Reducers/course.js";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const CourseList = () => {
  const dispatch = useDispatch();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
 
  const { coursesuccess, allCoursename, allenrollcourses } = useSelector(
    (state) => state.course
  );

  const { profiledetails, profilesuccess, searchsuccess, searchres } =
    useSelector((state) => state.course);

    useEffect(() => {
      dispatch(allCourse());
      dispatch(allenroll());
      dispatch(profile());
    }, [enrolledCourses]);
  
  const [searchresult2, setSearchResult2] = useState([]);
  const [searchresult, setSearchResult] = useState([]);
 
  useEffect(() => {
    // console.log(searchres, searchresult);
    setSearchResult2(searchres);
  }, [searchres]);
        
  useEffect(() => {
    setEnrolledCourses(allenrollcourses);
  }, [allenrollcourses]);

  const navigate = useNavigate();
   
  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };
   
  const handleEnrollClick = (id) => {

    dispatch(enroll(id));
 


  };

  const Logouthandle = () => {
    console.log('log');
    localStorage.clear();
    navigate("/");
  
   
  };

  const handleDash = () => {
    navigate("/dashboard");
  };
  const [searchText, setSearchText] = useState("");


  useEffect(() => { 
    // if (filteredCourses.length > 0) {
      setSearchResult(allCoursename);
    // }
  }, [allCoursename]);
  
  

  const handleSearch = () => {
    dispatch(search(searchText));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState(2);

  const handleCoursesPerPageChange = (e) => {
    const newCoursesPerPage = parseInt(e.target.value, 10);
    setCoursesPerPage(newCoursesPerPage);
    setCurrentPage(1);
  };

  const handleTotalPagesChange = (e) => {
    const newTotalPages = parseInt(e.target.value, 10);
    setTotalPages(newTotalPages);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative flex flex-col gap-3 w-screen h-screen">
      <div className="flex justify-between m-2 p-2">
        <span className="flex text-lg text-yellow-50  p-2 rounded-lg border bg-green-500 ">
          Name: {profiledetails[0]?.name}
        </span>
        <div className="flex items-center gap-4 w-1/3">
          <section className="rounded-lg border flex items-center justify-center w-full text-gray-900 relative">
            <input
              className="py-2 px-3 w-full rounded-lg outline-none placeholder-center"
              type="text"
              placeholder="Search anything...(Advance search)"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </section>
          <button
            className="bg-red-500 p-2 flex items-center justify-center text-white rounded border-3 hover:bg-red-900"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="flex gap-4">
          <button
            className="flex text-lg text-yellow-50 hover:bg-red-500 p-2 rounded-lg border bg-green-500 hover:border-red-500"
            onClick={handleDash}
          >
            Dashboard
          </button>
          <button
            className="flex text-lg text-yellow-50 hover:bg-red-500 p-2 rounded-lg border bg-green-500 hover:border-red-500"
            onClick={Logouthandle}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-start gap-16 items-start w-full">
        <div className="flex p-4 flex-col justify-start items-start">
          <div>
            <label>
              Courses per Page:
              <input
                type="number"
                value={coursesPerPage}
                onChange={handleCoursesPerPageChange}
                style={{ border: "1px solid black", color: "black" }}
                min="0"
              />
            </label>
          </div>
          <div>
            <label>
              Total Pages:
              <input
                type="number"
                value={totalPages}
                onChange={handleTotalPagesChange}
                style={{ border: "1px solid black", color: "black" }}
                min="0"
              />
            </label>
          </div>
          {/* <button
            className="bg-red-600 w-1/2 p-2 border mt-4 rounded text-white"
            onClick={handlePageChange}
          >
            Submit
          </button> */}
        </div>

        <div className="flex flex-col gap-4 w-full  items-start p-4 relative ">
          {searchsuccess
            ? searchresult2.map((course) => (
                <div
                  key={course._id}
                  className="flex  gap-3  w-3/4 items-start"
                >
                  <div
                    className="p-4 flex  items-start w-full bg-gray-800 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCourseClick(course._id)}
                  >
                    <span className="flex flex-col gap-5">
                      <h3 className="text-xl font-bold">{course.name}</h3>
                      <p className="text-gray-600">{`Instructor: ${course.instructor}`}</p>
                    </span>
                  </div>
                  {/* <button
                    className="cursor-pointer items-center flex gap-2"
                    onClick={() => handleEnrollClick(course.id)}
                  >
                    Enroll
                    {enrolledCourses.includes(course.id) ? (
                      <BsFillBookmarkFill />
                    ) : (
                      <BsBookmark />
                    )}
                  </button> */}
                </div>
              ))
            : searchresult
                .slice(
                  (currentPage - 1) * coursesPerPage,
                  currentPage * coursesPerPage
                )
                .map((course) => (
                  <div
                    key={course.id}
                    className="flex  gap-3 w-full items-center"
                  >
                    {/* {console.log(searchresult)} */}
                    <div
                      className="p-4 flex justify-between items-center w-1/2 bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <span className="flex flex-col gap-5">
                        <h3 className="text-xl font-bold">{course.name}</h3>
                        <p className="text-gray-600">{`Instructor: ${course.instructor}`}</p>
                      </span>
                    </div>
                    <button
                      className="cursor-pointer items-center flex gap-2"
                      onClick={() => handleEnrollClick(course.id)}
                    >
                      Enroll  
                      {/* {console.log(enrolledCourses)} */}
                      {enrolledCourses.includes(course.id) ? (
                      
                        <BsFillBookmarkFill />
                      ) : (
                        <BsBookmark />
                      )}
                    </button>
                  </div>
                ))}
        </div>
        
      </div>
      <span className="absolute flex w-full justify-center items-center text-center bottom-0  pd-4 mb-4">
        <button onClick={() => handlePageChange(currentPage - 1)}>
          <BiSolidLeftArrow />
        </button>
        {currentPage} of {totalPages} (pages)
        <button onClick={() => handlePageChange(currentPage + 1)}>
          <BiSolidRightArrow />
        </button>
      </span>
    </div>
  );
};

export default CourseList;

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completecourse,
  profile,
  progresscourse,
} from "../../Reducers/course.js";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { produce } from 'immer';

const Dash = () => {
  const dispatch = useDispatch();

  const [profilestats, setProfileStats] = useState([]);
  const { profiledetails, profilesuccess } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(profile());
  }, []);

  useEffect(() => {
    setProfileStats(profiledetails);
  }, [profiledetails]);
  const mystate = useRef(true);
  useEffect(() => {
    const interval = setInterval(() => {
      mystate.current = false;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleComplete = (id) => {
    dispatch(completecourse(id));
  
    // Create a draft state for updates
    setProfileStats((profileDetails) => 
      produce(profileDetails, (draftProfileDetails) => {
        const enrolledCourses = draftProfileDetails[0]?.enrolledCourses;
        if (!enrolledCourses) return;
  
        const courseIndex = enrolledCourses.findIndex(
          (course) => course.course._id === id
        );
  
        if (courseIndex !== -1) {
          enrolledCourses[courseIndex].completed = !enrolledCourses[courseIndex].completed;
        }
      })
    );
  };
  

  function setProgress(percentage, id) {
    dispatch(progresscourse({ id, percentage }));
    const progressBar = document.getElementById(`progressBar_${id}`);
    progressBar.style.width = percentage + "%";
  }

  // console.log(profilestats);

  return (
    <div className="p-4 space-y-4 flex justify-center items-center w-full">
      {profilesuccess && profilestats && (
        <div className="flex  flex-col justify-center items-center w-full">
          <h1 className="text-2xl font-bold">
            Welcome, {profilestats[0]?.username}
          </h1>
          <p className="text-lg">Email: {profilestats[0]?.email}</p>
          <span className="text-2xl mt-10 text-gray-700">Enrolled Courses</span>

          <div className="grid grid-cols-1 w-full  md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profilestats[0]?.enrolledCourses &&
            profilestats[0]?.enrolledCourses.length > 0 ? (
              profilestats[0]?.enrolledCourses.map((enrolledCourse) => (
                <div
                  key={enrolledCourse.course._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <section className="flex justify-between w-full items-center">
                    <h2 className="text-xl font-bold">
                      {enrolledCourse.course.name}
                    </h2>

                    <span
                      onClick={() => {
                        handleComplete(enrolledCourse.course._id);
                      }}
                    >
                      {enrolledCourse?.completed ? (
                        <p className="flex items-center cursor-pointer gap-2">
                          Completed{" "}
                          <BsCheckCircleFill style={{ color: "green" }} />
                        </p>
                      ) : (
                        <p className="flex items-center cursor-pointer gap-2">
                          Not completed <BsCircle style={{ color: "red" }} />
                        </p>
                      )}
                    </span>
                  </section>
                  <img
                    src={enrolledCourse.course.thumbnail}
                    style={{ width: "400px", height: "200px" }}
                    alt="Course Thumbnail"
                  />

                  <p className="text-gray-600">{`Instructor: ${enrolledCourse.course.instructor}`}</p>
                  <p className="text-gray-600">{`Enrollment Status: ${enrolledCourse.course.enrollmentStatus}`}</p>
                  <p className="text-gray-600">{`Duration: ${enrolledCourse.course.duration}`}</p>
                  <p className="text-gray-600">{`Schedule: ${enrolledCourse.course.schedule}`}</p>
                  <p className="text-gray-600">{`Location: ${enrolledCourse.course.location}`}</p>
                  <h3 className="text-xl font-bold">Prerequisites:</h3>
                  <ul className="list-disc pl-6">
                    {enrolledCourse.course.prerequisites &&
                      enrolledCourse.course.prerequisites.map(
                        (prerequisite, index) => (
                          <li key={index}>{prerequisite}</li>
                        )
                      )}
                  </ul>
                  <h3 className="text-xl font-bold">Syllabus</h3>
                  <ul className="list-disc pl-6">
                    {enrolledCourse.course.syllabus &&
                      enrolledCourse.course.syllabus.map((week, index) => (
                        <li key={index}>
                          <h4 className="text-lg font-bold">{`Week ${week.week}: ${week.topic}`}</h4>
                          <p className="text-gray-600">{week.content}</p>
                        </li>
                      ))}
                  </ul>

                  <div className="w-full h-8 bg-gray-200 rounded-full mt-12 relative">
                    <div
                      className="h-full bg-blue-500 rounded-full relative"
                      id={`progressBar_${enrolledCourse.course._id}`}
                      style={{ width: `${enrolledCourse.progress}%` }}
                    ></div>
                    <div className="absolute top-0 left-0 w-full">
                      <div
                        className="w-full"
                        style={{ maxWidth: `${enrolledCourse.progress}%` }}
                      >
                        <button
                          className="absolute bg-blue-500 text-white w-8 h-8 rounded-full text-xs"
                          style={{ left: "0%", top: "-33px" }}
                          onClick={() =>
                            setProgress(0, enrolledCourse.course._id)
                          }
                        >
                          0%
                        </button>
                        <button
                          className="absolute bg-blue-500 text-white w-8 h-8 rounded-full text-xs"
                          style={{ left: "22%", top: "-33px" }}
                          onClick={() =>
                            setProgress(25, enrolledCourse.course._id)
                          }
                        >
                          25%
                        </button>
                        <button
                          className="absolute bg-blue-500 text-white w-8 h-8 rounded-full text-xs"
                          style={{ left: "48%", top: "-33px" }}
                          onClick={() =>
                            setProgress(50, enrolledCourse.course._id)
                          }
                        >
                          50%
                        </button>
                        <button
                          className="absolute bg-blue-500 text-white w-8 h-8 rounded-full text-xs"
                          style={{ left: "72%", top: "-33px" }}
                          onClick={() =>
                            setProgress(75, enrolledCourse.course._id)
                          }
                        >
                          75%
                        </button>
                        <button
                          className="absolute bg-blue-500 text-white w-8 h-8 rounded-full text-xs"
                          style={{ left: "92%", top: "-33px" }}
                          onClick={() =>
                            setProgress(100, enrolledCourse.course._id)
                          }
                        >
                          100%
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No enrolled courses found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dash;

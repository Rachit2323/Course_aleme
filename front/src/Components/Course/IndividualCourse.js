import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IndiCourse } from "../../Reducers/course.js";

const IndividualCourse = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(IndiCourse(id));
  }, [id]); 

  const { indicoursesuccess, indicourse } = useSelector(
    (state) => state.course
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {indicourse ? (
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold">{`Name: ${indicourse[0]?.name}`}</h2>
            <p className="text-gray-600">{`Instructor: ${indicourse[0]?.instructor}`}</p>
            <p className="text-gray-600">{`Enrollment Status: ${indicourse[0]?.enrollmentStatus}`}</p>
            <p className="text-gray-600">{`Duration: ${indicourse[0]?.duration}`}</p>
            <p className="text-gray-600">{`Schedule: ${indicourse[0]?.schedule}`}</p>
            <p className="text-gray-600">{`Location: ${indicourse[0]?.location}`}</p>
            <h3 className="text-2xl font-bold">Prerequisites:</h3>
            <ul className="list-disc pl-6">
              {indicourse[0]?.prerequisites &&
                indicourse[0]?.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="mb-2">{prerequisite}</li>
                ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-2xl font-bold">Syllabus</h3>
            <ul className="list-disc pl-6">
              {indicourse[0]?.syllabus &&
                indicourse[0]?.syllabus.map((week, index) => (
                  <li key={index} className="mb-4">
                    <h4 className="text-xl font-bold">{`Week ${week.week}: ${week.topic}`}</h4>
                    <p className="text-gray-600">{week.content}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-2xl">Loading...</p>
      )}
    </div>
  );
};

export default IndividualCourse;

import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Clock, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllCourses, deleteCourse } from "../../redux/slice/courseSlice"; 
import { toast } from "react-toastify"; // Assuming toast is used for notifications

export default function CourseCard({ baseUrl = import.meta.env.VITE_API_BASE_URL }){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(getAllCourses());
    }
  }, [dispatch, courses.length]);

  const handleAdd = () => {
    navigate('/admin/courses/create');
  };

  const handleEdit = (course) => {
    navigate(`/admin/courses/edit/${course._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await dispatch(deleteCourse(id)).unwrap();
        toast.success("Course deleted successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to delete course");
      }
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
        <p className="text-gray-500 text-center py-8">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
        <p className="text-red-500 text-center py-8">Error: {error}</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
        <p className="text-gray-500 text-center py-8">No courses found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const imagePath = course.courseImages?.[0];
          const normalizedPath = imagePath ? imagePath.replace(/\\/g, '/') : null;
          const imageSrc = normalizedPath ? `${baseUrl}/${normalizedPath}` : "/placeholder.svg?height=192&width=384";

          return (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-indigo-100/50"
            >
              <div className="h-48 relative bg-gray-100">
                <img
                  src={imageSrc}
                  alt={course.title || course.courseName}
                  className="object-cover w-full h-full"
                  onLoad={() => console.log(`✅ Image loaded successfully for course "${course.courseName}": ${imageSrc}`)}
                  onError={(e) => {
                    console.error(`❌ Image failed to load for course "${course.courseName}": ${imageSrc}`);
                    e.target.src = "/placeholder.svg?height=192&width=384";
                  }}
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {course.title || course.courseName}
                  </h2>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium ml-2 whitespace-nowrap capitalize">
                    {course.courseMode}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {course.description || course.courseDescription}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  {course.batchStart && (
                    <div className="flex items-center text-gray-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">
                        Starts: {new Date(course.batchStart).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4 mt-auto">
                  <Link
                    to={`/courses/${course._id}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center transition-colors"
                    aria-label={`View details for ${course.title || course.courseName}`}
                  >
                    View Details →
                  </Link>
                </div>

                <div className="flex justify-between pt-4 border-t border-indigo-100">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                    aria-label={`Edit ${course.title || course.courseName}`}
                  >
                    <Edit className="w-4 h-4" aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                    aria-label={`Delete ${course.title || course.courseName}`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
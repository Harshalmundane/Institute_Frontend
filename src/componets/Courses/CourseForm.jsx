/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCourseById, createCourse, updateCourse, clearCurrentCourse } from '../../redux/slice/courseSlice'; // Adjust path as needed

const CourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  const isEdit = !!id;

  const { currentCourse, loading: globalLoading, error: globalError } = useSelector((state) => state.courses);

  const [courseImage, setCourseImage] = useState(null);
  const [courseDetails, setCourseDetails] = useState({
    courseName: '',
    courseMode: '',
    courseDescription: '',
    batchStart: '',
    duration: '',
    curriculum: '',
  });
  const [facultyDetails, setFacultyDetails] = useState([{ name: '', designation: '', feature: '', educator: '' }]);
  const [studentReviews, setStudentReviews] = useState([{ name: '', review: '', image: null }]);
  const [reviewImagePreviews, setReviewImagePreviews] = useState([null]);
  const [programStructure, setProgramStructure] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch course data for edit mode
  useEffect(() => {
    if (isEdit && id && !currentCourse) {
      dispatch(getCourseById(id));
    }
  }, [dispatch, isEdit, id, currentCourse]);

  // Populate form with fetched data
  useEffect(() => {
    if (isEdit && currentCourse) {
      setCourseDetails({
        courseName: currentCourse.courseName || '',
        courseMode: currentCourse.courseMode || '',
        courseDescription: currentCourse.courseDescription || '',
        batchStart: currentCourse.batchStart || '',
        duration: currentCourse.duration || '',
        curriculum: currentCourse.curriculum || '',
      });
      setFacultyDetails(currentCourse.facultyDetails?.length > 0 ? currentCourse.facultyDetails : [{ name: '', designation: '', feature: '', educator: '' }]);
      setStudentReviews(
        currentCourse.studentReviews?.length > 0
          ? currentCourse.studentReviews.map(r => ({ ...r, image: null }))
          : [{ name: '', review: '', image: null }]
      );
      setReviewImagePreviews(
        currentCourse.studentReviews?.length > 0
          ? currentCourse.studentReviews.map(r => r.image || null)
          : [null]
      );
      setProgramStructure(currentCourse.programStructure || '');
    }
  }, [currentCourse, isEdit]);

  const handleCourseChange = (e) => {
    setCourseDetails({
      ...courseDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFacultyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaculty = facultyDetails.map((faculty, idx) =>
      idx === index ? { ...faculty, [name]: value } : faculty
    );
    setFacultyDetails(updatedFaculty);
  };

  const addFaculty = () => {
    setFacultyDetails([...facultyDetails, { name: '', designation: '', feature: '', educator: '' }]);
  };

  const removeFaculty = (index) => {
    if (facultyDetails.length === 1) return;
    const updatedFaculty = facultyDetails.filter((_, idx) => idx !== index);
    setFacultyDetails(updatedFaculty);
  };

  const handleStudentReviewChange = (index, e) => {
    const { name, value } = e.target;
    const updatedReviews = studentReviews.map((review, idx) =>
      idx === index ? { ...review, [name]: value } : review
    );
    setStudentReviews(updatedReviews);
  };

  const addStudentReview = () => {
    setStudentReviews([...studentReviews, { name: '', review: '', image: null }]);
    setReviewImagePreviews([...reviewImagePreviews, null]);
  };

  const removeStudentReview = (index) => {
    if (studentReviews.length === 1) return;
    const updatedReviews = studentReviews.filter((_, idx) => idx !== index);
    const updatedPreviews = reviewImagePreviews.filter((_, idx) => idx !== index);
    setStudentReviews(updatedReviews);
    setReviewImagePreviews(updatedPreviews);
  };

  const handleStudentImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedReviews = studentReviews.map((review, idx) =>
      idx === index ? { ...review, image: file } : review
    );
    setStudentReviews(updatedReviews);

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPreviews = [...reviewImagePreviews];
      updatedPreviews[index] = reader.result;
      setReviewImagePreviews(updatedPreviews);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCourseImage(e.target.files[0]);
    }
  };

  const handleProgramStructureChange = (e) => {
    setProgramStructure(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for thunk (matches prepareFormData in slice)
      const formDataPayload = {
        ...courseDetails,
        facultyDetails,
        studentReviews: studentReviews.map(({ image, ...rest }) => rest), // Exclude files from JSON
        programStructure,
        whatILearn: courseDetails.whatILearn || '', // If applicable from your model
        files: [], // Collect all files
      };

      // Add course image if present
      if (courseImage) {
        formDataPayload.files.push(courseImage);
      }

      // Add student review images
      studentReviews.forEach((review) => {
        if (review.image) {
          formDataPayload.files.push(review.image);
        }
      });

      if (isEdit) {
        await dispatch(updateCourse({ id, courseData: formDataPayload })).unwrap();
        toast.success('Course updated successfully!');
      } else {
        await dispatch(createCourse(formDataPayload)).unwrap();
        toast.success('Course created successfully!');
        // Reset form on create success
        setCourseDetails({
          courseName: '',
          courseMode: '',
          courseDescription: '',
          batchStart: '',
          duration: '',
          curriculum: '',
        });
        setFacultyDetails([{ name: '', designation: '', feature: '', educator: '' }]);
        setStudentReviews([{ name: '', review: '', image: null }]);
        setReviewImagePreviews([null]);
        setProgramStructure('');
        setCourseImage(null);
      }

      dispatch(clearCurrentCourse()); // Clear after operation
      navigate('/admin');
    } catch (error) {
      toast.error(error.message || (isEdit ? 'Error updating course' : 'Error creating course'), {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (globalLoading && isEdit) {
    return <div className="text-center py-8">Loading course data...</div>;
  }

  if (globalError && isEdit) {
    return <div className="text-red-500 text-center py-8">Error: {globalError}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 max-w-5xl w-full space-y-10"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          {isEdit ? 'Edit Course' : 'Create Course'}
        </h2>
        {/* Course Details */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold border-b-2 border-indigo-400 pb-2 mb-4 text-indigo-600">
            Course Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="courseName" className="block font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={courseDetails.courseName}
                onChange={handleCourseChange}
                placeholder="Enter course name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="courseMode" className="block font-medium text-gray-700 mb-1">
                Course Mode of Learning
              </label>
              <select
                id="courseMode"
                name="courseMode"
                value={courseDetails.courseMode}
                onChange={handleCourseChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isSubmitting}
              >
                <option value="" disabled>Select mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label htmlFor="courseImage" className="block font-medium text-gray-700 mb-1">
                Course Image
              </label>
              <input
                type="file"
                id="courseImage"
                name="courseImage"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isSubmitting}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="courseDescription" className="block font-medium text-gray-700 mb-1">
                Course Description
              </label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={courseDetails.courseDescription}
                onChange={handleCourseChange}
                placeholder="Write a brief description of the course"
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="batchStart" className="block font-medium text-gray-700 mb-1">
                Batch Start Date
              </label>
              <input
                type="date"
                id="batchStart"
                name="batchStart"
                value={courseDetails.batchStart}
                onChange={handleCourseChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={courseDetails.duration}
                onChange={handleCourseChange}
                placeholder="E.g., 12 weeks, 3 months"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isSubmitting}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="curriculum" className="block font-medium text-gray-700 mb-1">
                Curriculum
              </label>
              <textarea
                id="curriculum"
                name="curriculum"
                value={courseDetails.curriculum}
                onChange={handleCourseChange}
                placeholder="Outline the curriculum"
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-xl font-semibold border-b-2 border-indigo-400 pb-2 mb-4 text-indigo-600">
            Program Structure
          </h3>
          <textarea
            value={programStructure}
            onChange={handleProgramStructureChange}
            placeholder="Describe the program structure"
            rows={6}
            className="w-full border border-gray-300 rounded px-3 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            disabled={isSubmitting}
          />
        </section>
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold border-b-2 border-indigo-400 pb-2 text-indigo-600">
              Faculty Details
            </h3>
            <button
              type="button"
              onClick={addFaculty}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
              disabled={isSubmitting}
            >
              + Add Details
            </button>
          </div>
          {facultyDetails.map((faculty, index) => (
            <div key={index} className="border border-indigo-200 p-5 rounded-lg relative">
              {facultyDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaculty(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
                  aria-label="Remove Faculty"
                  title="Remove this faculty"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor={`faculty-name-${index}`} className="block font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id={`faculty-name-${index}`}
                    name="name"
                    value={faculty.name}
                    onChange={(e) => handleFacultyChange(index, e)}
                    placeholder="Faculty name"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor={`faculty-designation-${index}`} className="block font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    id={`faculty-designation-${index}`}
                    name="designation"
                    value={faculty.designation}
                    onChange={(e) => handleFacultyChange(index, e)}
                    placeholder="Position or title"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor={`faculty-feature-${index}`} className="block font-medium text-gray-700 mb-1">
                    Feature/Specialty
                  </label>
                  <input
                    type="text"
                    id={`faculty-feature-${index}`}
                    name="feature"
                    value={faculty.feature}
                    onChange={(e) => handleFacultyChange(index, e)}
                    placeholder="Faculty specialty or feature"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor={`faculty-educator-${index}`} className="block font-medium text-gray-700 mb-1">
                    Educator
                  </label>
                  <input
                    type="text"
                    id={`faculty-educator-${index}`}
                    name="educator"
                    value={faculty.educator}
                    onChange={(e) => handleFacultyChange(index, e)}
                    placeholder="Educator role or note"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold border-b-2 border-indigo-400 pb-2 text-indigo-600">
              Student Review
            </h3>
            <button
              type="button"
              onClick={addStudentReview}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
              disabled={isSubmitting}
            >
              + Add Review
            </button>
          </div>
          {studentReviews.map((review, index) => (
            <div key={index} className="border border-indigo-200 p-5 rounded-lg relative mb-4">
              {studentReviews.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStudentReview(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
                  aria-label="Remove Student Review"
                  title="Remove this review"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor={`student-name-${index}`} className="block font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id={`student-name-${index}`}
                    name="name"
                    value={review.name}
                    onChange={(e) => handleStudentReviewChange(index, e)}
                    placeholder="Student name"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor={`student-review-${index}`} className="block font-medium text-gray-700 mb-1">
                    Review
                  </label>
                  <textarea
                    id={`student-review-${index}`}
                    name="review"
                    value={review.review}
                    onChange={(e) => handleStudentReviewChange(index, e)}
                    placeholder="Write review"
                    required
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor={`student-image-${index}`} className="block font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  id={`student-image-${index}`}
                  accept="image/*"
                  onChange={(e) => handleStudentImageChange(index, e)}
                  className="block"
                  disabled={isSubmitting}
                />
                {reviewImagePreviews[index] && (
                  <img
                    src={reviewImagePreviews[index]}
                    alt={`Student ${review.name} preview`}
                    className="mt-2 h-24 w-24 object-cover rounded"
                  />
                )}
              </div>
            </div>
          ))}
        </section>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || globalLoading}
            className={`px-8 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
              isSubmitting || globalLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting || globalLoading ? 'Processing...' : (isEdit ? 'Update Course' : 'Create Course')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
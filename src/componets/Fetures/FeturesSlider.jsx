import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FiChevronDown, FiX } from 'react-icons/fi';
import {
  getAllCourses,
  getFeaturedCourses,
  setFeaturedCourses
} from '../../redux/slice/courseSlice'; 
import {
  getAllBranches,
  getFeaturedBranches,
  setFeaturedBranches
} from '../../redux/slice/branchSlice'; 

const Features = () => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [
          allCourses,
          featuredCourses,
          allBranches,
          featuredBranches
        ] = await Promise.all([
          dispatch(getAllCourses()).unwrap(),
          dispatch(getFeaturedCourses()).unwrap(),
          dispatch(getAllBranches()).unwrap(),
          dispatch(getFeaturedBranches()).unwrap()
        ]);

        setCourses(allCourses);
        setSelectedCourses(featuredCourses.map(course => course._id));
        setBranches(allBranches);
        setSelectedBranches(featuredBranches.map(branch => branch._id));
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSelectCourse = (e) => {
    const id = e.target.value;
    if (!id || selectedCourses.includes(id)) return;

    if (selectedCourses.length >= 3) {
      setSuccessMsg("Maximum of 3 featured courses allowed");
      setTimeout(() => setSuccessMsg(""), 3000);
      return;
    }

    setSelectedCourses([...selectedCourses, id]);
    setSuccessMsg("");
  };

  const handleRemoveCourse = (id) => {
    setSelectedCourses(selectedCourses.filter(cid => cid !== id));
  };

  const handleSubmitCourses = async () => {
    if (selectedCourses.length !== 3) {
      setSuccessMsg("Please select exactly 3 courses");
      setTimeout(() => setSuccessMsg(""), 3000);
      return;
    }

    try {
      await dispatch(setFeaturedCourses(selectedCourses)).unwrap();
      // Refetch featured courses to update local state
      const updatedFeatured = await dispatch(getFeaturedCourses()).unwrap();
      setSelectedCourses(updatedFeatured.map(course => course._id));
      setSuccessMsg("Featured courses updated successfully!");
    } catch (err) {
      setSuccessMsg(err.message || "Failed to set featured courses");
    } finally {
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };

  const handleSelectBranch = (e) => {
    const id = e.target.value;
    if (!id || selectedBranches.includes(id)) return;

    if (selectedBranches.length >= 3) {
      setSuccessMsg("Maximum of 3 featured branches allowed");
      setTimeout(() => setSuccessMsg(""), 3000);
      return;
    }

    setSelectedBranches([...selectedBranches, id]);
    setSuccessMsg("");
  };

  const handleRemoveBranch = (id) => {
    setSelectedBranches(selectedBranches.filter(bid => bid !== id));
  };

  const handleSubmitBranches = async () => {
    if (selectedBranches.length !== 3) {
      setSuccessMsg("Please select exactly 3 branches");
      setTimeout(() => setSuccessMsg(""), 3000);
      return;
    }

    try {
      await dispatch(setFeaturedBranches(selectedBranches)).unwrap();
      // Refetch featured branches to update local state
      const updatedFeatured = await dispatch(getFeaturedBranches()).unwrap();
      setSelectedBranches(updatedFeatured.map(branch => branch._id));
      setSuccessMsg("Featured branches updated successfully!");
    } catch (err) {
      setSuccessMsg(err.message || "Failed to set featured branches");
    } finally {
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center p-4">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto flex gap-x-10">
      {/* Courses Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-5 flex-1">
        <h2 className="text-xl font-semibold">Featured Courses</h2>
        <select className="w-full border p-2 rounded" onChange={handleSelectCourse} value="">
          <option value="">Select a course to feature...</option>
          {courses.map(course => (
            <option key={course._id} value={course._id} disabled={selectedCourses.includes(course._id)}>
              {course.courseName}
            </option>
          ))}
        </select>

        {selectedCourses.map(id => {
          const course = courses.find(c => c._id === id);
          return (
            <div key={id} className="flex justify-between items-center bg-blue-50 p-2 rounded">
              <span>{course?.courseName}</span>
              <button onClick={() => handleRemoveCourse(id)} className="text-red-500"><FiX /></button>
            </div>
          );
        })}

        <button
          onClick={handleSubmitCourses}
          className={`w-full py-2 rounded ${
            selectedCourses.length === 3
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={selectedCourses.length !== 3}
        >
          Save Featured Courses
        </button>
      </div>

      {/* Branches Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-5 flex-1">
        <h2 className="text-xl font-semibold">Featured Branches</h2>
        <select className="w-full border p-2 rounded" onChange={handleSelectBranch} value="">
          <option value="">Select a branch to feature...</option>
          {branches.map(branch => (
            <option key={branch._id} value={branch._id} disabled={selectedBranches.includes(branch._id)}>
              {branch.branchName}
            </option>
          ))}
        </select>

        {selectedBranches.map(id => {
          const branch = branches.find(b => b._id === id);
          return (
            <div key={id} className="flex justify-between items-center bg-green-50 p-2 rounded">
              <span>{branch?.branchName}</span>
              <button onClick={() => handleRemoveBranch(id)} className="text-red-500"><FiX /></button>
            </div>
          );
        })}

        <button
          onClick={handleSubmitBranches}
          className={`w-full py-2 rounded ${
            selectedBranches.length === 3
              ? 'bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={selectedBranches.length !== 3}
        >
          Save Featured Branches
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className={`text-center p-3 rounded ${successMsg.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default Features;
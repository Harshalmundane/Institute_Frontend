import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchById, createBranch, updateBranch, clearCurrentBranch } from '../../redux/slice/branchSlice'; 
import { toast } from 'react-toastify';

const CreateBranch = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentBranch, loading: globalLoading, error: globalError } = useSelector((state) => state.branches);

  const [branchData, setBranchData] = useState({
    branchName: '',
    officeType: '',
    address: '',
    mobile: '',
    email: '',
    branchImage: null, // File or null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing branch data when editing
  useEffect(() => {
    if (isEdit && id && !currentBranch) {
      dispatch(getBranchById(id));
    }
  }, [dispatch, isEdit, id, currentBranch]);

  // Set local state from fetched currentBranch
  useEffect(() => {
    if (isEdit && currentBranch) {
      setBranchData({
        branchName: currentBranch.branchName || '',
        officeType: currentBranch.officeType || '',
        address: currentBranch.address || '',
        mobile: currentBranch.mobile || '',
        email: currentBranch.email || '',
        branchImage: null, // No file initially for edit
      });
      setPreviewImage(currentBranch.branchImage ? `${import.meta.env.VITE_API_BASE_URL}/${currentBranch.branchImage.replace(/\\/g, '/')}` : null);
    }
  }, [currentBranch, isEdit]);

  // Handle input text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBranchData((prev) => ({
        ...prev,
        branchImage: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submit for both create & update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEdit) {
        await dispatch(updateBranch({ id, branchData })).unwrap();
        toast.success('Branch Updated Successfully');
      } else {
        await dispatch(createBranch(branchData)).unwrap();
        toast.success('Branch Created Successfully');
        // Reset form on success for create
        setBranchData({
          branchName: '',
          officeType: '',
          address: '',
          mobile: '',
          email: '',
          branchImage: null,
        });
        setPreviewImage(null);
      }
      dispatch(clearCurrentBranch()); // Clear after operation
      navigate('/admin'); // Adjust route as needed
    } catch (error) {
      toast.error(error.message || (isEdit ? 'Error updating branch' : 'Error creating branch'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (globalLoading && isEdit) {
    return <div className="text-center py-8">Loading branch data...</div>;
  }

  if (globalError && isEdit) {
    return <div className="text-red-500 text-center py-8">Error: {globalError}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          {isEdit ? 'Edit Branch' : 'Create New Branch'}
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="branchName" className="block font-medium text-gray-700 mb-1">
              Branch Name
            </label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              placeholder="Enter branch name"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              value={branchData.branchName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="officeType" className="block font-medium text-gray-700 mb-1">
              Office Type
            </label>
            <input
              type="text"
              id="officeType"
              name="officeType"
              placeholder="E.g., Regional, Main, Satellite"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              value={branchData.officeType}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-medium text-gray-700 mb-1">
              Full Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter full address"
              rows="3"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-md resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              value={branchData.address}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter mobile number"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              value={branchData.mobile}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              value={branchData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="branchImage" className="block font-medium text-gray-700 mb-1">
              Upload Branch Image
            </label>
            <input
              type="file"
              id="branchImage"
              name="branchImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              disabled={isSubmitting}
              required={!isEdit}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Branch Preview"
                className="mt-4 w-48 h-48 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Branch' : 'Create Branch')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBranch;
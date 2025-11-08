import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Loader2, Trash2, Edit, MapPin, Phone, Mail, Plus } from "lucide-react";
import { getAllBranches, deleteBranch } from "../../redux/slice/branchSlice";
import { toast } from "react-toastify"; 

const BranchCard = ({ baseUrl = import.meta.env.VITE_API_BASE_URL }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { branches, loading: globalLoading, error } = useSelector((state) => state.branches);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (branches.length === 0) {
      dispatch(getAllBranches());
    }
  }, [dispatch, branches.length]);

  const handleAdd = () => {
    navigate('/admin/branches/create');
  };

  const handleEdit = (branch) => {
    navigate(`/admin/branches/edit/${branch._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setDeletingId(id);
      try {
        await dispatch(deleteBranch(id)).unwrap();
        toast.success("Branch deleted successfully!");
        // Optional: Navigate back to branches list after delete (uncomment if needed)
        // navigate('/admin');
      } catch (err) {
        toast.error(err.message || "Failed to delete branch");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (globalLoading) {
    return <p className="text-gray-500 text-center py-8">Loading branches...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-8">Error: {error}</p>;
  }

  if (!branches || branches.length === 0) {
    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Branches</h2>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Branch
          </button>
        </div>
        <p className="text-gray-500 text-center py-8">No branches found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Branches</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Branch
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => {
          const isDeleting = deletingId === branch._id;
          const imagePath = branch.branchImage;
          const normalizedPath = imagePath ? imagePath.replace(/\\/g, '/') : null;
          const imageSrc = normalizedPath ? `${baseUrl}/${normalizedPath}` : "/placeholder.svg?height=192&width=384";
          

          return (
            <div
              key={branch._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
            >
              {/* Branch Image */}
              <div className="h-48 relative bg-gray-100">
                <img
                  src={imageSrc}
                  alt={branch.branchName}
                  className="object-cover w-full h-full"
                  onLoad={() => console.log(`✅ Image loaded successfully for branch "${branch.branchName}": ${imageSrc}`)}
                  onError={(e) => {
                    console.error(`❌ Image failed to load for branch "${branch.branchName}": ${imageSrc}`);
                    e.target.src = "/placeholder.svg?height=192&width=384";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {branch.branchName}
                  </h2>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize whitespace-nowrap">
                    {branch.officeType}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600 text-sm mb-4">
                  <p className="flex items-start leading-relaxed">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    {branch.address}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">{branch.mobile}</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">{branch.email}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t mt-auto">
                  <button
                    onClick={() => handleEdit(branch)}
                    className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                    disabled={isDeleting}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(branch._id)}
                    className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BranchCard;
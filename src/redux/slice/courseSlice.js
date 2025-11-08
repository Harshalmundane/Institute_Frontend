// slices/courseSlice.js - Updated with featured courses handling
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance'; // Updated import

// Helper function to prepare FormData for course creation/update
const prepareFormData = (courseData, files = []) => {
  const formData = new FormData();
  formData.append('courseName', courseData.courseName);
  formData.append('courseMode', courseData.courseMode);
  formData.append('courseDescription', courseData.courseDescription);
  formData.append('batchStart', courseData.batchStart);
  formData.append('duration', courseData.duration);
  formData.append('curriculum', courseData.curriculum);
  formData.append('programStructure', courseData.programStructure);
  formData.append('isFeatured', courseData.isFeatured || false);
  formData.append('facultyDetails', JSON.stringify(courseData.facultyDetails || []));
  formData.append('studentReviews', JSON.stringify(courseData.studentReviews || []));
  if (courseData.whatILearn !== undefined) {
    formData.append('whatILearn', courseData.whatILearn);
  }

  // Append all images as 'images'
  files.forEach(file => {
    formData.append('images', file);
  });

  return formData;
};

// Async thunks for CRUD operations
export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const { files, ...dataWithoutFiles } = courseData;
      const formData = prepareFormData(dataWithoutFiles, files || []);
      const response = await axiosInstance.post('/api/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create course');
    }
  }
);

export const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/courses');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch courses');
    }
  }
);

export const getCourseById = createAsyncThunk(
  'courses/getCourseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/courses/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const { files, ...dataWithoutFiles } = courseData;
      const formData = prepareFormData(dataWithoutFiles, files || []);
      const response = await axiosInstance.put(`/api/courses/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update course');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/courses/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete course');
    }
  }
);

// Async thunks for featured courses (exported separately as requested)
export const getFeaturedCourses = createAsyncThunk(
  'courses/getFeaturedCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch featured courses');
    }
  }
);

export const setFeaturedCourses = createAsyncThunk(
  'courses/setFeaturedCourses',
  async (courseIds, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/set-featured', { courseIds });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to set featured courses');
    }
  }
);

// Main course slice (with featured logic integrated)
const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    featuredCourses: [], // Added for featured courses
    currentCourse: null,
    loading: false,
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.courses.push(action.payload.course);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get all courses
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get course by ID
      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.currentCourse = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        const index = state.courses.findIndex((course) => course._id === action.payload._id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        state.currentCourse = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.courses = state.courses.filter((course) => course._id !== action.payload.id);
        if (state.currentCourse?._id === action.payload.id) {
          state.currentCourse = null;
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get featured courses
      .addCase(getFeaturedCourses.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFeaturedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.featuredCourses = action.payload;
      })
      .addCase(getFeaturedCourses.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Set featured courses
      .addCase(setFeaturedCourses.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(setFeaturedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        // Optionally refetch featured courses or update local state
        state.featuredCourses = action.payload; // Assuming API returns updated list
      })
      .addCase(setFeaturedCourses.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export reducers/actions
export const { clearError, clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;
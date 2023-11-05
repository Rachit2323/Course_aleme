import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const API="https://ins01.onrender.com/";
// frontend  charming-belekoy-1d7e17
const API = "http://localhost:4000/";
const initialState = {
  loading: false,
  coursesuccess: false,
  indicoursesuccess: false,
  indicourse: [],
  allCoursename: [],
  enrollcourse: false,
  allenrollcourse: false,
  allenrollcourses: [],
  profilesuccess: false,
  profiledetails: [],
  completesuccess: false,
  searchsuccess:false,
  searchres:[],
};

export const allCourse = createAsyncThunk("allcourses", async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}course/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const IndiCourse = createAsyncThunk("IndiCourse", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}course/indi?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const enroll = createAsyncThunk("enroll", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}enroll/ind?id=${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const allenroll = createAsyncThunk("allenroll", async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}enroll/all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const profile = createAsyncThunk("profile", async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}user/dash`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const completecourse = createAsyncThunk("completecourse", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}course/complete?id=${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const progresscourse = createAsyncThunk(
  'progresscourse',
  async ({ id, percentage }) => {
    try {

      const token = localStorage.getItem('token');
      const result = await fetch(`${API}course/progress?id=${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ percentage: percentage }), 
      });

      if (!result.ok) {
        throw new Error('Failed to update progress');
      }

      const data = await result.json();

      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);


export const search = createAsyncThunk('search', async (keywords) => {
  try {
 
    const token = localStorage.getItem('token');
    const result = await fetch(`${API}course/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({keywords}),
    });

    if (!result.ok) {
      throw new Error('Failed to update progress');
    }

    const data = await result.json();


    return data;
  } catch (error) {
    return { error: error.message };
  }
});




const courseReducer = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: {
    [allCourse.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        // state.errorsignup = action.payload.error;
        state.coursesuccess = action.payload.success;
      } else {
        state.errorsignup = action.payload.message;
        state.coursesuccess = action.payload.success;
        state.allCoursename = action.payload.data;
      }
    },
    [allCourse.pending]: (state) => {
      state.loading = true;
      state.coursesuccess = false;
    },
    [allCourse.rejected]: (state) => {
      state.loading = true;
      state.coursesuccess = false;
    },

    [IndiCourse.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        state.errorsignin = action.payload.error;
        state.indicoursesuccess = action.payload.success;
      } else {
        state.indicoursesuccess = action.payload.success;
        state.indicourse = action.payload.data;
      }
    },
    [IndiCourse.pending]: (state) => {
      state.loading = true;
      state.indicoursesuccess = false;
    },
    [IndiCourse.rejected]: (state) => {
      state.loading = true;
      state.indicoursesuccess = false;
    },

    [enroll.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        state.enrollcourse = action.payload.success;
      } else {
        state.enrollcourse = action.payload.success;
      }
    },
    [enroll.pending]: (state) => {
      state.loading = true;
      state.enrollcourse = false;
    },
    [enroll.rejected]: (state) => {
      state.loading = true;
      state.enrollcourse = false;
    },
    [allenroll.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        state.enrollcourse = action.payload.success;
      } else {
        state.enrollcourse = action.payload.success;
        state.allenrollcourses = action.payload.data;
      }
    },
    [allenroll.pending]: (state) => {
      state.loading = true;
      state.enrollcourse = false;
    },
    [allenroll.rejected]: (state) => {
      state.loading = true;
      state.enrollcourse = false;
    },
    [profile.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        state.profilesuccess = action.payload.success;
      } else {
        state.profilesuccess = action.payload.success;
        state.profiledetails = action.payload.data;
      }
    },
    [profile.pending]: (state) => {
      state.loading = true;
      state.profilesuccess = false;
    },
    [profile.rejected]: (state) => {
      state.loading = true;
      state.profilesuccess = false;
    },
    [completecourse.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        state.completesuccess = action.payload.success;
      } else {
        state.completesuccess = action.payload.success;
      }
    },
    [completecourse.pending]: (state) => {
      state.loading = true;
      state.completesuccess = false;
    },
    [completecourse.rejected]: (state) => {
      state.loading = true;
      state.completesuccess = false;
    },
    [search.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        state.searchsuccess = action.payload.success;
      } else {
        state.searchsuccess = action.payload.success;
        state.searchres=action.payload.data;
      }
    },
    [search.pending]: (state) => {
      state.loading = true;
      state.searchsuccess = false;
    },
    [search.rejected]: (state) => {
      state.loading = true;
      state.searchsuccess = false;
    },
  },
});

export default courseReducer.reducer;

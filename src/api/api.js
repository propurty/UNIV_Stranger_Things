const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

export const fetchPosts = async (token) => {
  try {
    const response = await fetch(`${BASEURL}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("--RESPONSE--", response);

    const { data } = await response.json();
    return data.posts;
  } catch (error) {
    console.error("!!Error Fetching posts!!:", error);
  }
};

export const registerUser = async (username, password) => {
  console.log("Username and Password (registerUser):", username, password);
  try {
    const response = await fetch(`${BASEURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    console.log("--RESPONSE register--", response);

    const data = await response.json();
    console.log("--DATA register--", data);
    return data;
  } catch (error) {
    console.error("!! Error registering User !!:", error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASEURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("!! Error logging in User !!:", error);
  }
};

export const fetchUser = async (token) => {
  try {
    const response = await fetch(`${BASEURL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("!! Error Fetching User (users/me) !!", error);
  }
};

export const createPost = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  try {
    const response = await fetch(`${BASEURL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("POST /posts failed:", error);
  }
};

/* export const deletePost = async (token, postId) => {
  try {
    const response = await fetch(`${BASEURL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("DELETE /posts/:postId failed:", error);
  }
}; */

//
//
//
//
// ----------------------- Helper Functions -----------------------//
//
//
// REVIEW - Fully implement these helper functions to reduce code duplication.
// TODO - Add helper function for the headers/token for all the fetches.
// TODO - Add helper function callAPI for all the fetches.
//
//
//
// const makeHeaders = (token) => {
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   return headers;
// };

// //----------------- callAPI No Error Handling -----------------

// const callAPI = async (endpointPath, defaultOptions = {}) => {};

// export const fetchPosts = async () => {
//   try {
//     const response = await fetch(`${BASEURL}/posts`);
//     console.log("--RESPONSE--", response);
//     //REVIEW destructuring the response?
//     const { data } = await response.json();
//     // console.log("--DATA--", data.posts);
//     //REVIEW data.posts correct?
//     return data.posts;
//   } catch (error) {
//     console.error("!!Error Fetching posts!!:", error);
//   }
// };

// export const registerUser = async (username, password) => {
//   console.log("Username and Password (registerUser):", username, password);
//   try {
//     const response = await fetch(`${BASEURL}/users/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username,
//           password,
//         },
//       }),
//     });
//     console.log("--RESPONSE register--", response);
//     //REVIEW destructuring data instead, what does it change?
//     const data = await response.json();
//     console.log("--DATA register--", data);
//     return data;
//   } catch (error) {
//     console.error("!!Error in registerUser !!:", error);
//   }
// };

// export const fetchUser = async (token) => {
//   try {
//     const response = await fetch(`${BASEURL}/users/me`, {
//       //NOTE method: "GET" is the default.
//       //NOTE dont need '' around authorization?
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log("--USER RESPONSE me--", response);
//     //REVIEW destructuring the response?
//     const { data } = await response.json();
//     console.log("--DATA me--", data);
//     return data;
//   } catch (error) {
//     console.error("!!Error Fetching User users/me:", error);
//   }
// };

const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

export const fetchPosts = async (token) => {
  try {
    const response = await fetch(`${BASEURL}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    return data.posts;
  } catch (error) {
    console.error("!!Error Fetching posts!!:", error);
  }
};

export const registerUser = async (username, password) => {
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
    const { data } = await response.json();
    return data.token;
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

// REVIEW - Check if there needs to be a response const and return of success, error, or data.
export const deletePost = async (token, postId) => {
  try {
    await fetch(`${BASEURL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("DELETE /posts/:postId failed:", error);
  }
};

export const createMessage = async (token, postId, content) => {
  try {
    const response = await fetch(`${BASEURL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content,
        },
      }),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("POST /posts/:postId/messages failed:", error);
  }
};

// Did the api part for the edit functionality bonus.
//Felt like doing styling etc more instead. I do know how to implement it though.

//--------------------- Post edit API call ------------------------//
//
// export const editPost = async (
//   token,
//   title,
//   description,
//   price,
//   location,
//   willDeliver,
//   postId
// ) => {
//   try {
//     const response = await fetch(`${BASEURL}/posts/${postId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         post: {
//           title,
//           description,
//           price,
//           location,
//           willDeliver,
//         },
//       }),
//     });
//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     console.error("PATCH /posts/#postId Failed:", error);
//   }
// };

// CHUCK
// NOTE - I didn't use these purely because it made it much harder to read imo.
// NOTE - In the case of DRY though, I fully understand that it would be better to use these.
//
// ----------------------- API Helper Functions -----------------------//
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

//  //----------------- callAPI No Error Handling -----------------

// const callAPI = async (endpointPath, defaultOptions = {}) => {};

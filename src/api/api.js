const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASEURL}/posts`);
    console.log("--RESPONSE--", response);
    // destructuring the response?
    const { data } = await response.json();
    console.log("--DATA--", data.posts);
    return data.posts;
  } catch (error) {
    console.error("!!Error Fetching posts!!", error);
  }
};

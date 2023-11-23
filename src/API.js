export const getSearchResults = async (loadingState, movie_url, stateArray) => {
  try {
    loadingState(true);
    const response = await fetch(movie_url);
    const promise = await response.json();
    stateArray(promise.results);
  } catch (error) {
    console.error("Error fetching advice:", error);
  } finally {
    loadingState(false);
  }
};

export const getDetails = async (loadingState, movie_url, stateArray) => {
  try {
    loadingState(true);
    const response = await fetch(movie_url);
    const promise = await response.json();
    stateArray(promise);
  } catch (error) {
    console.error("Error fetching advice:", error);
  } finally {
    loadingState(false);
  }
};

export const getCasts = async (loadingState, movie_url, stateArray) => {
  try {
    loadingState(true);
    const response = await fetch(movie_url);
    const promise = await response.json();
    stateArray(promise.cast);
  } catch (error) {
    console.error("Error fetching advice:", error);
  } finally {
    loadingState(false);
  }
};

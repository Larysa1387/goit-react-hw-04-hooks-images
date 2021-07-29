const KEY = '21781686-06f0d55f145dff9dbbb393fb1';

function fetchImage(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('There is no data'));
  });
}
const api = { fetchImage };

export default api;

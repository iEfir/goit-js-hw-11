import axios from 'axios';
import { Notify } from 'notiflix';

export async function fetchPictures(searchQuery, searchPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?key=33791958-7f39aab7db440c1e8f9841af1&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${searchPage}`;

  const fetchPictures = await axios.get(url);
  const pictures = fetchPictures.data.hits;
  if (fetchPictures.data.totalHits) {
    Notify.success(`Hooray! We found ${fetchPictures.data.totalHits} images.`);
  }
  if (!fetchPictures.data.totalHits) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return pictures;
}

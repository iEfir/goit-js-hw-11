import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { fetchPictures } from './applictionJS/service';
import galleryEl from './applictionJS/rendering';

const simpleLightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
let searchQuery = '';
let searchPage = 1;

form.addEventListener('submit', onSubmit);
button.addEventListener('click', onButtonLoadMore);

async function onSubmit(e) {
  e.preventDefault();

  searchPage = 1;
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  try {
    const { pictures, totalHitsPictures } = await fetchPictures(
      searchQuery,
      searchPage
    );

    if (totalHitsPictures) {
      Notify.success(`Hooray! We found ${totalHitsPictures} images.`);
    } else {
      button.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (totalHitsPictures > 40) {
      button.classList.remove('is-hidden');
    }

    const dataOfPictures = pictures.map(i => {
      return galleryEl(i);
    });

    gallery.innerHTML = dataOfPictures.join('');
    simpleLightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

async function onButtonLoadMore() {
  searchPage += 1;

  try {
    const { pictures } = await fetchPictures(searchQuery, searchPage);

    if (pictures.length <= 39) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      button.classList.add('is-hidden');
    }

    const dataOfPictures = pictures.map(i => {
      return galleryEl(i);
    });

    gallery.insertAdjacentHTML('beforeend', dataOfPictures.join(''));
    simpleLightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

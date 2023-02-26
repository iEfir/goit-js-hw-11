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
button.addEventListener('click', onButton);

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
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (totalHitsPictures >= 40) {
      button.classList.remove('is-hidden');
    } else button.classList.add('is-hidden');

    const dataOfPictures = pictures.map(i => {
      return galleryEl(i);
    });

    gallery.innerHTML = dataOfPictures.join('');
    simpleLightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

async function onButton() {
  searchPage += 1;
  try {
    const { pictures, totalHitsPictures } = await fetchPictures(
      searchQuery,
      searchPage
    );

    if (totalHitsPictures < 40) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      button.classList.add('is-hidden');
    } else button.classList.remove('is-hidden');

    const dataOfPictures = pictures.map(i => {
      return galleryEl(i);
    });

    gallery.insertAdjacentHTML('beforeend', dataOfPictures.join(''));
    simpleLightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

// function galleryEl({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `<div class="photo-card"><a class="gallery-link" href="${largeImageURL}"><img class="gallery-image" width='320' height='240' src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
//   <div class="info"><p class="info-item"><b>Likes</b><span class='info-data'>${likes}</span></p><p class="info-item"><b>Views</b><span class='info-data'>${views}</span></p>
//   <p class="info-item"><b>Comments</b><span class='info-data'>${comments}</span></p><p class="info-item"><b>Downloads</b><span class='info-data'>${downloads}</span></p></div></div>`;
// }

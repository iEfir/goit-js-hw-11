export default function galleryEl({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card"><a class="gallery-link" href="${largeImageURL}"><img class="gallery-image" width='320' height='240' src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info"><p class="info-item"><b>Likes</b><span class='info-data'>${likes}</span></p><p class="info-item"><b>Views</b><span class='info-data'>${views}</span></p>
  <p class="info-item"><b>Comments</b><span class='info-data'>${comments}</span></p><p class="info-item"><b>Downloads</b><span class='info-data'>${downloads}</span></p></div></div>`;
}

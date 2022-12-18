import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryEl = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

function createGalleryItemsMarkup(galleryItems) {
   return galleryItems
      .map(({ preview, original, description }) => {
         return `
        <div class="gallery__item">
            <a class="gallery__link"
            href="${original}">
               <img
                  class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
               />
            </a>
         </div>
         `;
      })
      .join('');
}

galleryEl.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryEl.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
   e.preventDefault();
   console.log(e);

   const isGalleryImageEl = e.target.classList.contains('gallery__image');

   if (!isGalleryImageEl) {
      return;
   }

   const sourceLargeImageEl = e.target.getAttribute('data-source');

   const instance = basicLightbox.create(
      `
    <img src="${sourceLargeImageEl}" width="800" height="600">`
   );

   instance.show();

   galleryEl.addEventListener('keydown', e => {
      const ESC_KEY_CODE = 'Escape';
      if (e.code === ESC_KEY_CODE) {
         instance.close();
      }
   });
}

import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryEl = document.querySelector('.gallery');

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryItemsMarkup);

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

galleryEl.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
   e.preventDefault();

   const isGalleryImageEl = e.target.classList.contains('gallery__image');

   if (!isGalleryImageEl) {
      return;
   }

   document.addEventListener('keydown', onEscClose);

   const sourceLargeImageEl = e.target.getAttribute('data-source');

   const instance = basicLightbox.create(
      `
    <img src="${sourceLargeImageEl}" width="800" height="600">`
   );

   instance.show();

   function onEscClose(e) {
      const ESC_KEY_CODE = 'Escape';
      if (e.code === ESC_KEY_CODE) {
         instance.close();
         document.removeEventListener('keydown', onEscClose);
      }
   }
}

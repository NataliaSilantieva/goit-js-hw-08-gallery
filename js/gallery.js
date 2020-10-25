import images from './gallery-items.js'

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image')
const closeBtn = document.querySelector('.lightbox__button');
const modalOverlay = document.querySelector('.lightbox__overlay');
const galleryList = galleryListCreate();
const prevBtn = document.querySelector('.right');
const nextBtn = document.querySelector('.left');



gallery.insertAdjacentHTML('beforeend', galleryList);

gallery.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click',closeModal);
document.addEventListener('keydown', byEscClose);
prevBtn.addEventListener('click', onPrevBtnClick);
nextBtn.addEventListener('click', onNextBtnClick);


 
function galleryListCreate(){
return images.map(({preview, original, description}) =>{
   return `<li class="gallery__item">
   <a
     class="gallery__link"
     href="${original}"
   >
     <img
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
       alt="${description}"
     />
   </a>
 </li>`
}).join('');
}



function openModal(evt){
    evt.preventDefault();
    
    modal.classList.add('is-open');
    modalImage.alt = evt.target.alt;
    modalImage.src = evt.target.dataset.source;
}

function closeModal(){   
        modalImage.removeAttribute('src');
        modalImage.removeAttribute('alt');
        modal.classList.remove('is-open');  
}

function byEscClose(evt){
    if(evt.code === 'Escape'){
        closeModal();
    }
}


let index = images.findIndex(img => img.src === modalImage.src);


function onPrevBtnClick() {
  if (index - 1 <= 0) {
    return;
  }

  index -= 1;
  setActiveImage(images);
}

function onNextBtnClick() {
  if (index + 1 >= images.length) {
    return;
  }

  index += 1;
  setActiveImage(images);

}

function setActiveImage(images) {
  
  modalImage.src = images[index].original; 
  modalImage.alt = images[index].description;
 
}

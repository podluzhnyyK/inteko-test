import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

const swiper1 = new Swiper('.swiper-container--projects', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination--projects',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-projects-next',
    prevEl: '.swiper-projects-prev',
  },
  keyboard: true,

});

const swiper2 = new Swiper('.swiper-container--tenet', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination--tenet',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-tenet-next',
    prevEl: '.swiper-tenet-prev',
  },
  keyboard: true,

});

const swiper3 = new Swiper('.swiper-container--offer', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination--offer',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-offer-next',
    prevEl: '.swiper-offer-prev',
  },
  keyboard: true,

});

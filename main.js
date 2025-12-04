"use strict";

// const videoWrapper = document.getElementById("videoWrapper");
// const introVideo = document.getElementById("heroVideo");

// introVideo.addEventListener("ended", () => {
//   videoWrapper.style.opacity = "0";

//   setTimeout(() => {
//     videoWrapper.remove();
//   }, 1000);
// });

$(() => {
  const $testimonials = $("#testimonial-slider");

  let testimonialHTML = "";

  $.ajax({
    url: "https://api.jsonbin.io/v3/b/6931184943b1c97be9d6b7b0",
    method: "GET",
    dataType: "json",
  }).done((data) => {
    let testimonials = data.record.testimonials;

    testimonials.forEach((item) => {
      let testimonial = `
      <div class='testimonial'>
      <img src="${item.imageURL} alt="">
      <blockquote>
      "${item.quote}"
      </blockquote>
      <div class='name-affiliation'>
      <h3>${item.name}</h3>
      <p>${item.affiliation}</p>
      </div>
      </div>
      `;
      testimonialHTML += testimonial;
    });

    $testimonials.prepend(testimonialHTML);
    // const $prevBtn = $("#prevBtn");
    // const $nextBtn = $("#nextBtn");
    // console.log($prevBtn);

    const $arrowBtns = $("#slider-btns");

    const prevArrow = `<button type="button" id="prevBtn" class="slider slick-prev">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke=#1abc9d"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
              stroke="#1abc9d"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </button>`;

    const nextArrow = `
        <button type="button" id="nextBtn" class="slider slick-next">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#1abc9d"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
                stroke="#1abc9d"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
    `;

    $($testimonials).slick({
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      // appendArrows: $("#testimonials"),
      prevArrow: prevArrow,
      nextArrow: nextArrow,
      appendArrows: $arrowBtns,
    });
  });
});

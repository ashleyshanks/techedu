"use strict";

$(() => {
  loadStorage();
  loadTestimonials();
  drawCircles();

  function loadStorage() {
    const savedName = localStorage.getItem("userName");
    console.log("savedName is");
    console.log(savedName);
    if (savedName) {
      $("#name").val(savedName);
      welcome(savedName);
    } else {
      console.log("No name!");
      getName();
    }

    let count = localStorage.getItem("pageLoads");
    count = count ? parseInt(count) + 1 : 1;
    localStorage.setItem("pageLoads", count);

    // console.log("Page has loaded:", count, "times");

    if (count === 1 || count % 10 === 0) {
      toggleVideo();
    }
  }

  function toggleVideo() {
    const video = `<video id="heroVideo" autoplay muted playsinline>
        <source src="TechForward.mp4" type="video/mp4" />
      </video>`;

    const $videoWrapper = $("#videoWrapper");
    $videoWrapper.prepend(video);

    setTimeout(() => {
      $videoWrapper.fadeOut(1000, () => {
        $videoWrapper.html("");
      });
    }, 2000);
  }

  function getName() {
    const $formPopup = $("#form-popup");
    const $overlay = $(".popup-overlay");
    const $form = $("#myForm");
    const $submit = $("#enter");
    let name = "";

    if (!name) {
      $formPopup.removeClass("hidden");
      $overlay.removeClass("hidden");
    } else {
      $formPopup.addClass("hidden");
      $overlay.addClass("hidden");
    }

    $form.on("submit", (e) => {
      e.preventDefault();

      name = $("#name").val();
      name = name.charAt(0).toUpperCase() + name.slice(1);

      if (name) {
        $formPopup.addClass("hidden");
        $overlay.addClass("hidden");
      }

      localStorage.setItem("userName", name);
      welcome(name);
    });
  }

  window.addEventListener("resize", drawCircles);
  function drawCircles() {
    const wrapper = document.getElementById("stats");
    let rect = wrapper.getBoundingClientRect();
    var can = document.getElementById("canvas");
    can.width = rect.width;
    can.height = rect.height;
    const WIDTH = can.width;
    const HEIGHT = can.height;
    const ctx = canvas.getContext("2d");

    drawCircle(0.1);
    drawCircle(0.385);
    drawCircle(0.67);
    drawCircle(0.1, "#e74b3c", 0.71, "71%");
    drawCircle(0.385, "#1abc9d", 0.96, "96%");
    drawCircle(0.67, "#f8d236", 0.82, "82%");

    function drawCircle(x, color = "white", percent = 1, text = "") {
      x *= can.width;
      const size = can.width / 9;
      let mtpie = Math.PI * 2;

      let startAngle = 0;
      let endAngle = mtpie;

      if (percent < 1) {
        startAngle = Math.PI / 2;
        endAngle = startAngle + percent * mtpie;
      }

      ctx.beginPath();
      ctx.arc(size + x, size + 100, size, startAngle, endAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = 30;
      ctx.stroke();

      if (text) {
        ctx.fillStyle = color;
        ctx.font = `bold ${size / 2}px Montserrat`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textX = size + x;
        const textY = size + 100;

        ctx.fillText(text, textX, textY);
      }
    }
  }

  function welcome(name) {
    let welcome = `<p>Welcome to the future, ${name}!</p>`;
    const $announcements = $("#announcement-bar");
    $announcements.prepend(welcome);
  }

  function loadTestimonials() {
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
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        appendArrows: $arrowBtns,
      });
    });
  }
});

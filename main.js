const videoWrapper = document.getElementById("videoWrapper");
const introVideo = document.getElementById("heroVideo");

introVideo.addEventListener("ended", () => {
  videoWrapper.style.opacity = "0";

  setTimeout(() => {
    videoWrapper.remove();
  }, 1000);
});

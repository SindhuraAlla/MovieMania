document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-link').forEach((a) => {
      if (location.pathname.includes(a.getAttribute('href'))) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const regex = /movie_details\.html\?id=\d+|about\.html/;
  if (regex.test(document.location.href)) {
      document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('../img/bg-image-6.webp')";
  }
});

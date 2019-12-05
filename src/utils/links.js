export const scrollToIdOnClick = (event) => {
  event.preventDefault();
  const to = getScrollTopByHref(event.target) - 54;
  scrollToPosition(to)
}

const getScrollTopByHref = element => {
  const id = element.getAttribute('href');
  return (!document.querySelector(id)) ?
    window.location.replace("/")
    :
    document.querySelector(id).offsetTop;
}

const smoothScrollTo = (endX, endY, duration = 400) => {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

export const scrollToPosition = to => {
  smoothScrollTo(0, to, 600);
}
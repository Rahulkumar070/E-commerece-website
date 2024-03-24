gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  lerp: 0.1,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

gsap.from("#lastitem1 img", {
  scale: 0.1,
  opacity: 0,
  scrollTrigger: {
    trigger: "#lastitem1 img",
    scroller: "#main",
    start: "top 90%",
    end: "top 30%",
    scrub: 5,
  },
});

gsap.from("#page4body", {
  x: 300,
  duration: 8,
  scrollTrigger: {
    trigger: "#page4body",
    scroller: "#main",
    start: "top 60%",
    end: "top 30%",
    scrub: 5,
  },
});

gsap.from("#page4", {
  // x: 300,
  scale: 0,
  opacity: 0,
  duration: 8,
  scrollTrigger: {
    trigger: "#page4",
    scroller: "#main",
    start: "top 100%",
    end: "top 30%",
    scrub: 5,
  },
});

gsap.from("#main #hero h1", {
  // x: 300,
  scale: 0,
  opacity: 0,
  duration: 1.5,
});

gsap.from("#main #hero h5", {
  x: 300,
  scale: 0,
  opacity: 0,
  duration: 1.5,
  scrub: 5,
});

gsap.from("#nav", {
  y: 300,
  scale: 0,
  opacity: 0,
  duration: 1.5,
  scrub: 5,
});

var speed = 1000 / 60;
var opacity = 100;
function fadeout() {
  opacity--;
  duv.style.opacity = opacity / 100;
  if (opacity > 0) {
    setTimeout(fadeOut, speed);
  }
}

fadeOut();

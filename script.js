function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: "#main" });
  
  // Refresh after setup
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  var tl = gsap.timeline();

  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function() {
      var h5timer = document.querySelector("#line1-part1 h5");
      var grow = 0;
      var interval = setInterval(function() {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          clearInterval(interval);
          h5timer.innerHTML = grow;
        }
      }, 35);
    },
  });

  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 2.8,
  });

  tl.from("#page1", {
    delay: 0.2,
    y: 1600,
    opacity: 0,
    duration: 0.6,
    ease: "power4",
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from("#nav", {
    opacity: 0,
  });

  tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
    y: 140,
    stagger: 0.2,
  });

  tl.from("#hero1,#page2", {
    opacity: 0,
  }, "-=1.2");
}

function cursorAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cube-bezier(0.23,1,0.320,1)",
    duration: 1,
  });
  
  Shery.makeMagnet("#nav-part2 h4"); 

  var videocontainerr = document.querySelector("#video-container");
  var video = document.querySelector("#video-container video");
  
  if (videocontainerr && video) {
    videocontainerr.addEventListener("mouseenter", function() {
      gsap.to(".mouseFollower", {
        opacity: 0,
      });
    });
    
    videocontainerr.addEventListener("mousemove", function(dets) {
      gsap.to("#video-cursor", {
        left: dets.x - 570,
        y: dets.y - 300,
      });
    });
    
    videocontainerr.addEventListener("mouseleave", function() {
      gsap.to(".mouseFollower", {
        opacity: 1,
      });
      gsap.to("#video-cursor", {
        left: "70%",
        top: "-15%",
      });
    });

    var flag = 0;
    videocontainerr.addEventListener("click", function() {
      if (flag == 0) {
        video.play();
        video.style.opacity = 1;
        document.querySelector("#video-cursor").innerHTML = '<i class="ri-pause-mini-fill"></i>';
        gsap.to("#video-cursor", {
          scale: 0.5
        });
        flag = 1;
      } else {
        video.pause();
        video.style.opacity = 1;
        document.querySelector("#video-cursor").innerHTML = '<i class="ri-play-mini-fill"></i>';
        gsap.to("#video-cursor", {
          scale: 1
        });
        flag = 0;
      }
    });
  }
}

function sheryAnimation() {
  // Wait for images to load before applying effects
  window.addEventListener('load', function() {
    if (typeof Shery !== 'undefined') {
      Shery.imageEffect(".image-div", {
        style: 5,
        config: {
          a: { value: 2, range: [0, 30] },
          b: { value: 0.75, range: [-1, 1] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.7272727272727273 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: false },
          growSize: { value: 4, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.76, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 0 },
          noise_speed: { value: 0.46, range: [0, 10] },
          metaball: { value: 0.47, range: [0, 2] },
          discard_threshold: { value: 0.5, range: [0, 1] },
          antialias_threshold: { value: 0, range: [0, 0.1] },
          noise_height: { value: 0.5, range: [0, 2] },
          noise_scale: { value: 9.92, range: [0, 100] },
        },
        gooey: true,
      });
    }
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  loadingAnimation();
  locomotiveAnimation();
  sheryAnimation();
  cursorAnimation();

  // Flag animation
  document.addEventListener("mousemove", function(dets) {
    gsap.to("#flag", {
      x: dets.x,
      y: dets.y
    });
  });
  
  const hero3 = document.querySelector("#hero3");
  if (hero3) {
    hero3.addEventListener("mouseenter", function() {
      gsap.to("#flag", {
        opacity: 1,
      });
    });
    
    hero3.addEventListener("mouseleave", function() {
      gsap.to("#flag", {
        opacity: 0,
      });
    });
  }
});
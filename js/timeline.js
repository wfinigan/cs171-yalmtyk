(function() {

  // VARIABLES
  const timeline = document.querySelector(".timeline ol"),
    elH = document.querySelectorAll(".timeline li > div"),
    arrows = document.querySelectorAll(".timeline .arrows .arrow"),
    arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
    arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
    firstItem = document.querySelector(".timeline li:first-child"),
    lastItem = document.querySelector(".timeline li:last-child"),
    xScrolling = 280,
    disabledClass = "disabled";

  // START
  window.addEventListener("load", init);

  function init() {
    setEqualHeights(elH, 50);
    animateTl(xScrolling, arrows, timeline);
    setSwipeFn(timeline, arrowPrev, arrowNext);
    setKeyboardFn(arrowPrev, arrowNext);
  }

  // SET EQUAL HEIGHTS
  function setEqualHeights(el, c) {
    const singleHeight = c;

  }

  // CHECK IF AN ELEMENT IS IN VIEWPORT
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
  }

  // SET STATE OF PREV/NEXT ARROWS
  function setBtnState(el, flag = true) {
    if (flag) {
      el.classList.add(disabledClass);
    } else {
      if (el.classList.contains(disabledClass)) {
        el.classList.remove(disabledClass);
      }
      el.disabled = false;
    }
  }

  // ANIMATE TIMELINE
  function animateTl(scrolling, el, tl) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      el[i].addEventListener("click", function() {
        if (!arrowPrev.disabled) {
          arrowPrev.disabled = true;
        }
        if (!arrowNext.disabled) {
          arrowNext.disabled = true;
        }
        const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
        if (counter === 0) {
          tl.style.transform = `translateX(-${scrolling}px)`;
        } else {
          const tlStyle = getComputedStyle(tl);
          // add more browser prefixes if needed here
          const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
          const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
          tl.style.transform = `translateX(${values}px)`;
        }

        setTimeout(() => {
          isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
          isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
        }, 1100);

        counter++;
      });
    }

    var action1 = 0;
    d3.select("#nov8").on("click", moreInfo);

    function moreInfo() {
      if (action1 % 2 == 0) {
        document.getElementById("first").innerHTML = "Nearly 54 percent of Massachusetts voters approved Question 4, a ballot measure that called for legalizing recreational marijuana while regulating it like alcoholic beverages. According to the measure, a commission would also be created to regulate marijuana in the state.";
        document.getElementById("nov8").innerHTML = "unfold_less";
        document.getElementById("l1").innerHTML = "Learn More.";
        setEqualHeights(el, -500);
        action1++;
        console.log(action1);
      } else {
        document.getElementById("first").innerHTML = "";
        document.getElementById("nov8").innerHTML = "unfold_more";
        document.getElementById("l1").innerHTML = "";
        setEqualHeights(el, 50);
        console.log(action1);
        action1++;
      }
    }

    var action2 = 0;
    d3.select("#dec15").on("click", moreInfo2);

    function moreInfo2() {
      if (action2 % 2 == 0) {

        document.getElementById("second").innerHTML = "Individuals who are 21 years and older can possess up to 10 ounces of marijuana inside their home and up to one ounce outside.";
        document.getElementById("dec15").innerHTML = "unfold_less";
        document.getElementById("l2").innerHTML = "Learn More.";
        setEqualHeights(el, -500);
        action2++;
        console.log(action2);
      } else {
        document.getElementById("second").innerHTML = "";
        document.getElementById("l2").innerHTML = "";
        document.getElementById("dec15").innerHTML = "unfold_more";
        setEqualHeights(el, 50);
        console.log(action2);
        action2++;
      }
    }

    var action3 = 0;
    d3.select("#mar6").on("click", moreInfo3);

    function moreInfo3() {
      if (action3 % 2 == 0) {

        document.getElementById("third").innerHTML = "The Cannabis Control Commission approves key adult-use regulations outlining medical marijuana inventory quotas, an economic empowerment program, a licensing and fee structure, and more.";
        document.getElementById("l3").innerHTML = "Learn more.";
        document.getElementById("mar6").innerHTML = "unfold_less";
        setEqualHeights(el, -500);
        action3++;
      } else {
        document.getElementById("third").innerHTML = "";
        document.getElementById("l3").innerHTML = "";
        document.getElementById("mar6").innerHTML = "unfold_more";
        setEqualHeights(el, 50);
        action3++;
      }
    }

    var action4 = 0;
    d3.select("#april2").on("click", moreInfo4);

    function moreInfo4() {
      if (action4 % 2 == 0) {
        document.getElementById("l4").innerHTML = "Learn more.";
        document.getElementById("fourth").innerHTML = "Applications open up for marijuana establishment licenses. Priority is given to already registered marijuana dispensaries (through the previously established medical marijuana licensing program) or Economic Empowerment Applicants, who demonstrated they could benefit communities disproportionately impacted by marijuana enforcement.";
        document.getElementById("april2").innerHTML = "unfold_less";
        setEqualHeights(el, -500);
        action4++;
      } else {
        document.getElementById("l4").innerHTML = "";
        document.getElementById("fourth").innerHTML = "";
        document.getElementById("april2").innerHTML = "unfold_more";
        setEqualHeights(el, 50);
        action4++;
      }
    }

    var action5 = 0;
    d3.select("#june28").on("click", moreInfo5);

    function moreInfo5() {
      if (action5 % 2 == 0) {
        document.getElementById("l5").innerHTML = "Learn more.";
        document.getElementById("fifth").innerHTML = "The Cannabis Control Commission launches social equity program, aimed to give work opportunities in the cannabis industry to those who had been disproportionately impacted by its prohibition.";
        document.getElementById("june28").innerHTML = "unfold_less";
        setEqualHeights(el, -500);
        action5++;
      } else {
        document.getElementById("l5").innerHTML = "";
        document.getElementById("fifth").innerHTML = "";
        document.getElementById("june28").innerHTML = "unfold_more";
        setEqualHeights(el, 50);
        action5++;
      }
    }

    var action6 = 0;
    d3.select("#oct4").on("click", moreInfo6);

    function moreInfo6() {
      if (action6 % 2 == 0) {
        document.getElementById("l6").innerHTML = "Learn more.";
        document.getElementById("oct4").innerHTML = "unfold_less";
        document.getElementById("sixth").innerHTML = "Four marijuana shops have their license applications approved -- one to a medical dispensary in Northampton owned by New England Treatment Access, and the other three licenses went to Cultivate Holdings.";
        setEqualHeights(el, -500);
        action6++;
      } else {
        document.getElementById("sixth").innerHTML = "";
        document.getElementById("l6").innerHTML = "";
        document.getElementById("oct4").innerHTML = "unfold_more";
        setEqualHeights(el, 50);
        action6++;
      }
    }

    var action7 = 0;
    d3.select("#nov20").on("click", moreInfo7);

    function moreInfo7() {
      if (action7 % 2 == 0) {
        document.getElementById("l7").innerHTML = "Learn more.";
        document.getElementById("nov20").innerHTML = "unfold_less";
        document.getElementById("seventh").innerHTML = "Two retail marijuana stores open to the public. Separately, the Cannabis Control Commission authorized two independent testing laboratories, MCR Labs and CDX Analytics, to begin testing marijuana and marijuana products for the adult-use cannabis industry.";
        setEqualHeights(el, -500);
        action7++;
      } else {
        document.getElementById("seventh").innerHTML = "";
        document.getElementById("l7").innerHTML = "";
        document.getElementById("nov20").innerHTML = "unfold_more";
        setEqualHeights(el, 50);
        action7++;
      }
    }

    var action8 = 0;
    d3.select("#sept24").on("click", moreInfo8);

    function moreInfo8() {
      if (action8 % 2 == 0) {
        document.getElementById("l8").innerHTML = "Learn more.";
        document.getElementById("sept24").innerHTML = "unfold_less";
        document.getElementById("eighth").innerHTML = "The Cannabis Control Commission approves new regulations for marijuana home delivery and marijuana cafes.";
        setEqualHeights(el, -500);
        action8++;
      } else {
        document.getElementById("l8").innerHTML = "";
        document.getElementById("eighth").innerHTML = "";
        document.getElementById("sept24").innerHTML = "unfold_more";
        setEqualHeights(el, 50);
        action8++;
      }
    }

  }

  // ADD SWIPE SUPPORT FOR TOUCH DEVICES
  function setSwipeFn(tl, prev, next) {
    const hammer = new Hammer(tl);
    hammer.on("swipeleft", () => next.click());
    hammer.on("swiperight", () => prev.click());
  }

  // ADD BASIC KEYBOARD FUNCTIONALITY
  function setKeyboardFn(prev, next) {
    document.addEventListener("keydown", (e) => {
      if ((e.which === 37) || (e.which === 39)) {
        const timelineOfTop = timeline.offsetTop;
        const y = window.pageYOffset;
        if (timelineOfTop !== y) {
          window.scrollTo(0, timelineOfTop);
        }
        if (e.which === 37) {
          prev.click();
        } else if (e.which === 39) {
          next.click();
        }
      }
    });
  }

})();
//}

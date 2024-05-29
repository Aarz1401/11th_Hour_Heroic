document.querySelectorAll('.choice-button').forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        updateTimeline(target);
    });
});

function updateTimeline(timeline) {
    // Find the index of the choice slide
    const choiceSlideIndex = Array.from(document.querySelectorAll('.swiper-slide')).findIndex(slide => slide.getAttribute('data-id') === 'choice');

    // Remove all slides after the choice slide
    const slides = document.querySelectorAll('.swiper-slide');
    for (let i = slides.length - 1; i > choiceSlideIndex; i--) {
        mySwiper.removeSlide(i);
    }

    // Define new slides for each timeline
    const timeline1Slides = [
        '<div class="swiper-slide" data-id="timeline1_1"><img src="panels/panel6.jpg" alt=""></div>',
        '<div class="swiper-slide" data-id="timeline1_2"><img src="panels/panel 1 and 7.jpg" alt=""></div>'
    ];

    const timeline2Slides = [
        '<div class="swiper-slide" data-id="timeline2_1"><img src="panels/panel6.2.jpg" alt=""></div>',
        '<div class="swiper-slide" data-id="timeline2_2"><img src="panels/panel 7.jpg" alt=""></div>'
    ];

    // Add new slides based on the chosen timeline
    if (timeline === 'timeline1') {
        timeline1Slides.forEach(slide => {
            mySwiper.appendSlide(slide);
        });
    } else if (timeline === 'timeline2') {
        timeline2Slides.forEach(slide => {
            mySwiper.appendSlide(slide);
        });
    }

    // Navigate to the first slide of the new timeline
    mySwiper.update();
    mySwiper.slideTo(choiceSlideIndex + 1, 0);
}

var mySwiper = new Swiper('.mySwiper', {
    direction: 'horizontal',
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function () {
            checkPagination(this);
        },
        slideChange: function () {
            checkPagination(this);
        }
    },
    simulateTouch: false,
    touchRatio: 1,
    grabCursor: true,
    slideToClickedSlide: true,
    speed: 400,
});

function checkPagination(swiper) {
    const currentIndex = swiper.realIndex;
    const currentSlide = swiper.slides[currentIndex];
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');

    if (currentSlide.getAttribute('data-id') === 'choice') {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    } else {
        if (prevButton) prevButton.style.display = 'block';
        if (nextButton) nextButton.style.display = 'block';
    }

    // Hide the prev button if it's the first slide
    if (currentIndex === 0) {
        if (prevButton) prevButton.style.display = 'none';
    }
}

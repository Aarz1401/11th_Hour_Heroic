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
    const choiceText= document.getElementById('choice-text');
    const homeButton = document.getElementById('home-button');

    if (currentSlide.getAttribute('data-id') === 'choice') {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if(homeButton) homeButton.style.display = 'none';
        if(choiceText) choiceText.style.display = 'block';
        
    } else {
        if (prevButton) prevButton.style.display = 'block';
        if (nextButton) nextButton.style.display = 'block';
        if(homeButton) homeButton.style.display = 'none';
        if(choiceText) choiceText.style.display = 'none';
    }

    if (currentSlide.getAttribute('data-id') === 'timeline1_2') {
        if (nextButton) nextButton.style.display = 'none';
        if(prevButton) prevButton.style.display = 'block';
        if(homeButton) homeButton.style.display = 'block';
        if(choiceText) choiceText.style.display = 'none';
    }

    if (currentSlide.getAttribute('data-id') === 'timeline2_2') {
        if (nextButton) nextButton.style.display = 'none';
        if(prevButton) prevButton.style.display = 'block';
        if(homeButton) homeButton.style.display = 'block';
        if(choiceText) choiceText.style.display = 'none';
    }
    if (currentIndex === 0) {
        if (prevButton) prevButton.style.display = 'none';
    }

   
     // Hide the prev button if it's the first slide
     if (currentIndex === 0) {
        if (prevButton) prevButton.style.display = 'none';
    }
    //Hide the next button if it's the last slide
    if (currentIndex === swiper.slides.length - 1) {
        if (nextButton) nextButton.style.display = 'none';
    }
}
document.getElementById('home-button').addEventListener('click', function() {
    mySwiper.slideTo(0, 0);
});


function playSlideAudio(swiper) {
    const hum = document.getElementById('hum');
    const specificAudioChoice = document.getElementById('specific-audio-choice');
    
    // Pause all audio first
    hum.pause();
    specificAudioChoice.pause();

    // Determine the specific audio for the current slide
    const currentIndex = swiper.realIndex;
    const currentSlide = swiper.slides[currentIndex];
    const dataId = currentSlide.getAttribute('data-id');

    if(dataId === 'start'){
        hum.currentTime = 0;
        hum.play();
    }
}

   


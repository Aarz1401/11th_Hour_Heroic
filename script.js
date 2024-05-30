//Aadil Chasmawala , May 2024
//This is the main script file for the project. It contains all the logic for the interactive story.



// Add event listener to the start button
document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');
    nextButton.style.pointerEvents = 'none'; // Disable pointer events to make the button unclickable
    nextButton.style.opacity = '0.5'; // Reduce opacity to indicate disabled state
    prevButton.style.pointerEvents = 'none';
    prevButton.style.opacity = '0.5';
    nextButton.style.display = 'none'; // Hide the next button

    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('first-slide-image').style.filter = 'none'; // Remove blur from the first slide
        document.getElementById('mainHeadingWrapper').style.display = 'none'; // Hide the main heading
        document.getElementById('swiper-button-next').style.display = 'block'; // show the nextButton

        this.style.display = 'none';

        // Play the sunrise audio
        const sunrise = document.getElementById('sunrise');
        sunrise.currentTime = 0;
        sunrise.play().catch((error) => {
            // If playback fails, log the error
            console.error("Audio playback failed:", error);
        });

        mySwiper.update();
        mySwiper.slideTo(0, 0);

        // Enable the next and prev buttons
        nextButton.style.pointerEvents = 'auto';
        nextButton.style.opacity = '1';
        prevButton.style.pointerEvents = 'auto';
        prevButton.style.opacity = '1';
    });
});

// Add event listeners to all choice buttons(here there are 2)
document.querySelectorAll('.choice-button').forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        updateTimeline(target);
    });
});

// Initialize Swiper
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
            playSlideAudio(this);
        },
        slideChange: function () {
            checkPagination(this);
            playSlideAudio(this);
        }
    },
    simulateTouch: false,
    touchRatio: 1,
    grabCursor: true,
    slideToClickedSlide: true,
    speed: 400,
});

// Function to check pagination based on the current slide
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
        //if(nextButton) nextButton.style.display = 'none';
    }
    //Hide the next button if it's the last slide
    if (currentIndex === swiper.slides.length - 1) {
        if (nextButton) nextButton.style.display = 'none';
    }
}


// Function to update the timeline based on the choice made by the user
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


// Add event listener to the home button
document.getElementById('home-button').addEventListener('click', function() {
    const nextButton = document.getElementById('swiper-button-next');
    nextButton.style.display = 'block';
    mySwiper.slideTo(0, 0);

});


// Function to play audio based on the current slide
function playSlideAudio(swiper) {
    const hum = document.getElementById('hum');
    const fail = document.getElementById('fail');
    const yay = document.getElementById('yay');
    const surprise = document.getElementById('surprise');
    const motivation = document.getElementById('motivation');
    const huh = document.getElementById('huh');
    const heart_beat = document.getElementById('heart_beat');
    const alarm = document.getElementById('alarm');
    const sunrise = document.getElementById('sunrise');
    const chatgpt = document.getElementById('chatgpt');
    
    // Pause all audio first
    hum.pause();
    fail.pause();
    yay.pause();
    surprise.pause();
    motivation.pause();
    huh.pause();
    heart_beat.pause();
    alarm.pause();
    sunrise.pause();
    chatgpt.pause();

    // Determine the specific audio for the current slide
    const currentIndex = swiper.realIndex;
    const currentSlide = swiper.slides[currentIndex];
    const dataId = currentSlide.getAttribute('data-id');

    if(dataId === '1'){
        hum.currentTime = 0;
        hum.play();
    }
    if(dataId === 'timeline2_2'){
        fail.currentTime = 0;
        fail.play();
    }
    if(dataId === 'timeline1_1'){
        yay.currentTime = 0;
        yay.play();
    }
    if(dataId === 'timeline1_2'){
        hum.currentTime = 0;
        hum.play();
    }
    if(dataId === 'timeline2_1'){
        huh.currentTime = 0;
        huh.play();
    }
    if(dataId === 'timeline2_2'){
        fail.currentTime = 0;
        fail.play();
    }
    if(dataId === '2'){
        motivation.currentTime = 0;
        motivation.play();
    }
    if(dataId === '3'){
        alarm.currentTime = 0;
        alarm.play();
    }
    if(dataId === '4'){
        chatgpt.currentTime = 0;
        chatgpt.play();
    }
    if(dataId==='choice'){
        heart_beat.currentTime = 0;
        heart_beat.play();
    }
    if(dataId==='start'){
        sunrise.currentTime = 0;
        sunrise.play();
    }
}



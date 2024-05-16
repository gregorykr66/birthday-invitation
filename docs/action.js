const boyElement = document.querySelector('.boy');
const boyTextElement = document.querySelector('.boy-and-text');
const messageElement = document.getElementById('message');
const imageElement = document.getElementById('image-object'); 
let isFirstClick = true;

const messages = [
{ message: "Hi there!", boy : "items/boy-1-2.png", is_moving: false },
{ message: "Good to see you!", boy : "items/boy-1-1.png", is_moving: false },
{ message: "You know where else it would be great to see you?", boy : "items/boy-1-1.png", is_moving: false },
{ message: "At my birthday party!", boy : "items/boy-1-3.png", is_moving: false },
{ message: "I'm turning 30 this summer (gosh!)", boy : "items/boy-1-2.png", is_moving: false },
{ message: "And I think the best way to celebrate it...", boy : "items/boy-1.png", is_moving: false },
{ message: "Is to bring all my closest friends and enjoy a few summer days together!", boy : "items/boy-1-3.png", is_moving: false },
{ message: "For that occasion I'm booking a beautiful house", boy : "items/boy-1-2.png", is_moving: false },
{ message: "With a lush garden..", boy : "items/boy-1-2.png", is_moving: false },
{ message: "In the most beautiful summer region of Sweden - Österlen", boy : "items/boy-1-1.png", is_moving: false },
{ message: "For the whole week!", boy : "items/boy-1-3.png", is_moving: false },
{ message: "...", boy : "items/boy-1-2.png", is_moving: false },
{ message: "Follow me there!", boy : "items/boy-1-1.png", is_moving: true }, 
{ message: "This place will provide us plenty of opportunities to.. ", boy : "items/boy-1-2.png", is_moving: false },
{ message: "Bike around!", boy : "items/boy-1-3.png", is_moving: false, object: { path: "items/bike-1.png", class:"bike" }},
{ message: "Hike in the woods!", boy : "items/boy-1-2.png", is_moving: false, object: { path: "items/backpack.png", class: "bike" }},
{ message: "Explore local bakeries and restaurants", boy : "items/boy-1-1.png", is_moving: false, object: { path: "items/cinnamon.png", class: "cinnamon" }},
{ message: "Check out local museums", boy : "items/boy-1-1.png", is_moving: false, object: { path: "items/camera.png", class: "camera" } },
{ message: "Hang out at the most beautiful beach in Sweden", boy : "items/boy-1-2.png", is_moving: false, object: { path: "items/ball.png", class: "bike" }},
{ message: "Eat tons of apples!", boy : "items/boy-1-3.png", is_moving: false, object: { path: "items/apple.png", class: "apple" } },
{ message: "Play board and video games", boy : "items/boy-1-1.png", is_moving: false, object: { path: "items/joy-stick.png", class: "joy-stick" } },
{ message: "Chill out in a hammock in the garden..", boy : "items/boy-1-2.png", is_moving: false, object: { path: "items/hammock.png", class: "bike" }},
{ message: "Zzzzz", boy : "items/boy-1.png", is_moving: false},
{ message: "Well..", boy : "items/boy-1.png", is_moving: false},
{ message: "What is a summer dream for YOU?", boy : "items/boy-1-2.png", is_moving: false, object: { path: "", class: "" }},
{ message: "Let's make it happen!", boy : "items/boy-1-3.png", is_moving: false},
{ message: "...", boy : "items/boy-1-1.png", is_moving: false, triggerEvent: true },
{ message: "...", boy : "items/boy-1-1.png", is_moving: false},
{ message: "Just one last thing...", boy : "items/boy-1-2.png", is_moving: false },
{ message: "Remember, the best birthday present you can give me is...", boy : "items/boy-1.png", is_moving: false},
{ message: "To dream these summer days with me!", boy : "items/boy-1-3.png", is_moving: false},
{ message: "That's all for now!", boy : "items/boy-1-2.png", is_moving: false },
{ message: "Hej då!", boy : "items/boy-1-1.png", is_moving: false, triggerEventFinal: true }
];

let currentIndex = 0;
let currentPosition = 0;
let isAnimating = false;
let imagesDisplayed = false;
let finalEvent = false;

// Get names from URL parameter and handle multiple names
const urlParams = new URLSearchParams(window.location.search);
const namesParam = urlParams.get('name');
const names = namesParam ? namesParam.split(',').map(name => name.trim()) : [];

// Update the first message based on names
if (names.length > 0) {
  messages[0].message = `Hi ${names.join(' and ')}!`;
} else {
  messages[0].message = "Hello there!"; 
}

document.addEventListener('click', function(event) {
  if (!isAnimating && !imagesDisplayed && !finalEvent) {
    isAnimating = true;

    const currentMessage = messages[currentIndex];
    const hasImage = currentMessage.object && currentMessage.object.path;

    boyElement.src=currentMessage.boy
      if (isFirstClick) {
      document.getElementById('background-music').play();
      isFirstClick = false;
    }

    // Boy movement animation (only if is_moving is true)
  if (currentMessage.is_moving) {
      const viewportWidth = window.innerWidth;
      const walkDistance = viewportWidth * 0.40; // Calculate 15% of viewport width
      const animation = boyTextElement.animate([{ left: `${currentPosition}px` }, { left: `${currentPosition - walkDistance}px` }], {
        duration: 3000,
        easing: 'ease-in-out'
      });

      animation.finished.then(() => {
        isAnimating = false;
        currentPosition -= walkDistance;
        boyTextElement.style.left = `${currentPosition}px`;
      });
    } else {
      isAnimating = false; 
    }

    if (currentMessage.object) {
        imageElement.src = currentMessage.object?.path || "";
        imageElement.className = hasImage ? `object-right fade-in ${currentMessage.object.class}` : 'object-right fade-in hidden'; 
      };

    // Update message and index
    currentIndex = (currentIndex + 1) % messages.length;
    messageElement.textContent = currentMessage.message;

    // Trigger the final event if it's time
    if (currentMessage.triggerEvent) {
     const scrollAndTextContainer = document.querySelector('#scroll-and-text'); 
    scrollAndTextContainer.classList.remove('hidden-2');  
    scrollAndTextContainer.classList.add('fade-in-container'); // Add fade-in directly

    imagesDisplayed = true;
    }
  }


  if (!isAnimating && imagesDisplayed && !finalEvent) {
    const currentMessage = messages[currentIndex];
     boyElement.src=currentMessage.boy
    currentIndex = (currentIndex + 1) % messages.length;
    messageElement.textContent = currentMessage.message;

    if (currentMessage.triggerEventFinal) {
       finalEvent=true;
       imagesDisplayed = false;
  }
  }
});

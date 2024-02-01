window.addEventListener('scroll', () => {
    const verticalScrollPx = window.scrollY || window.pageYOffset;
  
    if (verticalScrollPx < 500) {
        document.getElementById("background").style.backgroundImage = "url('background.png')";
        
    } else if (verticalScrollPx > 500 && verticalScrollPx < 1000) {
        document.getElementById("background").style.backgroundImage = "url('sandman1.png')";
    } else if (verticalScrollPx > 1000 && verticalScrollPx < 1500) {
        document.getElementById("background").style.backgroundImage = "url('sandman2.png')";
    } else if (verticalScrollPx > 1500 && verticalScrollPx < 2000) {
        document.getElementById("background").style.backgroundImage = "url('sandman3.png')";
    } else if (verticalScrollPx > 2000 && verticalScrollPx < 2500) {
        document.getElementById("background").style.backgroundImage = "url('sandman4.png')";
    }
    
  });
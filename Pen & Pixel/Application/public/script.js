// Function to display the popup without delay when the mouse is moving
function displayPopupOnMouseMove() {
    document.getElementById('popup').style.display = 'block';
  }
  
  // Function to display the popup after 10 seconds
  function displayPopup() {
    setTimeout(function() {
      document.getElementById('popup').style.display = 'block';
    }, 10000); // 10 seconds
  }
  
  // Function to close the popup
  function closePopup() {
    document.getElementById('popup').style.display = 'none';
    // Re-display the popup after 5 seconds
    setTimeout(function() {
      document.getElementById('popup').style.display = 'block';
    }, 5000); // 5 seconds
  }
  
  // Call displayPopup when the page loads
  window.onload = function() {
    displayPopup();
  };
  
  // Add event listener to detect mouse movement
  document.addEventListener('mousemove', displayPopupOnMouseMove);
  
  
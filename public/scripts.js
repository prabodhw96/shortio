// Cache DOM elements in memory
var form   = document.getElementById('shorten-form');
var urlBox = form.elements[0];
var link   = document.getElementById('link');
var shrBox = document.getElementById('shortened');
// Callback function passed to Axios' .post().then()
function displayShortenedUrl(response) {
  link.textContent = response.data.shortUrl;
  link.setAttribute(
    'href', response.data.shortUrl
  ); // Set the link's href attribute
  shrBox.style.opacity = '1';
  urlBox.value = ''; // Reset input
}
// Callback function passed to Axios' error handler
function alertError(error) {
  // Handle server or validation errors
  alert('Are you sure the URL is correct? Make sure it has http:// at the beginning.');
}
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Send the POST request to the backend
  axios.post('/new', { url: urlBox.value })
       .then(displayShortenedUrl)
       .catch(alertError);
});

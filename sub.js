const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)


fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event/"+id)
  .then(res=>res.json())
.then(showEvent)


function showEvent(Event){
  console.log(Event)
  document.querySelector("article h1").textContent=Event.title.rendered
}

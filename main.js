//when the page loads, call the init function
window.addEventListener("DOMContentLoaded", init);

function init(){
	const urlParams = new URLSearchParams(window.location.search);
	//grab search=something from the url (it might not exist)
	const search = urlParams.get("search");
	//grab id=something from the url (it might not exist)
	const id = urlParams.get("id");
	const category = urlParams.get("category");

	if(search){ //if search has a value
		getSearchData();
	  } else if(id){
		getSingleEvent();
      } else if(category){
		//category stuff
		getCategoryData(category)
	  } else {
		getFrontpageData();
	  }
	getNavigation()
  }

function getNavigation(){
	fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/categories?perPage=100")
	.then(res=>res.json())
	.then(data=>{
		//console.log(data)
		data.forEach(addLink)
	})
}

function addLink(oneItem){
	//console.log(oneItem)
	//document.querySelector("nav").innerHTML += oneItem.name
	if(oneItem.parent === 14 && oneItem.count > 0){
	 const link = document.createElement("a");
	 link.textContent=oneItem.name;
	 link.setAttribute("href", "category.html?category="+oneItem.id)
	 document.querySelector("nav").appendChild(link);
  }
}

function getSearchData(){
	const urlParams = new URLSearchParams(window.location.search);
	const search = urlParams.get("search");

	fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed&search="+search)
	 .then(res=>res.json())
	 .then(handleData)
}
function getFrontpageData(){
	fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed")
	.then(res=>res.json())
	.then(handleData)
}

function getCategoryData(catId){
	console.log(catId)
	fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed")
	.then(res=>res.json())
	.then(handleData)
}

function getSingleEvent(){
	const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)

fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event/")
	 .then(res=>res.json())
	 .then(showEvent)

function showEvent(Event){
		console.log(Event)
		document.querySelector("article h1").textContent=Event.title.rendered
	}
}

function handleData(myData){
	//console.log(myData);
	myData.forEach(showPost);
    const postCopy = document.querySelector(".postTemplate").content;
	postCopy.cloneNode(true);
}

function showPost(post){
	console.log(post)

	const template = document.querySelector(".postTemplate").content;
	const postCopy = template.cloneNode(true);
	//text content & inner Html
	var h1 = postCopy.querySelector("h1");
	h1.textContent=post.title.rendered;

	const img = postCopy.querySelector(".cover");


	const a = postCopy.querySelector("a");
	a.href="sub.html?id="+post.id

    const desc = postCopy.querySelector(".desc");
    desc.innerHTML = post.content.rendered

    const date = postCopy.querySelector(".date");
    date.textContent = post.event_date

    const price = postCopy.querySelector(".price");
    price.textContent = post.price

    const place = postCopy.querySelector(".place");
    place.textContent = post.place

    const extra_description = postCopy.querySelector(".extra_description");
    extra_description.textContent = post.extra_description

    const event_image = postCopy.querySelector(".event_image");
    event_image.src = post.event_image.guid

    const timetable = postCopy.querySelector(".timetable");
    timetable.textContent = post.timetable

    const event_video = postCopy.querySelector(".event_video");
    event_video.src = post.event_video

	document.querySelector("#posts").appendChild(postCopy)

}








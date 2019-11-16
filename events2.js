window.addEventListener("DOMContentLoaded", getData);

function getData(){
	console.log("getData")
	fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event/")
	.then(res=>res.json())
	.then(handleData)
}
function handleData(myData){
	console.log(myData);
	//1 loop
	myData.forEach(showPost)
}

function showPost(post){
  console.log(post)
	//cloning a template
	const template = document.querySelector(".postTemplate").content;
	const postCopy = template.cloneNode(true);
	//textcontent inner html
	const h1 = postCopy.querySelector("h1");
	h1.textContent=post.title.rendered;
	//append
   document.querySelector("#posts").appendChild(postCopy)
}

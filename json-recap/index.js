window.addEventListener("DOMContentLoaded", getData);

function getData(){
    console.log("getData")
    fetch("https://cosmicstryder.dk/wordpress/wp-json/wp/v2/event/")
    .then(res=>res.json())
    .then(handleData)
}

function handleData(myData){
    console.log(myData)
    myData.forEach(showpost)
}

function showpost(post){
    console.log(post)

    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    const h1 = postCopy.querySelector("h1");
    h1.textContent = post.title.rendered

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

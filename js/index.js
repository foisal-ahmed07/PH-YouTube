function getTimeString(time) {
  const hours = parseInt(time / 3600);
  let remainSecond = time % 3600;
  const minute = parseInt(remainSecond / 60);
  remainSecond = remainSecond % 60;

  return `${hours} hours ${minute} minute ${remainSecond} second ago `;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// 1 - fetch, load and  show catagories on html

// creating loadCatagories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// creating videoCatagories
const loadVideo = (searchText = '') => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// button event
const loadCategoryVideo = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove activation from btn
      removeActiveClass();

      // active btn
      const activeBtn = document.getElementById(`btn-${id}`);
      console.log(activeBtn);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video)
}
const displayDetails = (video) => {
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
  <img class="rounded-lg" src=${video.thumbnail} />
  <P class = "text-gray-500">${video.description}</P>
  
  
  `

  document.getElementById("showModal").click()


}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class = "w-full min-h-[300px] flex flex-col gap-5 justify-center items-center">

    <img class = "" src="./assets/Icon.png" alt="No Videos">

    <p class ="text-3xl font-bold text-center">'Oops!! Sorry, There is no <br> content here'</p>
    
    </div>
    
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
     <figure class = "h-[200px] relative">
    <img
      src=${video.thumbnail}
      class = "h-full w-full rounded-lg object-cover"
      alt="videos" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class ="absolute bottom-2 text-xs  right-5 text-white bg-black p-2 rounded-lg">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
  <div>
    <img class = "w-10 h-10 rounded-full object-cover" src =${
      video.authors[0].profile_picture
    } />
  </div>
  <div>
  <h2 class = "font-bold"> ${video.title} </h2>

  <div class= "flex gap-2 items-center">
  <p class = "text-gray-500">${video.authors[0].profile_name} </p>

  ${
    video.authors[0].verified === true
      ? `<img class = "w-5 h-5" src ="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>`
      : ""
  }

  </div>

  <p class = "text-gray-500">${video.others.views} views </p>
  
  </div>     
  </div>

  <div>

  <p> <button onclick="loadDetails('${video.video_id}') "class= "btn btn-sm btn-error">details</button> </p>
  
  
  </div>



    `;
    videoContainer.append(card);
    console.log(video);
  });
};

// creating displayCatagories
const displayCatagories = (catagories) => {
  const catagoriesContainer = document.getElementById("catagories");

  catagories.forEach((item) => {
    // creating btn
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
    <button id = "btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class = "btn category-btn">${item.category}</button>
    `;

    

    catagoriesContainer.append(buttonContainer);
  });
};
document.getElementById("search-input").addEventListener("keyup", (e) =>{
  loadVideo(e.target.value)


})

loadCatagories();
loadVideo();

function getTimeString(time) {
  const hours = parseInt(time / 3600);
  let remainSecond = time % 3600;
  const minute = parseInt(remainSecond / 60);
  remainSecond = remainSecond % 60;
  
  return `${hours} hours ${minute} minute ${remainSecond} second ago `;
}

// 1 - fetch, load and  show catagories on html

// creating loadCatagories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// creating videoCatagories
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
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
          : `<span class ="absolute bottom-2   right-5 text-white bg-black p-2 rounded-lg">${getTimeString(
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
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    catagoriesContainer.append(button);
  });
};

loadCatagories();
loadVideo();

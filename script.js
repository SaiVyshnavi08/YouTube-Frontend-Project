const searchInput = document.getElementById("search-input");
const apiKey =   "AIzaSyBaQREIuXrw9-EeVxCgPmjD4CsqhVlwVKM"
// "AIzaSyA8AVxQdFymHauVcQP4UDrPPAQ6I8T-kyQ" 
localStorage.setItem("api_key" , apiKey);
const container = document.getElementById("container");
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=saibaba&key=AIzaSyBaQREIuXrw9-EeVxCgPmjD4CsqhVlwVKM  --> part = snippet
//https://youtube.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyBaQREIuXrw9-EeVxCgPmjD4CsqhVlwVKM&id=QKf_JPbN6Lw       -->part=statistics
function searchVideos(){
let searchValue = searchInput.value;
//now you have to fetch the list of videos for the given searchInput
 fetchVideos(searchValue);

}

async function fetchVideos(searchValue){

    let endpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchValue}&key=${apiKey}`
    // since I am makimg a api call   
   // as we have to fetch the videos from the given api , we have to use fetch method and it returns promise , if it throws an error we have to catch it so we are using try catch block
   try{
    let response = await fetch(endpoint);   // this will return an instance of response(builtin class)
    let result = await response.json();    // we are converting it into jsonform

    for(let i=0 ; i<result.items.length ; i++){    // iterating over the array items that is inside the result which was converted to json format
     let video = result.items[i];
     let videoStats = await fetchStats(video.id.videoId);
    //  console.log(videoStats.items[0].contentDetails.duration);
     if(videoStats.items.length > 0)
     result.items[i].videoStats = videoStats.items[0].statistics;   // we are adding another key called videoStats in items (like snippet)
     result.items[i].duration = videoStats.items[0] && videoStats.items[0].contentDetails.duration;
    }
    // console.log(videoStats);
    showThumbnails(result.items);
     

   }
   catch(error){
     console.log(error);
   }
}

function getViews(n){
  if(n<1000) return n;
  else if(n>=1000 && n<=999999){
    n = n/1000;
    n= parseInt(n);
    return n + "K";
  }
  else if(n>1000000){
    n = n/1000000;
    n= parseInt(n);
    return n + "M";
  }
}

function showThumbnails(items){
    for(let i=0 ; i < items.length; i++){
        let videoItem = items[i];
        let Imageurl = videoItem.snippet.thumbnails.high.url;
        let videoElement = document.createElement("div");

        //adding event listener to the div element videoElement , so that when the user clicks on it , it will play the video of that particular id

        videoElement.addEventListener("click" , () => {
          navigateToVideo(videoItem.id.videoId);
        })
        
        const videoChildern = `
        <img src ="${Imageurl}"/>
        <b>${formattedData(videoItem.duration)}</b>
        <p class="title"> ${videoItem.snippet.title}</p>
        <p class="channel-name">${videoItem.snippet.channelTitle}</p>
        <p class="updated-on">${videoItem.videoStats ? getViews(videoItem.videoStats.viewCount)+" views" : "NA"}</P>
        `;
        videoElement.innerHTML = videoChildern;
       container.append(videoElement);
        
    }
}

 async function fetchStats(videoId){
  const endpoint =`https://youtube.googleapis.com/youtube/v3/videos?part=statistics , contentDetails&key=${apiKey}&id=${videoId}`
  let response = await fetch(endpoint);
  let result =await response.json();
  return result;   // we are capturing the reult that is the statistics of the video and returning to fetchStats function
}

function formattedData(duration){

  if( !duration) return "NA";
  var numberPattern = /\d+/g;
  
  // Using the match() method with the regular expression pattern
  var numbers = duration.match(numberPattern);
  var formattedNumbers = numbers.join(':');
   return formattedNumbers;
}


function navigateToVideo(videoId){
 
  // console.log(videoId);
  let path =`YouTube%20clone/video.html`;
  if(videoId){
    //only if it is present
   

    document.cookie = `video_id= ${videoId} ; path=${path}`
    let linkItem =document.createElement("a");
    linkItem.href="http://127.0.0.1:5500/YouTube%20clone/video.html";
    linkItem.target="_blank";
    linkItem.click();

  }
  else{
    alert("Go and watch in youtube");
  }
}
let cookieString = document.cookie ;  // we will get cookie data (_octo=GH1.1.1285600389.1679766701) and we have to split it at =
let videoId = cookieString.split(";")[0].split("=")[1];
console.log(videoId);

// let videoId = cookieString.split("=")[1];
// console.log(videoId); // now we will get the video id (GH1.1.1285600389.1679766701) on clicking on the div we will be navigated to the video which has this videoId
//Now we want to play the video  => There is a class called YT  available in browser and it has a static method called Player
const apiKey = localStorage.getItem("api_key")

let firstScript = document.getElementsByTagName("script")[0];

firstScript.addEventListener("load" , onLoadScript);

function onLoadScript(){
    if(YT){
        new YT.Player("sai" , {
            height: "450",
            width:"800",
            videoId, 
            events: {
                onReady : (event) => {
                    document.title = event.target.videoTitle;
                    extractVideoDetails(videoId);
                   
                    fetchStats(videoId);
                }
            }
       });
    }
}


const statsContainer = document.getElementsByClassName("video-details")[0];

console.log("hi");

 async function extractVideoDetails(videoId){
    let endpoint = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;

    try{
    let response = await fetch(endpoint);
    let result = await response.json();
    renderComments(result.items);
    }
    catch(error){
     console.log(`Error occured` , error)
    }

}
let result;
async function fetchStats(videoId){
    console.log("Inside fetchstats", "hi" ,videoId,"hi" ,apiKey);
   
   let endpoint= `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${apiKey}&id=${videoId}`;
   console.log(apiKey , videoId);
try{
     const response = await fetch(endpoint);
    const result = await response.json();

     console.log(result , "stats");
    //  return;
     const item = result.items[0];

     const title = document.getElementById("title");
     title.innerText=item.snippet.title;
   statsContainer.innerHTML=  `
 
   <div class="profile">
   <img src="./download.jpg" class="channel-logo" alt="">
   <div class="owner-details">
       <span style= "color:black" >${item.snippet.channelTitle}</span>
       <span class="sub">20 Subscribers</span>
   </div>
 </div>
   <div class="stats">
     <div class="like-container">
       <div class="like">
           <span class="material-icons">thumb_up</span>
           <span>${item.statistics.likeCount}</span>
          </div>
          <div class="like">
           <span class="material-icons">thumb_down</span>
           <span></span>
          </div>
     </div>
     <div class="comments-container">
       <span class="material-icons">comment</span>
       <span>${item.statistics.commentCount   }</span>
     </div>
   </div>
   `
  
    


     
   }
   catch(error){
      console.log("error" , error);
   }
}

function renderComments(commentsList){
     const commentsContainer = document.getElementById("comments-container");
     
     for(let i=0 ;i<commentsList.length ; i++){
     let comment = commentsList[i];
     const topLevelComment = comment.snippet.topLevelComment;
     let commentElement = document.createElement("div");
     commentElement.className ="comment";
     commentElement.innerHTML= `
     <img src="${topLevelComment.snippet.authorProfileImageUrl}">
               <div class="comment-right-half">
                <b style="font-size: 10px">${topLevelComment.snippet.authorDisplayName}</b>
                <p style="font-size: 10px">${topLevelComment.snippet.textOriginal}</p>
                <div style="display: flex; gap:20px ; font-size: 10px;">
                    <div class="like">
                        <span class="material-icons">thumb_up</span>
                        <span>${topLevelComment.snippet.likeCount}</span>
                    </div>
                    <div class="like">
                        <span class="material-icons">thumb_down</span>
                        <span></span>
                    </div>
                </div>
               </div>
     
     `;

     commentsContainer.append(commentElement);

     }
}



// var iframeElem = document.getElementById("sai");
//    iframeElem.src = `https://www.youtube.com/embed/${videoId}`









/***
 *  try{
//     // const response = await fetch(endpoint);
//      //const result = await response.json();
//      console.log(endpoint,"insidie the try")
//      fetch(endpoint)
//      .then(response => {
//        if (!response.ok) {
//          throw new Error('Request failed');
//        }
//        return response.json();
//      })
//      .then(data => {
//        // Work with the fetched data here
//        console.log(data);
//        result=data;
//      })
//      .catch(error => {
//        // Handle any errors that occurred during the request
//        console.error(error);
//      });
//      console.log(result , "stats");
     
//      const item = result.items[0];
//      console.log(item,"abc");
//      console.log(item)
 */


// let cookieString=document.cookie;
// // console.log(cookieString)
// let videoId=cookieString.split("=")[1];
// //let videoId="xKN1tYxCquU";
// console.log(videoId , " helloworld");
// const apiKey=localStorage.getItem("api_key");
// //let apiKey="AIzaSyDHcSPatTeBHKbqlals63Cuj8ngPCBgpW8";
// let statsContainer=document.getElementsByClassName("video-details")[0];
// let firstScript=document.getElementsByTagName("script")[0];
// firstScript.addEventListener("load",onLoadScript);

// function onLoadScript(){

//     if(YT)
//     {
//         new YT.Player("loadVideo",{
//             height:"500",
//             width:"850",
//             videoId,
//             events:{
//                 onReady:(event)=>{
//                     document.title=event.target.videoTitle,
//                     //console.log(videoId)
//                     extractVideoDetails(videoId);
//                     fetchStats(videoId);
//                 }
                
//             }
//         })
//     }
// }
    
// async function extractVideoDetails(videoId)
// {
//     let endpoint=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;
//     try{

//         let response=await fetch(endpoint);
//         //console.log(response);
//         let result=await response.json();
//         //console.log(result);
//     }
//     catch(error){
//         console.log("error",error);
//     }
// }
// async function fetchStats(videoId)
// {
//     let endpoint=`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${apiKey}&id=${videoId}`;
//     try{
//         let response=await fetch(endpoint);
//         let result=await response.json();
//         console.log(result,"stats");
//         //return;
//         const item=result.items[0];
//         const title=document.getElementById("title");
//         title.innerText=item.snippet.title;
//         title.style.color="black";
//         title.style.fontSize="20px";

//         statsContainer.innerHTML=`
        
//             <div class="profile">
//             <img src="" class="channel-logo" alt="">
//             <div class="owner-details">
//                 <span style="color:white">${item.snippet.channelTitle}</span>
//                 <span style="color:gray">20 subscribers</span>
//             </div>
//         </div>
//         <div class="stats">
//             <div class="like-container">
//                 <div class="like">
//                     <span class="material-symbols-outlined">
//                         thumb_up
//                         </span>
//                     <span>${item.statistics.likeCount}</span>
//                 </div>
//                 <div class="like">
//                     <span class="material-symbols-outlined">
//                         thumb_down
//                         </span>
//                 </div>
//             </div>
//             <div class="comments-container">
//                 <span class="material-icons">comments</span>
//                 <span>${item.statistics.commentCount}</span>
//             </div>
//         </div>`
//     }
//     catch(error){
//         console.log("error",error);
//     }
// }


// console.log("okay")
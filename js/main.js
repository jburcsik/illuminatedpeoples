var currImg = 0;
var imgList = Array();

$(document).ready(function(){

    // Handles error for JSON request
    $.ajaxSetup({
        "error":function(){
            $(".img-feed").html("<p class='error'>Sorry, we weren't able to find any entries to show right now. Check back later!</p>")
        },
        cache: false
    });

    // Fetching currently cached Tweets/Instas
    $.getJSON("js/results_c.json", function(data){

        var tweets = data[0];
        var instas = data[1];

        console.log(tweets.data);
        console.log(instas.data);

        if (tweets.statuses != null){
            // Add Twitter posts to array
            for (var i = 0; i < tweets.statuses.length; i++){
                if (tweets.statuses[i].entities.media && tweets.statuses[i].text.indexOf("RT ") != 0){
                    var tweetTime = new Date(tweets.statuses[i].created_at) / 1000;

                    imgList[imgList.length] = {
                        postType: "Twitter",
                        user: tweets.statuses[i].user.screen_name,
                        imgSource: tweets.statuses[i].entities.media[0].media_url,
                        favourites: tweets.statuses[i].favorite_count,
                        imgW: tweets.statuses[i].entities.media[0].sizes.large.w,
                        imgH: tweets.statuses[i].entities.media[0].sizes.large.h,
                        message: tweets.statuses[i].text,
                        created: tweetTime
                    };
                }
            }
        }

        if (instas.data != null){
            // Add Instagram posts to array
            for (var i = 0; i < instas.data.length; i++){
                imgList[imgList.length] = {
                    postType: "Instagram",
                    user: instas.data[i].user.username,
                    imgSource: instas.data[i].images.standard_resolution.url,
                    likes: instas.data[i].likes.count,
                    imgW: instas.data[i].images.standard_resolution.width,
                    imgH: instas.data[i].images.standard_resolution.height,
                    message: instas.data[i].caption !== null ? instas.data[i].caption.text : "",
                    created: instas.data[i].created_time
                };
            }
        }

        imgList.sort(timeSort);

        // Output images from array items
        writeImg(imgList);

        // Prepare More bar for click
        $(".more").children().on("click", writeImg);
    });
});


// Sorts image array based on time created
function timeSort(a, b){
    if (a.created > b.created){
        return -1;
    }
    else if (a.created < b.created){
        return 1;
    }
    return 0;
}

// Encodes string for html
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Outputs images into preview cards
function writeImg(){
    var offset = currImg;

    for (var k = 0; k + offset < imgList.length && k < 20; k++){
        var imgClass = "";
        var titleTxt = "";
        var metaTxt = "";
        var imgStyle = "";
        var i = k + offset;

        // Changing contents based on post type
        if (imgList[i].postType === "Twitter"){
            titleTxt = "<div class='title'><img src='img/tweet.png' alt='' /><span>" + htmlEntities(imgList[i].user) + "</span></div>";
            metaTxt = "<div class='meta'><span>" + imgList[i].favourites + "</span><img src='img/favourite.png' alt='favourites' /></div>";
        }
        else if (imgList[i].postType === "Instagram"){
            titleTxt = "<div class='title'><img src='img/insta.png' alt='' /><span>" + htmlEntities(imgList[i].user) + "</span></div>";
            metaTxt = "<div class='meta'><span>" + imgList[i].likes + "</span><img src='img/like.png' alt='likes' /></div>";
        }
        else{
            titleTxt = "<div>" + htmlEntities(imgList[i].user) + "</div>";
        }

        // Applying styling to image based on dimensions
        if (imgList[i].imgW > imgList[i].imgH){
            imgClass="img-hor";

            var padTop = Math.floor(175 - 175 / imgList[i].imgW * imgList[i].imgH) / 2 + 5;
            imgStyle = "padding-top:" + padTop.toString() + "px";
        }
        else{
            imgClass="img-vert";
        }

        $(".img-feed").append("<div class='entry'><a rel='img-group' title='" + htmlEntities(imgList[i].user) + (imgList[i].message != "" ? ": " : "") + htmlEntities(imgList[i].message) + "' href='" + imgList[i].imgSource + "' class='fancy-img'></a>" + titleTxt + "<img style='" + imgStyle + "' class='" + imgClass + "' src='" + imgList[i].imgSource + "' alt='' onerror='imgError(this)' />" + metaTxt + "</div>");
        currImg++;
    }

    $(".fancy-img").fancybox({
        openEffect: "elastic",
        helpers:{
            title:{
                type: "inside"
            }
        }
    });

    // Hide "See More" if no more images are available
    if (currImg >= imgList.length){
        $(".more").hide();
        $(".more").children().off("click", writeImg);
    }
}

// Handles image error
function imgError(img){
    $(img).parent().hide();
    $(img).siblings("a").attr("rel", "");
}
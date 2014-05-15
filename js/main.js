var currImg = 0;
var imgList = Array();
var imgListC = Array();
var imgListH = Array();
//var characters = new Array('c','h'/*,'i','n','a','t','o','w','n2'*/);
var chrs;

$(document).ready(function(){

    // Handles error for JSON request
    $.ajaxSetup({
        "error":function(){
            $(".img-feed").html("<p class='error'>Sorry, we weren't able to find any entries to show right now. Check back later!</p>")
        },
        cache: false
    });

    //console.log('HELLO ***');
    //var window.characters = new Array('c','h'/,'i','n','a','t','o','w','n2'*/);

   
      //  console.log(characters);
      //  console.log(characters[chrs]);
     //   console.log('* Currently doing it for the letter' + characters[chrs]);

        // Fetching currently cached Tweets/Instas
        //var currFile = "js/results_+"characters[chrs]+".json";
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

                        imgListC[imgListC.length] = {
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
                    imgListC[imgListC.length] = {
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

            imgListC.sort(timeSort);

            // Output images from array items
            
            doSomething('c');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_h.json", function(data){
    
            var tweets = data[0];
            var instas = data[1];

            console.log(tweets.data);
            console.log(instas.data);

            if (tweets.statuses != null){
                // Add Twitter posts to array
                for (var i = 0; i < tweets.statuses.length; i++){
                    if (tweets.statuses[i].entities.media && tweets.statuses[i].text.indexOf("RT ") != 0){
                        var tweetTime = new Date(tweets.statuses[i].created_at) / 1000;

                        imgListH[imgListH.length] = {
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
                    imgListH[imgListH.length] = {
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

            imgListH.sort(timeSort);

            // Output images from array items
            
            doSomething('h');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_i.json", function(data){
    
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
            
            doSomething('i');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_n.json", function(data){
    
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
            
            doSomething('n');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_a.json", function(data){
    
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
            
            doSomething('a');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_t.json", function(data){
    
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
            
            doSomething('t');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_o.json", function(data){
    
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
            
            doSomething('o');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_w.json", function(data){
    
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
            
            doSomething('w');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
        
        $.getJSON("js/results_n.json", function(data){
    
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
            
            doSomething('n2');
                   
            // Prepare More bar for click
            $(".more").children().on("click", writeImg);
        });//end getJSON
         
   


});
// End for loop

function doSomething(letter) {
    // RRemove Whats in there and load another
    var currImgSelector = ".img-feed-" + letter;
    console.log('* Inside of doSomething: ' + currImgSelector);
    $(currImgSelector).html('');
    
    switch(letter)
    {
        case 'c': writeImg(imgListC, 'c');
       
        case 'h': writeImg(imgListH, 'h');
    }
   
}

/*(function loop() {
    var rand = Math.round(Math.random() * (10000 - 1000)) + 1000;
    setTimeout(function() {
            doSomething();
            loop();  
    }, rand);
}());
*/

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
function writeImg(imgList, currChar){
    var offset = currImg;

    var k = Math.floor((Math.random() * imgList.length));

    console.log('** The COunter is: ' + k);
        var imgClass = "";
        var titleTxt = "";
        var metaTxt = "";
        var imgStyle = "";
       // var i = k + offset;
       
        // Changing contents based on post type
        if (imgList[k].postType === "Twitter"){
            titleTxt = "<div class='title'><span>" + htmlEntities(imgList[k].user) + "</span></div>";
            metaTxt = "";
        }
        else if (imgList[k].postType === "Instagram"){
            titleTxt = "<div class='title'><span>" + htmlEntities(imgList[k].user) + "</span></div>";
            metaTxt = "";
        }
        else{
            titleTxt = "<div>" + htmlEntities(imgList[k].user) + "</div>";
        }

        // Applying styling to image based on dimensions
        if (imgList[k].imgW > imgList[k].imgH){
            imgClass="img-hor";

            var padTop = Math.floor(175 - 175 / imgList[k].imgW * imgList[k].imgH) / 2 + 5;
            imgStyle = "padding-top:" + padTop.toString() + "px";
        }
        else{
            imgClass="img-vert";
        }

        $(".img-feed-"+currChar).append("<div class='entry'><a rel='img-group' title='" + htmlEntities(imgList[k].user) + (imgList[k].message != "" ? ": " : "") + htmlEntities(imgList[k].message) + "' href='" + imgList[k].imgSource + "' class='fancy-img'></a>" + titleTxt + "<img style='" + imgStyle + "' class='" + imgClass + "' src='" + imgList[k].imgSource + "' alt='' onerror='imgError(this)' />" + metaTxt + "</div>");
        // currImg++;
    //}

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
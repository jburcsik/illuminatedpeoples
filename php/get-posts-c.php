<?php

// Gets relevant Tweets
session_start();
require_once('twitteroauth/twitteroauth/twitteroauth.php'); //Path to twitteroauth library
 
$twitteruser = "jesseburcsik";
$consumerkey = "jBKXukPjoZE1rAPUoqFE5oUCV";
$consumersecret = "NJN2GuxxU71cae4R4jK93emjTKGbUKgOhLmJPGBbscHU7uV0e2";
$accesstoken = "14063616-Ujq1sv8yK2PZPrg0eDmUt9E4vkQto06cyop26AylL";
$accesstokensecret = "XFB5PxurJbyaKyKdOeP9PqM6c3C9YEn1aZFuBjjLiUSoM";
  
$connection = new TwitterOAuth($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=illpeeps&count=100&result_type=recent");


// Gets relevant Instagram photos
$searchTag = "illpeeps_c";
$clientId = "69ac1274ef9e4ee7967a6626438b1eee";

$baseUrl = "https://api.instagram.com/v1";
$queryPath = "/tags/$searchTag/media/recent";
$instaQueryString = $baseUrl . $queryPath . "?client_id=" . $clientId;

$instaResponse = callInstagram($instaQueryString);


// Find tweets that contain an image and are not retweets
$imgTweets = null;
for ($i = 0; $i < count($tweets->statuses); $i++){

	// Keeping only non-retweeted image-containing tweets

	if (isset($tweets->statuses[$i]->entities->urls) && (strpos($tweets->statuses[$i]->text, "RT ")===false)){
		
                if(strpos($tweets->statuses[$i]->text, $searchTag)!==false)
                {
                        $imgTweets->statuses[] = $tweets->statuses[$i];
                }
	}
}

// Sort and write results to JSON file
$results[0] = $imgTweets;
$results[1] = json_decode($instaResponse);

$path = "../js/results_c.json";
$backup = "../js/archive_c.json";

// If file exists, read and add to array - otherwise, write to new file
if (file_exists($path)){
	$current = json_decode(file_get_contents($path));

	if (isset($current[0]->statuses)){
		// Finding most recent Tweet
		$lastTweet = 0;
		for ($i = 0; $i < count($current[0]->statuses); $i++){
			if ($current[0]->statuses[$i]->id_str > $lastTweet){
				$lastTweet = $current[0]->statuses[$i]->id_str;
			}
		}

		// Adding tweets with a higher ID than that found to current array
		for ($i = 0; $i < count($results[0]->statuses); $i++){
			if ($results[0]->statuses[$i]->id_str > $lastTweet){
				$current[0]->statuses[] = $results[0]->statuses[$i];
				echo $results[0]->statuses[$i]->id_str . " " . $lastTweet + " | ";
			}
		}

		// Updating Favourites of tweets with a lower or equal ID currently present in the object
		echo "Tweets updated: ";
		for ($i = 0; $i < count($results[0]->statuses); $i++){
			if ($results[0]->statuses[$i]->id_str <= $lastTweet){
				for ($j = 0; $j < count($current[0]->statuses); $j++){
					if ($results[0]->statuses[$i]->id_str == $current[0]->statuses[$j]->id_str){
						echo $results[0]->statuses[$i]->id_str . " | ";
						$current[0]->statuses[$j]->favorite_count = $results[0]->statuses[$i]->favorite_count;
						break;
					}
				}
			}
		}
		echo "<br />";

		// Finding images with broken links
		for ($i = 0; $i < count($current[0]->statuses); $i++){
			$file_headers = @get_headers($current[0]->statuses[$i]->entities->media[0]->media_url);
			if (strpos($file_headers[0], "404 Not Found")){
				//echo "Invalid file found. ".$current[0]->statuses[$i]->entities->media[0]->media_url."<br />";
				unset($current[0]->statuses[$i]);
				$current[0]->statuses = array_filter($current[0]->statuses);
			}
		}

		// Finding tweets with duplicates, and excluding them from the later JSON write
		echo "Duplicate tweets: ";
		$uniqueTweets[0] = new stdClass();
		$uniqueTweets[0]->statuses = array();
		for ($i = count($current[0]->statuses) - 1; $i >= 0; $i--){
			// Weeding out null entries now
			if ($current[0]->statuses[$i] != null){
				$isUnique = true;
				for ($j = 0; $j < count($uniqueTweets[0]->statuses); $j++){
					if ($uniqueTweets[0]->statuses[$j]->entities->media[0]->media_url == $current[0]->statuses[$i]->entities->media[0]->media_url){
						$isUnique = false;
						echo $current[0]->statuses[$i]->id_str . " | "; 
					}
				}
				if ($isUnique){
					$uniqueTweets[0]->statuses[] = $current[0]->statuses[$i];
				}
			}
		}
		$current[0]->statuses = $uniqueTweets[0]->statuses;
		echo "<br /><br />";
	}

	if (isset($current[1]->data)){
		// Finding most recent Instagram
		$lastInsta = 0;
		for ($i = 0; $i < count($current[1]->data); $i++){
			$tempId = substr($current[1]->data[$i]->id, 0, strpos($current[1]->data[$i]->id, "_"));
			if ($tempId > $lastInsta){
				$lastInsta = $tempId;
			}
		}

		// Adding instas with a higher ID than that found to current array
		for ($i = 0; $i < count($results[1]->data); $i++){
			$tempId = substr($results[1]->data[$i]->id, 0, strpos($results[1]->data[$i]->id, "_"));
			if ($tempId > $lastInsta){
				$current[1]->data[] = $results[1]->data[$i];
			}
		}

		// Updating Likes of instas with a lower or equal ID currently present in the object
		echo "Instas updated: ";
		for ($i = 0; $i < count($results[1]->data); $i++){
			$tempId = substr($results[1]->data[$i]->id, 0, strpos($results[1]->data[$i]->id, "_"));
			if ($tempId <= $lastInsta){
				$refId = 0;
				for ($j = 0; $j < count($current[1]->data); $j++){
					$refId = substr($current[1]->data[$j]->id, 0, strpos($current[1]->data[$j]->id, "_"));
					if ($tempId == $refId){
						echo $tempId . " | ";
						$current[1]->data[$j]->likes->count = $results[1]->data[$i]->likes->count;
						break;
					}
				}
			}
		}
		echo "<br />";

		// Finding images with broken links
		for ($i = 0; $i < count($current[1]->data); $i++){
			$file_headers = @get_headers($current[1]->data[$i]->images->standard_resolution->url);
			if (strpos($file_headers[0], "403 Forbidden")){
				//echo "Invalid file found.".$current[1]->data[$i]->images->standard_resolution->url."<br />";
				unset($current[1]->data[$i]);
				$current[1]->data = array_filter($current[1]->data);
			}
		}
	}

	// Sorting component arrays
	if (isset($current[0]->statuses)){
		usort($current[0]->statuses, "sortTweet");
	}
	if (isset($current[1]->data)){
		usort($current[1]->data, "sortInsta");
	}

	// Removing extra items from both arrays
	while (count($current[0]->statuses) > 50){
		array_pop($current[0]->statuses);
	}
	while (count($current[1]->data) > 50){
		array_pop($current[1]->data);
	}

	$tweetCount = 0;
	$instaCount = 0;

	if (isset($current[0]->statuses)){
		echo "Last tweet: " . $current[0]->statuses[0]->id . " First tweet: " . $current[0]->statuses[count($current[0]->statuses) - 1]->id . "<br />";
		$tweetCount = count($current[0]->statuses);
	}
	if (isset($current[1]->data)){
		echo "Last insta: " . substr($current[1]->data[0]->id, 0, strpos($current[1]->data[0]->id, "_")) . " First insta: " . substr($current[1]->data[count($current[1]->data) - 1]->id, 0, strpos($current[1]->data[count($current[1]->data) - 1]->id, "_")) . "<br />";
		$instaCount = count($current[1]->data);
	echo "Instas: " . $instaCount . ", Tweets: " . $tweetCount;
        }
	
        file_put_contents($path, json_encode($current));
}
else{
	// Sorting component arrays
	if (isset($current[0]->statuses)){
		usort($current[0]->statuses, "sortTweet");
	}
	if (isset($current[1]->data)){
		usort($current[1]->data, "sortInsta");
	}

	// Removing extra items from both arrays
	while (count($results[0]->statuses) > 50){
		array_pop($results[0]->statuses);
	}
	while (count($results[1]->data) > 50){
		array_pop($results[1]->data);
	}

	file_put_contents($path, json_encode($results));
}

// If file exists, read and add to array - otherwise, write to new file
if (file_exists($backup)){
	$current = json_decode(file_get_contents($backup));

	if (isset($current[0]->statuses)){
		// Finding most recent Tweet
		$lastTweet = 0;
		for ($i = 0; $i < count($current[0]->statuses); $i++){
			if ($current[0]->statuses[$i]->id_str > $lastTweet){
				$lastTweet = $current[0]->statuses[$i]->id_str;
			}
		}

		// Adding tweets with a higher ID than that found to current array
		for ($i = 0; $i < count($results[0]->statuses); $i++){
			if ($results[0]->statuses[$i]->id_str > $lastTweet){
				$current[0]->statuses[] = $results[0]->statuses[$i];
			}
		}

		// Updating Favourites of tweets with a lower or equal ID currently present in the object
		for ($i = 0; $i < count($results[0]->statuses); $i++){
			if ($results[0]->statuses[$i]->id_str <= $lastTweet){
				for ($j = 0; $j < count($current[0]->statuses); $j++){
					if ($results[0]->statuses[$i]->id_str == $current[0]->statuses[$j]->id_str){
						$current[0]->statuses[$j]->favorite_count = $results[0]->statuses[$i]->favorite_count;
						break;
					}
				}
			}
		}

		/*// Finding images with broken links
		for ($i = 0; $i < count($current[0]->statuses); $i++){
			$file_headers = @get_headers($current[0]->statuses[$i]->entities->media[0]->media_url);
			if (strpos($file_headers[0], "404 Not Found")){
				unset($current[0]->statuses[$i]);
				$current[0]->statuses = array_filter($current[0]->statuses);
			}
		}*/

		// Finding tweets with duplicates, and excluding them from the later JSON write
		$uniqueTweets[0] = new stdClass();
		$uniqueTweets[0]->statuses = array();
		for ($i = count($current[0]->statuses) - 1; $i >= 0; $i--){
			// Weeding out null entries now
			if ($current[0]->statuses[$i] != null){
				$isUnique = true;
				for ($j = 0; $j < count($uniqueTweets[0]->statuses); $j++){
					if ($uniqueTweets[0]->statuses[$j]->entities->media[0]->media_url == $current[0]->statuses[$i]->entities->media[0]->media_url){
						$isUnique = false;
					}
				}
				if ($isUnique){
					$uniqueTweets[0]->statuses[] = $current[0]->statuses[$i];
				}
			}
		}
		$current[0]->statuses = $uniqueTweets[0]->statuses;
	}

	if (isset($current[1]->data)){
		// Finding most recent Instagram
		$lastInsta = 0;
		for ($i = 0; $i < count($current[1]->data); $i++){
			$tempId = substr($current[1]->data[$i]->id, 0, strpos($current[1]->data[$i]->id, "_"));
			if ($tempId > $lastInsta){
				$lastInsta = $tempId;
			}
		}

		// Adding instas with a higher ID than that found to current array
		for ($i = 0; $i < count($results[1]->data); $i++){
			$tempId = substr($results[1]->data[$i]->id, 0, strpos($results[1]->data[$i]->id, "_"));
			if ($tempId > $lastInsta){
				$current[1]->data[] = $results[1]->data[$i];
			}
		}

		// Updating Likes of instas with a lower or equal ID currently present in the object
		for ($i = 0; $i < count($results[1]->data); $i++){
			$tempId = substr($results[1]->data[$i]->id, 0, strpos($results[1]->data[$i]->id, "_"));
			if ($tempId <= $lastInsta){
				$refId = 0;
				for ($j = 0; $j < count($current[1]->data); $j++){
					$refId = substr($current[1]->data[$j]->id, 0, strpos($current[1]->data[$j]->id, "_"));
					if ($tempId == $refId){
						$current[1]->data[$j]->likes->count = $results[1]->data[$i]->likes->count;
						break;
					}
				}
			}
		}

		/*// Finding images with broken links
		for ($i = 0; $i < count($current[1]->data); $i++){
			$file_headers = @get_headers($current[1]->data[$i]->images->standard_resolution->url);
			if (strpos($file_headers[0], "403 Forbidden")){
				unset($current[1]->data[$i]);
				$current[1]->data = array_filter($current[1]->data);
			}
		}*/
	}

	// Sorting component arrays
	if (isset($current[0]->statuses)){
		usort($current[0]->statuses, "sortTweet");
	}
	if (isset($current[1]->data)){
		usort($current[1]->data, "sortInsta");
	}

	echo "<br /><br />";

	$tweetCount = 0;
	$instaCount = 0;

	if (isset($current[0]->statuses)){
		echo "Last (archived) tweet: " . $current[0]->statuses[0]->id . " First (archived) tweet: " . $current[0]->statuses[count($current[0]->statuses) - 1]->id . "<br />";
		$tweetCount = count($current[0]->statuses);
	}
	if (isset($current[1]->data)){
		echo "Last (archived) insta: " . substr($current[1]->data[0]->id, 0, strpos($current[1]->data[0]->id, "_")) . " First (archived) insta: " . substr($current[1]->data[count($current[1]->data) - 1]->id, 0, strpos($current[1]->data[count($current[1]->data) - 1]->id, "_")) . "<br />";
		$instaCount = count($current[1]->data);
	}

	echo "(archived) Instas: " . $instaCount . ", (archived) Tweets: " . $tweetCount;

	file_put_contents($backup, json_encode($current));
}
else{
	// Sorting component arrays
	if (isset($current[0]->statuses)){
		usort($current[0]->statuses, "sortTweet");
	}
	if (isset($current[1]->data)){
		usort($current[1]->data, "sortInsta");
	}

	file_put_contents($backup, json_encode($results));
}

// Sorts tweets
function sortTweet($a, $b)
{ 
	if ($a->id == $b->id){
		return 0;
	} 
	return ($a->id > $b->id) ? -1 : 1;
} 

// Sorts instagrams
function sortInsta($a, $b)
{ 
	if (substr($a->id, 0, strpos($a->id, "_")) == substr($b->id, 0, strpos($b->id, "_"))){
		return 0;
	} 
	return (substr($a->id, 0, strpos($a->id, "_")) > substr($b->id, 0, strpos($b->id, "_"))) ? -1 : 1;
}

function callInstagram($url)
{
$ch = curl_init();
curl_setopt_array($ch, array(
CURLOPT_URL => $url,
CURLOPT_RETURNTRANSFER => true,
CURLOPT_SSL_VERIFYPEER => false,
CURLOPT_SSL_VERIFYHOST => 2
));

$result = curl_exec($ch);
curl_close($ch);
return $result;
}
?>
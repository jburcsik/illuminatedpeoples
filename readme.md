
##Core Requirements
- Web Page has 9 divs. Used for spelling ‘C H I N A T O W N’ on two rows. CHINA on the top and TOWN on the bottom.
- Images are parsed with `get-posts-ñ.php’ and out putted to `results-ñ.json`
- The front end `main.’js` parses the json files and loads a random image from the list of photos for their respective letter ‘ñ’.  and places it into the dom into their respective place div.
     - The div and it’s elements:
          - There is more I would like to do but once we get the images writing to the dom I can easily access other elements from the chosen object.
               - Such things include:
                    - Making the Image a link to the user who posted it’s profile
                    - Listing any @mentions under the photo
                    - See Social heading
- After n seconds the `json` files have to be re read from the server to capture any newly parsed data (since I think I can do a max of 15 get calls to the API per 15 minutes this should be done every 15 minutes.

###Social
- Similar to the divs showing the images there will be a second section that shows user’s profile pictures instead of the ‘letters’ All other functionality should be the same.
- There should also be a text list of all users’s name as well as any at mentions. Each user or at mention should be a link to their respective social media page. (This is ideal but not required but would make the community building aspect of the project a reality)

-----

To update the SCSS run this from the command line in the 'www' folder:
	$ sass --watch css/scss/main.scss:css/main.css

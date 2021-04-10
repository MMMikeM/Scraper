const cheerio = require("cheerio");
const axios = require("axios");
const url =
	"https://kbdfans.com/collections/coming-soon/products/coming-soon-vulcan-x-kbdfans-maja-mechanical-keyboard-diy-kit";
const PushBullet = require("pushbullet");
const pusher = new PushBullet("");

axios.get(url).then((res) => {
	let site = cheerio.load(res.data);
	let text = site("#wait_li_register_trigger").text();
	if (text !== "Notify Me") {
		pusher.devices("", function (error, response) {
			response.devices.map((x) => {
				pusher.note(
					x.iden,
					"Go and check",
					"The page has changed!!!",
					function (error, response) {
						console.log("success");
					}
				);
			});
		});
	} else if (text === "Notify Me") {
		let dateObject = new Date();
		let minutes = "";
		if (dateObject.getMinutes() < 10) {
			minutes = "0" + dateObject.getMinutes();
		} else {
			minutes = dateObject.getMinutes();
		}
		let time = dateObject.getHours() + ":" + minutes;
		let date = dateObject.getUTCMonth() + 1 + "/" + dateObject.getDate();
		console.log("No change Boss - " + date + " " + time);
	}
});

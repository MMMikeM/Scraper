const cheerio = require("cheerio");
const axios = require("axios");
const url =
	"https://kbdfans.com/collections/coming-soon/products/coming-soon-vulcan-x-kbdfans-maja-mechanical-keyboard-diy-kit";
const PushBullet = require("pushbullet");
const pusher = new PushBullet("o.L3hXHSFrLLXcwnwic31Ti7IkaHPXLVXF");

axios.get(url).then((res) => {
	let site = cheerio.load(res.data);
	let text = site("#wait_li_register_trigger").text();
	pusher.devices("", function (error, response) {
		response.devices.map((x) => {
			pusher.note(x.iden, "I am working", "Still working master", function (
				error,
				response
			) {
				console.log("success");
			});
		});
	});
});

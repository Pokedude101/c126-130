song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftwrist = 0;
scoreRightwrist = 0;

playsong1 = "";
playsong2 = "";

function preload() {
	song1 = loadSound("song1.mp3");
	song2 = loadSound("song2.mp3")
}


function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses)
}



function modelLoaded() {
	console.log("Model has Loaded!");
}

function gotPoses(results) {
	if (results.length > 0) {
		console.log(results);
		scoreLeftwrist = results[0].pose.keypoints[9].score;
		console.log("Left wrist score: " + scoreLeftwrist);

		scoreRightwrist = results[0].pose.keypoints[10].score;
		console.log("Right wrist score: " + scoreRightwrist);

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		console.log("left wrist x = " + leftWristX + ", left wrist y = " + leftWristY);

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("right wrist x = " + rightWristX + ", right wrist y = " + rightWristY);
	}
}



function draw() {
	image(video, 0, 0, 600, 500);

	playsong1 = song1.isPlaying();
	playsong2 = song2.isPlaying();

	fill('#FF0000');
	stroke('#FF0000');

	if (scoreLeftwrist > 0.2) {
		song2.stop();
		circle(leftWristX, leftWristY, 20);

		if (playsong1 == "false") {
			song1.play();
			document.getElementById("song_playing").innerHTML = "Song Playing: Harry Potter Theme Song";
		}
	}

	if (scoreRightwrist > 0.2) {
		song1.stop();
		circle(rightWristX, rightWristY, 20);

		if (playsong2 == "false") {
			song2.play();
			document.getElementById("song_playing").innerHTML = "Song Playing: Enemy by Imagine Dragons";
		}
	}


}

function play() {
	song.play();
	song.setVolume(1);
	song.rate(1);
}
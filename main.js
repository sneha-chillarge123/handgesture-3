Webcam.set(
    {
        width: 350,
        height: 300,
        image_format: 'png',
        png_quality: 90
    }
);

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/">';
    })
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qcdI6hsX8/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The meaning of this emoji is  " + Prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis)
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
    console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("result_emoji_meaning").innerHTML = results[0].label;
        Prediction = results[0].label;
        speak();

        if(results[0].label=="victory") {
            document.getElementById("update_emoji").innerHTML = "✌️";
        }
        
        if(results[0].label=="ok") {
            document.getElementById("update_emoji").innerHTML = "👌";
        }
        
        if(results[0].label=="rock") {
            document.getElementById("update_emoji").innerHTML = "🤟";
        }
        if(results[0].label=="thumbs up") {
            document.getElementById("update_emoji").innerHTML = "👍";
        }
    }
}
/* eslint-disable */
// A $( document ).ready() block.
$(document).ready(function () {
    $("#show-result").css("display","none")
    Parse.initialize(
        "APPLICATION-ID","JAVASCRIPT-KEY"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://SERVER-URL';
});

function saveFile(e) {
    $("#show-result").css("display","block")
    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    console.log(fileUploadControl)
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "UploadTest.jpg";
        var parseFile = new Parse.File(name, file);
        parseFile.setMetadata({ 'content-disposition': 'attachment' });
        console.log(parseFile)
        parseFile.save().then(function (result) {
            console.log(result)            
            $("#result").append(`<li>Date : ${new Date()} - <a href=${result._url} target="_blank">Click here to open</a></li>`)
        }, function (error) {
            // The file neither could not be read, nor could not be saved to Parse.
            console.log(error)
        });

        return "saved";   
    }
}

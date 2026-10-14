// var slideIndex = 0;
//     var slideCounter = 1;
//     showAcor(slideCounter);
//     showSlides();

//     function showSlides() {
//     var i;
//     var slides = document.getElementsByClassName("mySlides");
//     var slidesB = document.getElementsByClassName("mySlidesBottom");
//     var slidesC = document.getElementsByClassName("mySlidesComments");
//     var dots = document.getElementsByClassName("dot");
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none"; 
//         slidesB[i].style.display = "none";
//         slidesC[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {slideIndex = 1};
//     for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");};  
//     slides[slideIndex-1].style.display = "block"; 
//     slidesB[slideIndex-1].style.display = "block";
//     slidesC[slideIndex-1].style.display = "block"; 
//     setTimeout(showSlides, 4000);
//     }


//  /*****************************************************/

    // function plusSlides(n) {
    //     showAcor(slideCounter += n);
    // }
    // function currentSlide(n) {
    //     showAcor(slideCounter = n);
    // }

    // function showAcor(n) {
    //     var e;
    //     var slidesD = document.getElementsByClassName("mySlidesNews")
    //     if (n > slidesD.length) {slideCounter = 1}    
    //     if (n < 1) {slideCounter = slidesD.length}
    //     for (e = 0; e < slidesD.length; e++) {
    //         slidesD[e].style.display = "none";  
    //     }
    //     slidesD[slideCounter-1].style.display = "block";  
    //     setTimeout(showSlides, 4000);
    // }
    
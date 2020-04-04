var QRshow = function (){
    var QR = document.querySelector(".fixed").querySelector(".QRcode");
    var QRpopup = document.querySelector(".popup").querySelector(".pQRcode");
    
    QR.onmouseenter = function(){
        QRpopup.style.display = 'block';
    }

    QR.onmouseleave = function(){
        QRpopup.style.display = 'none';
    }
}

QRshow();
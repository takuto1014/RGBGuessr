    //AO5 4990点以上バッジ
    Ao5record = localStorage.getItem("Ao5record")
    Ao5record2 = localStorage.getItem("2Ao5record")
    if(Ao5record==5000||Ao5record2==5000){
        document.getElementById("title_image").src="RgbGuessrGod.jpg"
    
    }else if(Ao5record>=4990||Ao5record2>=4990){
        document.getElementById("title_image").src="RgbGuessrPro.jpg"
    } 
    
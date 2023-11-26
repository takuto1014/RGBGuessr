// 色を表示
RGB_sample = localStorage.getItem("rgb")
if(RGB_sample!=null){
    //↓の変数を復活させる
    R_s = localStorage.getItem("R_s")
    G_s = localStorage.getItem("G_s")
    B_s = localStorage.getItem("B_s")
    document.getElementById("sample").style.backgroundColor = RGB_sample
}else{
document.getElementById("sample").style.backgroundColor = randColor();
}

// 目標スコア配列
aim_scores = [1000,2000,3000,4000,4100,4200,4300,4400,4500,4600,4700,4800,4900,4910,4920,4930,4940,4950,4960,4970,4980,4990,4995,4998,5000]


//Nextボタンの無効化
document.getElementById("next_button").disabled = true
document.getElementById("restart_button").disabled = true


// ボタン押した回数の初期化
Counter = 0

// ステージの初期化
stage_number = localStorage.getItem("stage_number")
if(stage_number == null){
    stage_number = 1    
    localStorage.setItem("stage_number", stage_number)
}

// 記録表示
MyRecord();

// ボタン回数表示
var C =Counter
document.getElementById("count").innerText = (C+1)+"回目";


function judgement(){

    document.getElementById("guess_button").disabled = true
    document.getElementById("next_button").disabled = false
    
    //整数値判定
    r   = document.getElementById("R_number").value;
    g   = document.getElementById("G_number").value;
    b   = document.getElementById("B_number").value;
    r1  = Math.floor(document.getElementById("R_number").value)-document.getElementById("R_number").value
    g1  = Math.floor(document.getElementById("G_number").value)-document.getElementById("G_number").value
    b1  = Math.floor(document.getElementById("B_number").value)-document.getElementById("B_number").value
    if(0<=r && r<=255 && 0<=g && g<=255 && 0<=b && b<=255){
        if(r1==0 && g1==0 && b1==0 &&r!="" && g!="" && b!=""){
            
            // "判定処理"
            Judge();
            // alert("判定処理OK")
            // スコア表示
            
            Score();
            // alert("スコア表示OK")
            //答え表示
            
            Result();
            // alert("結果表示OK")
            
            //localStorageに一時保存したrgb値を削除
            localStorage.removeItem("rgb")
        }else{
        alert("RGBは0から255の整数値を入力してください")
        
        }
    }else{
        alert("RGBは0から255の整数値を入力してください")
        
    }
    
    stage_number++
    localStorage.setItem("stage_number", stage_number)
}

function randColor() {
    
    R_s = Math.floor( Math.random() * 256);
    G_s = Math.floor( Math.random() * 256);
    B_s = Math.floor( Math.random() * 256);

   //数値123を１６進数に変換
    R_sample = R_s.toString(16);
    G_sample = G_s.toString(16);
    B_sample = B_s.toString(16);

    if( Number(R_s)<16){
        R_sample="0"+R_sample
    }
    if( Number(G_s)<16){
        G_sample ="0"+G_sample
    }
    if( Number(B_s)<16){
        B_sample="0"+B_sample
    }

    RGB_sample  = "#"+R_sample+G_sample+B_sample
    localStorage.setItem("R_s",R_s)
    localStorage.setItem("G_s",G_s)
    localStorage.setItem("B_s",B_s)
    localStorage.setItem("rgb", RGB_sample)

    return RGB_sample
}


function Judge(){
    R_n   = Math.floor(document.getElementById("R_number").value);
    G_n   = Math.floor(document.getElementById("G_number").value);
    B_n   = Math.floor(document.getElementById("B_number").value);

    R_input = R_n.toString(16);
    G_input = G_n.toString(16);
    B_input = B_n.toString(16);

    //0から15の16進数の先頭に0を追加
    if( Number(R_n)<16){
        R_input="0"+R_input
    }
    if( Number(G_n)<16){
        G_input ="0"+G_input
    }
    if( Number(B_n)<16){
        B_input="0"+B_input
    }

    //RGB値を設定
    RGB_input  = "#"+R_input+""+G_input+""+B_input
    
}

function Score(){
    square = (R_s-R_n)**2+(G_s-G_n)**2+(B_s-B_n)**2
    base = Math.max((255-R_s)**2,R_s**2)+Math.max((255-G_s)**2,G_s**2)+Math.max((255-B_s)**2,B_s**2)
    
    score =Math.ceil(5000-5000*square/base)
    point = score+"点"

}

function Result(){
    //色表示
    document.getElementById("result1").style.backgroundColor = RGB_sample;
 
    document.getElementById("result2").style.backgroundColor = RGB_input;
    
    
    // 自己記録判定

    stage_record = localStorage.getItem("stage_record");
    if(stage_record==null || stage_record==0){
        stage_record = 0;
    }
    
    if(score>=aim_scores[stage_number-1]){

        // 自己ベスト判定
        localStorage.getItem("stage_record")
        if(stage_number>stage_record){
            localStorage.setItem("stage_record",stage_number)
            document.getElementById("score").innerHTML = point+"<br>ステージ"+stage_number+"クリア(記録更新!)";
            document.getElementById("answer1").innerText = "答え: ("+R_s+","+G_s+","+B_s+")";
            document.getElementById("answer2").innerText = "あなたの回答: ("+R_n+","+G_n+","+B_n+")";

        }else{
            document.getElementById("score").innerHTML = point+"<br>ステージ"+stage_number+"クリア";
            document.getElementById("answer1").innerText = "答え: ("+R_s+","+G_s+","+B_s+")";
            document.getElementById("answer2").innerText = "あなたの回答: ("+R_n+","+G_n+","+B_n+")";
        }
        if(stage_number==25){
            document.getElementById("score").innerHTML = "Congratulations! 完全クリア!";
            document.getElementById("next_button").disabled = true
            document.getElementById("restart_button").disabled = false
        
        }
        
        //記録保存
    localStorage.setItem("stage_number"+stage_number,score)
    // alert("storegeの"+value+"番目に"+score+"を格納")
    
    }else{
        document.getElementById("score").innerHTML = point+"<br>You Lose!   記録:ステージ"+(stage_number-1);document.getElementById("answer1").innerText = "答え: ("+R_s+","+G_s+","+B_s+")";
        document.getElementById("answer2").innerText = "あなたの回答: ("+R_n+","+G_n+","+B_n+")";
    //記録保存
    localStorage.setItem("stage_number"+stage_number,score)
    // alert("storegeの"+value+"番目に"+score+"を格納")
    document.getElementById("next_button").disabled = true
    document.getElementById("restart_button").disabled = false


    }
    
        
}




function MyRecord(){
    document.getElementById("stage_number").innerText = "ステージ"+stage_number+" "
    document.getElementById("aim_score").innerText = "目標スコア:"+aim_scores[stage_number-1]+"点"

    
    if(stage_number!=1){
        document.getElementById("prerecord").innerText = "前回の記録: "+localStorage.getItem("stage_number"+(stage_number-1))+"点 "
    }    

    // 自己ベスト表示
    stage_record = localStorage.getItem("stage_record");
    if(stage_record!=null){
        document.getElementById("stage_record").innerText = "自己ベスト: ステージ"+stage_record
    }

    // 過去記録表示
    result = "" ;
    for(i=stage_number-1;i>0;i--){

        result = result + "ステージ"+i+"("+aim_scores[i-1]+"): "+localStorage.getItem("stage_number"+i)+"<br>"
    }
    document.getElementById("result").innerHTML = result

    
    //AO5 4990点以上バッジ
    Ao5record = localStorage.getItem("Ao5record")
    Ao5record2 = localStorage.getItem("2Ao5record")
    if(Ao5record==5000||Ao5record2==5000){
        document.getElementById("title_image").src="RgbGuessrGod.jpg"
    
    }else if(Ao5record>=4990||Ao5record2>=4990){
        document.getElementById("title_image").src="RgbGuessrPro.jpg"
    } 
    

}

function next(){
    //色変更不可能を実装
    document.getElementById("guess_button").disabled = false
    document.getElementById("next_button").disabled = true

    // 色を表示
    document.getElementById("sample").style.backgroundColor = randColor();
        
    // 記録表示
    MyRecord();


}
function restart(){
    //記録全削除
    for(i=0;i<=stage_number;i++){
        localStorage.removeItem("stage_number"+i)
    }
    location.reload()
    document.getElementById("restart_button").disabled = true

    stage_number = 1    
    localStorage.setItem("stage_number", stage_number)



}


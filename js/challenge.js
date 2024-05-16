// 色を表示
RGB_question16 = localStorage.getItem("4RGB_Temporary")
if(RGB_question16!=null){
    //↓の変数を復活させる
    R_s = localStorage.getItem("4R_s")
    G_s = localStorage.getItem("4G_s")
    B_s = localStorage.getItem("4B_s")
    document.getElementById("sample").style.backgroundColor = RGB_question16
}else{
document.getElementById("sample").style.backgroundColor = randColor();
}

// 目標スコア配列
aim_scores = [1000,2000,3000,4000,4100,4200,4300,4400,4500,4600,4700,4800,4900,4910,4920,4930,4940,4950,4960,4970,4980,4990,4995,4998,5000]


//Nextボタンの無効化
document.getElementById("next_button").disabled = true
// document.getElementById("restart_button").disabled = true


// ボタン押した回数の初期化
Counter = 0

//answer部分の非表示
answer = document.getElementById("answer")
answer.hidden = "true"


// ステージの初期化
stage_number = localStorage.getItem("4stage_number")

if(stage_number == null){
    stage_number = 1    
    localStorage.setItem("4stage_number", stage_number)

    //記録全削除
    for(i=0;i<=stage_number;i++){
        localStorage.removeItem("4stage_number"+i)
    }
    // document.getElementById("restart_button").disabled = true
}else{
    
}

// 記録表示
MyRecord();


function judgement(){

    document.getElementById("guess_button").disabled = true
    document.getElementById("next_button").disabled = false
            
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
    localStorage.removeItem("4RGB_Temporary")
    
    
    // 過去記録表示(色あり)
    result = "" ;
    for(i=stage_number-1;i>0;i--){

        result = result + "ステージ"+i+"("+aim_scores[i-1]+"): <b>"+localStorage.getItem("4stage_number"+i)+"点</b><br>　問題&nbsp;<a style=\"background-color:"+localStorage.getItem("4answer_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("4answer_rgb"+i)+"<br>　回答&nbsp;<a style=\"background-color:"+localStorage.getItem("4input_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("4input_rgb"+i)+"<br>"
    }
    document.getElementById("result").innerHTML = result

    stage_record = localStorage.getItem("4stage_record");
    if(stage_record!=null){
        document.getElementById("stage_record").innerText = "PB　ステージ"+stage_record
    }
    
    
    //LetsGuess ~ Guessボタン削除(非表示)
    var question = document.getElementById("question")
    question.remove();

    //answer部分表示
    answer = document.getElementById("answer")
    answer.hidden = ""

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

    RGB_question16  = "#"+R_sample+G_sample+B_sample
    localStorage.setItem("4R_s",R_s)
    localStorage.setItem("4G_s",G_s)
    localStorage.setItem("4B_s",B_s)
    localStorage.setItem("4RGB_Temporary", RGB_question16)

    return RGB_question16
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
    RGB_input16  = "#"+R_input+""+G_input+""+B_input
    
}

function Score(){
    square = (R_s-R_n)**2+(G_s-G_n)**2+(B_s-B_n)**2
    base = Math.max((255-R_s)**2,R_s**2)+Math.max((255-G_s)**2,G_s**2)+Math.max((255-B_s)**2,B_s**2)
    
    score =Math.ceil(5000-5000*square/base)
    point = score+"点"

}

function Result(){
    //色表示
    document.getElementById("answer_color").style.backgroundColor = RGB_question16;
 
    document.getElementById("input_color").style.backgroundColor = RGB_input16;
    
    
    // 自己記録判定

    stage_record = localStorage.getItem("4stage_record");
    if(stage_record==null || stage_record==0){
        stage_record = 0;
    }
    
    if(score>=aim_scores[stage_number-1]){

        // PB判定
        if(Number(stage_number)>Number(stage_record)){
            localStorage.setItem("4stage_record",stage_number)
            document.getElementById("score").innerHTML = "Clear!"
            document.getElementById("point").innerHTML = "ステージ"+stage_number+": "+point;
            document.getElementById("new_record").innerText ="New Record!";
            document.getElementById("answer_rgb").innerHTML = "("+R_s+","+G_s+","+B_s+")";
            document.getElementById("input_rgb").innerHTML = "("+R_n+","+G_n+","+B_n+")";
            
        }else{
            document.getElementById("score").innerHTML = "Clear!";
            document.getElementById("point").innerHTML = "ステージ"+stage_number+": "+point;
            document.getElementById("answer_rgb").innerHTML = "("+R_s+","+G_s+","+B_s+")";
            document.getElementById("input_rgb").innerHTML = "("+R_n+","+G_n+","+B_n+")";
        }
        if(stage_number==25){
            document.getElementById("score").innerHTML = " Congratulations! 完全クリア!";
            document.getElementById("next_button").disabled = true
            // document.getElementById("restart_button").disabled = false
            localStorage.removeItem("4stage_number")
            document.getElementById("next_button").value = "最初から"
            document.getElementById("next_button").id = "restart"
        
        }
        
        //記録保存
        localStorage.setItem("4stage_number"+stage_number,score)
        localStorage.setItem("4answer_rgb16"+stage_number,RGB_question16)
        localStorage.setItem("4input_rgb16"+stage_number,RGB_input16)
        localStorage.setItem("4answer_rgb"+stage_number,"("+R_s+","+G_s+","+B_s+")")
        localStorage.setItem("4input_rgb"+stage_number,"("+R_n+","+G_n+","+B_n+")")
    
        // alert("storegeの"+value+"番目に"+score+"を格納")
    
        stage_number++
        localStorage.setItem("4stage_number", stage_number)

        
    }else{
        document.getElementById("score").innerHTML = "You Lose!";
        document.getElementById("point").innerHTML = "ステージ"+stage_number+": "+point;
        document.getElementById("answer_rgb").innerHTML = "<b>("+R_s+","+G_s+","+B_s+")</b>";
        document.getElementById("input_rgb").innerHTML = "<b>("+R_n+","+G_n+","+B_n+")</b>";
        //記録保存
        localStorage.setItem("4stage_number"+stage_number,score)
        localStorage.setItem("4answer_rgb16"+stage_number,RGB_question16)
        localStorage.setItem("4input_rgb16"+stage_number,RGB_input16)
        localStorage.setItem("4answer_rgb"+stage_number,"("+R_s+","+G_s+","+B_s+")")
        localStorage.setItem("4input_rgb"+stage_number,"("+R_n+","+G_n+","+B_n+")")
    
        // alert("storegeの"+value+"番目に"+score+"を格納")
        // document.getElementById("next_button").disabled = true
        document.getElementById("next_button").value = "最初から"
        document.getElementById("next_button").id = "restart"
        
        stage_number++
        // document.getElementById("restart_button").disabled = false
        localStorage.removeItem("4stage_number")
    }
        
}




function MyRecord(){
    document.getElementById("stage_number").innerText = "ステージ"+stage_number+""
    document.getElementById("aim_score").innerText = "(目標スコア "+aim_scores[stage_number-1]+"点)"

    // if(stage_number!=1){
    //     document.getElementById("prerecord").innerText = "前回の記録: "+localStorage.getItem("stage_number"+(stage_number-1))+"点 "
    // }    

    // PB表示
    stage_record = localStorage.getItem("4stage_record");
    if(stage_record!=null){
        document.getElementById("stage_record").innerText = "PB　ステージ"+stage_record
    }

    // 過去記録表示(色なし)
    result = "" ;
    for(i=stage_number-1;i>0;i--){

        result = result + "ステージ"+i+"("+aim_scores[i-1]+"): <b>"+localStorage.getItem("4stage_number"+i)+"点</b><br>"
    }
    document.getElementById("result").innerHTML = result

    
    //AO5 4950点以上バッジ
    Ao5record = localStorage.getItem("my_ao5record");
    if(Ao5record>=4990){
        document.getElementById("title_image").src="img/RgbGuessrGod.jpg"

    }else if(Ao5record>=4950){
        document.getElementById("title_image").src="img/RgbGuessrPro.jpg"
    } 
    

}

function next(){
    //色変更不可能を実装
    // document.getElementById("guess_button").disabled = false
    // document.getElementById("next_button").disabled = true

    location.reload();    
    // 記録表示
    MyRecord();

}


var all_delete_button = document.getElementById('reset_button');
all_delete_button.addEventListener('click', function() {
    var all_delete_permission = window.confirm('本当に記録を削除してもよろしいですか？(チャレンジモードの記録のみ削除します)');
    if( all_delete_permission ) {
        //記録全削除
        for(i=0;i<=stage_number;i++){
            localStorage.removeItem("4stage_number"+i)
        }
        localStorage.removeItem("4stage_record");
        stage_number = null
        location.reload()
        // document.getElementById("restart_button").disabled = true

        stage_number = 1    
        localStorage.setItem("4stage_number", stage_number)

        //色リセット
        document.getElementById("sample").style.backgroundColor = randColor();
    }
    else {

    }
})

var restart_button = document.getElementById("restart");
restart_button.addEventListener('click', function() {
    //記録全削除
    for(i=0;i<=stage_number;i++){
        localStorage.removeItem("4stage_number"+i)
    }
    location.reload()
    // document.getElementById("restart_button").disabled = true

    stage_number = 1    
    localStorage.setItem("4stage_number", stage_number)

    //色リセット
    document.getElementById("sample").style.backgroundColor = randColor();

})

//初期色表示
AppearColor();

// ボタン回数初期化
let Counter = 0

answer = document.getElementById("answer")
answer.hidden = "true"

// 記録表示
MyRecord();

//色随時変更
changeColor();

function changeColor(){
    r   = Number(document.getElementById("R_number").value);
    g   = Number(document.getElementById("G_number").value);
    b   = Number(document.getElementById("B_number").value);
    
    R = r.toString(16);
    G = g.toString(16);
    B = b.toString(16);
    
    if( Number(r)<16){
        R="0"+R
    }
    if( Number(g)<16){
        G ="0"+G
    }
    if( Number(b)<16){
        B="0"+B
    }
    RGB = "#"+R+G+B
    // alert(RGB)
    
    document.getElementById("input_check_color").style.backgroundColor = RGB;    
}

rElement = document.querySelector(".R-range");
rElement.addEventListener("change", (event) => {
    changeColor();
});
gElement = document.querySelector(".G-range");
gElement.addEventListener("change", (event) => {
changeColor();
});
bElement = document.querySelector(".B-range");
bElement.addEventListener("change", (event) => {
changeColor();
});

//タイマー表示
timer_OnOff = localStorage.getItem("2timer_OnOff")
timer = Number(localStorage.getItem("2timer"))
if(timer == null){
    timer = 0;
}

if(localStorage.getItem("2timer_OnOff")=="Off"){
    localStorage.removeItem("2timer_OnOff")
    timer = 0;
    timer_OnOff = localStorage.getItem("2timer_OnOff")
}


if(timer_OnOff==null){
    timer_OnOff = "On"
    localStorage.setItem("2timer",timer)
    localStorage.setItem("2timer_OfOff","On")

        
    // 10ミリ秒（0.01秒）ごとにcountUp関数を実行
    setInterval(countUp, 10);

}else if(timer_OnOff=="On"){
    timer = Number(localStorage.getItem("2timer"))
    // 1000ミリ秒（1秒）ごとにcountUp関数を実行
    setInterval(countUp, 10);
}else{

}

// 1秒ごとにカウントアップする関数
function countUp() {
    timer += 0.01;
    // console.log(Math.round(timer*100)/100);
    localStorage.setItem("2timer",timer)
    document.getElementById("timer").innerText = Math.floor(Math.round(timer*100)/100)+"秒";
}






function AppearColor(){
    // 色を表示
    RGB_question16 = localStorage.getItem("2RGB_Temporary")
    if(RGB_question16!=null){
        //↓の変数を復活させる
        R_s = localStorage.getItem("2R_s")
        G_s = localStorage.getItem("2G_s")
        B_s = localStorage.getItem("2B_s")
        document.getElementById("question_color").style.backgroundColor = RGB_question16
    }else{
    document.getElementById("question_color").style.backgroundColor = randColor();
    }
}


function randColor() {   
    R_s = Math.floor( Math.random() * 256);
    G_s = Math.floor( Math.random() * 256);
    B_s = Math.floor( Math.random() * 256);

   //数値123を１６進数に変換
    R_question16 = R_s.toString(16);
    G_question16 = G_s.toString(16);
    B_question16 = B_s.toString(16);

    if( Number(R_s)<16){
        R_question16="0"+R_question16
    }
    if( Number(G_s)<16){
        G_question16 ="0"+G_question16
    }
    if( Number(B_s)<16){
        B_question16="0"+B_question16
    }

    RGB_question16  = "#"+R_question16+G_question16+B_question16
    localStorage.setItem("2R_s",R_s)
    localStorage.setItem("2G_s",G_s)
    localStorage.setItem("2B_s",B_s)
    localStorage.setItem("2RGB_Temporary", RGB_question16)

    return RGB_question16
}

//guess!ボタン
function Guess_Action(){
    // ボタン回数+
    Counter = Counter + 1
    
    // "判定処理"
    Input_Convert();
    
    //スコア計算&結果表示
    Result();

    MyRecord();

    // 色付きリザルト表示
    result = "" ;
    for(i=value-1;i>0;i--){
        if(i>4){
        result = result + i+"回目&nbsp;<b>"+localStorage.getItem("2score"+i)+"点</b>("+localStorage.getItem("2result_time"+i)+"秒)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ao5:<b>"+localStorage.getItem("2Ao5"+i)+"点</b><br>　問題&nbsp;<a style=\"background-color:"+localStorage.getItem("2answer_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("2answer_rgb"+i)+"<br>　回答&nbsp;<a style=\"background-color:"+localStorage.getItem("2input_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("2input_rgb"+i)+"<br>"
        }else{
            result = result + i+"回目&nbsp;<b>"+localStorage.getItem("2score"+i)+"点</b>("+localStorage.getItem("2result_time"+i)+"秒)<br>　問題&nbsp;<a style=\"background-color:"+localStorage.getItem("2answer_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("2answer_rgb"+i)+"<br>　回答&nbsp;<a style=\"background-color:"+localStorage.getItem("2input_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("2input_rgb"+i)+"<br>"
        }
    }
    document.getElementById("result").innerHTML = result


    //localStorageに一時保存したrgb値を削除
    localStorage.removeItem("2RGB_Temporary")
    
    
    //LetsGuess ~ Guessボタン削除(非表示)
    var question = document.getElementById("question")
    question.remove();

    //answer部分表示
    answer = document.getElementById("answer")
    answer.hidden = ""

    //タイマーリセット
    localStorage.setItem("2timer_OnOff","Off")
    timer = 0;
    localStorage.removeItem("2timer",timer)
}


function Input_Convert(){
    R_n   = Math.floor(document.getElementById("R_number").value);
    G_n   = Math.floor(document.getElementById("G_number").value);
    B_n   = Math.floor(document.getElementById("B_number").value);

    R_input16 = R_n.toString(16);
    G_input16 = G_n.toString(16);
    B_input16 = B_n.toString(16);

    //0から15の16進数の先頭に0を追加
    if( Number(R_n)<16){
        R_input16="0"+R_input16
    }
    if( Number(G_n)<16){
        G_input16 ="0"+G_input16
    }
    if( Number(B_n)<16){
        B_input16="0"+B_input16
    }
    //RGB値を設定
    RGB_input16  = "#"+R_input16+""+G_input16+""+B_input16
}


function Result(){
// スコア計算
    square = (R_s-R_n)**2+(G_s-G_n)**2+(B_s-B_n)**2
    base = Math.max((255-R_s)**2,R_s**2)+Math.max((255-G_s)**2,G_s**2)+Math.max((255-B_s)**2,B_s**2)
    
    color_score = Math.ceil(4000-4000*square/base)

    result_time = Math.round(Number(localStorage.getItem("2timer"))*100)/100 
    if(result_time>3){
        //タイムスコアは3000点満点でタイムと反比例して点数が下がる
        time_score = Math.round(1000 * (3**0.5)/(result_time**0.5))
        score = color_score+time_score
        
    }else if(result_time<0.5){
        score = 0;
    }else{
        time_score = 1000;
        score = color_score+time_score
    }

    

// リザルト表示
    //色表示
    document.getElementById("answer_color").style.backgroundColor = RGB_question16;
    document.getElementById("input_color").style.backgroundColor = RGB_input16;
    // 自己記録判定
    myrecord = localStorage.getItem("2my_1record");
    if(myrecord==null || myrecord==0){
        myrecord = 0;
    }

    if(score>myrecord){
        localStorage.setItem("2my_1record",score);
        document.getElementById("score").innerHTML= score+"点";
        document.getElementById("score_detail").innerText = "Color:"+color_score+"点 Time:"+time_score+"点 ("+result_time +"秒)"
        document.getElementById("new_record").innerText ="New Record!";
        document.getElementById("answer_rgb").innerHTML = "("+R_s+","+G_s+","+B_s+")";
        document.getElementById("input_rgb").innerHTML = "("+R_n+","+G_n+","+B_n+")";
    }else if(score == 0){
        document.getElementById("score").innerHTML= score+"点";
        document.getElementById("score_detail").innerText = "Color:"+color_score+"点 Time:-"+color_score+"点 ("+result_time +"秒)"
        document.getElementById("answer_rgb").innerHTML = "("+R_s+","+G_s+","+B_s+")";
        document.getElementById("input_rgb").innerHTML = "("+R_n+","+G_n+","+B_n+")";
    
    }else{
        document.getElementById("score").innerHTML= score+"点";
        document.getElementById("score_detail").innerText = "Color:"+color_score+"点 Time:"+time_score+"点 ("+result_time +"秒)"
        document.getElementById("answer_rgb").innerHTML = "("+R_s+","+G_s+","+B_s+")";
        document.getElementById("input_rgb").innerHTML = "("+R_n+","+G_n+","+B_n+")";
    }
    //記録&色(16進数と括弧表示)保存
    localStorage.setItem("2score"+value,score)
    localStorage.setItem("2answer_rgb16"+value,RGB_question16)
    localStorage.setItem("2input_rgb16"+value,RGB_input16)
    localStorage.setItem("2answer_rgb"+value,"("+R_s+","+G_s+","+B_s+")")
    localStorage.setItem("2input_rgb"+value,"("+R_n+","+G_n+","+B_n+")")
    localStorage.setItem("2result_time"+value,result_time)
    
    // 記録個数1増やす
    value = value+1;
    localStorage.setItem("2index",value)
        
}


function MyRecord(){
    //記録個数取得
    value = Number(localStorage.getItem("2index"));
    // 前回の記録
    if(value==null || value==0){
        value = 1;
    }else{
        // document.getElementById("pre_1record").innerText = "前回の記録　Single:"+localStorage.getItem("2score"+(value-1))+"点　"
    }
    
    //ao5表示
    if(value>5){
        data5 = [];
        for(i=value-5;i<value;i++){
            data5[data5.length] = Number(localStorage.getItem("2score"+i))
        }
        
        max5 = Math.max.apply(null, data5);
        min5 = Math.min.apply(null, data5);
        // alert(max5+","+min5)
        sum5=0
        for(i=0;i<5;i++){
            sum5 += data5[i]
        }
        ao5 = Math.ceil((sum5-max5-min5)/3)
        localStorage.setItem("2Ao5"+(value-1),ao5)
        // document.getElementById("pre_ao5record").innerText = "Ao5: "+ao5+"点"

        all_ao5 = []
        for(i=0;i<value;i++){
            all_ao5[i]= localStorage.getItem("2Ao5"+i)
        }

        //Ao5 NewRecord!表示
        if(ao5>localStorage.getItem("2my_ao5record")){
        document.getElementById("score").innerHTML= score+"点";
        document.getElementById("score_detail").innerText = "Color:"+color_score+"点 Time:"+time_score+"点 ("+result_time +"秒)"
        document.getElementById("new_record").innerText ="New Record!";
        document.getElementById("answer_rgb").innerHTML = "問題("+R_s+","+G_s+","+B_s+")";
        document.getElementById("input_rgb").innerHTML = "回答("+R_n+","+G_n+","+B_n+")";
        }

        Ao5record = Math.max.apply(null, all_ao5);
        localStorage.setItem("2my_ao5record", Ao5record);
    }else{
        localStorage.setItem("2Ao5"+value,"")
        localStorage.setItem("2my_ao5record","")
    }

    // PB表示
    myrecord = localStorage.getItem("2my_1record");
    if(myrecord==null){

    }else{
        document.getElementById("my_1record").innerText = "PB　Single:"+myrecord+"点　"
    }

    Ao5record = localStorage.getItem("2my_ao5record");
    if(Ao5record==""){
        
    }else{
        document.getElementById("my_ao5record").innerText = "Ao5: "+Ao5record+"点";
    }


    // 色なしリザルト表示
    result = "" ;
    for(i=value-1;i>0;i--){
        if(i>4){
        result = result + i+"回目&nbsp;<b>"+localStorage.getItem("2score"+i)+"点</b>("+localStorage.getItem("2result_time"+i)+"秒)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ao5:<b>"+localStorage.getItem("2Ao5"+i)+"点</b><br>"
        }else{
            result = result + i+"回目&nbsp;<b>"+localStorage.getItem("2score"+i)+"点</b>("+localStorage.getItem("2result_time"+i)+"秒)<br>"
        }
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


function restart(){
    //色変更不可能を実装
    if(Counter!=0){
        location.reload();
    }
}

//記録全削除
var all_delete_button = document.getElementById('all_delete');
all_delete_button.addEventListener('click', function() {
    var all_delete_permission = window.confirm('本当に記録を削除してもよろしいですか？(マッチングモードの記録のみ削除します)');
    if( all_delete_permission ) {
        for(i=value-1;i>0;i--){
            localStorage.removeItem("2score"+i)
            localStorage.removeItem("2answer_rgb16"+i)
            localStorage.removeItem("2input_rgb16"+i)
            localStorage.removeItem("2answer_rgb"+i)
            localStorage.removeItem("2input_rgb"+i)
            localStorage.removeItem("2Ao5"+i)
    
        }
        localStorage.removeItem("2my_1record")
        localStorage.removeItem("2my_ao5record")
        localStorage.removeItem("2index")
        
        location.reload();
    }
    else {

    }
})

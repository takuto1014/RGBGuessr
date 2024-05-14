//初期色表示
AppearColor();

// ボタン回数初期化
let Counter = 0

// 記録表示
MyRecord();

function AppearColor(){
    // 色を表示
    RGB_question16 = localStorage.getItem("RGB_Temporary")
    if(RGB_question16!=null){
        //↓の変数を復活させる
        R_s = localStorage.getItem("R_s")
        G_s = localStorage.getItem("G_s")
        B_s = localStorage.getItem("B_s")
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
    localStorage.setItem("R_s",R_s)
    localStorage.setItem("G_s",G_s)
    localStorage.setItem("B_s",B_s)
    localStorage.setItem("RGB_Temporary", RGB_question16)

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

    //localStorageに一時保存したrgb値を削除
    localStorage.removeItem("RGB_Temporary")

    //色付きリザルト表示
    result = "" ;
    for(i=value-1;i>0;i--){
        if(i>4){
        result = result + i+"回目&nbsp;<b>"+localStorage.getItem("score"+i)+"点</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ao5:<b>"+localStorage.getItem("Ao5"+i)+"点</b><br>　問題&nbsp;<a style=\"background-color:"+localStorage.getItem("answer_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("answer_rgb"+i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>　回答&nbsp;<a style=\"background-color:"+localStorage.getItem("input_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("input_rgb"+i)+"<br>"
        }else{
            result = result + i+"回目&nbsp;<b>"+localStorage.getItem("score"+i)+"点</b><br>　問題&nbsp;<a style=\"background-color:"+localStorage.getItem("answer_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("answer_rgb"+i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>　回答&nbsp;<a style=\"background-color:"+localStorage.getItem("input_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("input_rgb"+i)+"<br>"
        }
    }

    document.getElementById("result").innerHTML = result


    //guessボタン削除(非表示)
    var judge_button = document.getElementById("guess_button")
    judge_button.remove();
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
    //指数 index
    index = 2;

    square = (R_s-R_n)**index+(G_s-G_n)**index+(B_s-B_n)**index
    base = Math.max((255-R_s)**index,R_s**index)+Math.max((255-G_s)**index,G_s**index)+Math.max((255-B_s)**index,B_s**index)
    
    score =Math.ceil(5000-5000*square/base)
    point = score+"点"


// リザルト表示
    //色表示
    document.getElementById("answer_color").style.backgroundColor = RGB_question16;
    document.getElementById("input_color").style.backgroundColor = RGB_input16;
    // 自己記録判定
    myrecord = localStorage.getItem("my_1record");
    if(myrecord==null || myrecord==0){
        myrecord = 0;
    }

    if(score>myrecord){
        localStorage.setItem("my_1record",score);
        document.getElementById("score").innerText = point;
        document.getElementById("new_record").innerText ="New Record!";
        document.getElementById("answer_rgb").innerHTML = "問題("+R_s+","+G_s+","+B_s+")";
        document.getElementById("input_rgb").innerHTML = "回答("+R_n+","+G_n+","+B_n+")";
    }else{
        document.getElementById("score").innerText = point
        document.getElementById("answer_rgb").innerHTML = "問題("+R_s+","+G_s+","+B_s+")";
        document.getElementById("input_rgb").innerHTML = "回答("+R_n+","+G_n+","+B_n+")";
    }
    //記録&色(16進数と括弧表示)保存
    localStorage.setItem("score"+value,score)
    localStorage.setItem("answer_rgb16"+value,RGB_question16)
    localStorage.setItem("input_rgb16"+value,RGB_input16)
    localStorage.setItem("answer_rgb"+value,"("+R_s+","+G_s+","+B_s+")")
    localStorage.setItem("input_rgb"+value,"("+R_n+","+G_n+","+B_n+")")
    
    // 記録個数1増やす
    value = value+1;
    localStorage.setItem("index",value)   
    
}


function MyRecord(){
    //記録個数取得
    value = Number(localStorage.getItem("index"));
    // 前回の記録
    if(value==null || value==0){
        value = 1;
    }else{
        // document.getElementById("pre_1record").innerText = "前回の記録　Single:"+localStorage.getItem("score"+(value-1))+"点　"
    }
    
    //ao5表示
    if(value>5){
        data5 = [];
        for(i=value-5;i<value;i++){
            data5[data5.length] = Number(localStorage.getItem("score"+i))
        }
        
        max5 = Math.max.apply(null, data5);
        min5 = Math.min.apply(null, data5);
        // alert(max5+","+min5)
        sum5=0
        for(i=0;i<5;i++){
            sum5 += data5[i]
        }
        ao5 = Math.ceil((sum5-max5-min5)/3)
        localStorage.setItem("Ao5"+(value-1),ao5)
        // document.getElementById("pre_ao5record").innerText = "Ao5: "+ao5+"点"

        all_ao5 = []
        for(i=0;i<value;i++){
            all_ao5[i]= localStorage.getItem("Ao5"+i)
        }

        //Ao5 NewRecord!表示
        if(ao5>localStorage.getItem("my_ao5record")){
            document.getElementById("score").innerText = point;
            document.getElementById("new_record").innerText ="New Record!";
            document.getElementById("answer_rgb").innerHTML = "問題("+R_s+","+G_s+","+B_s+")";
            document.getElementById("input_rgb").innerHTML = "回答("+R_n+","+G_n+","+B_n+")";
        }

        Ao5record = Math.max.apply(null, all_ao5);
        localStorage.setItem("my_ao5record", Ao5record);
    }else{
        localStorage.setItem("Ao5"+value,"")
        localStorage.setItem("my_ao5record","")
    }

    // PB表示
    myrecord = localStorage.getItem("my_1record");
    if(myrecord==null){

    }else{
        document.getElementById("my_1record").innerText = "PB　Single:"+myrecord+"点　"
    }

    Ao5record = localStorage.getItem("my_ao5record");
    if(Ao5record==""){
        
    }else{
        document.getElementById("my_ao5record").innerText = "Ao5: "+Ao5record+"点";
    }


    // 色なしリザルト表示
    result = "" ;
    for(i=value-1;i>0;i--){
        if(i>4){
        result = result + i+"回目&nbsp;<b>"+localStorage.getItem("score"+i)+"点</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ao5:<b>"+localStorage.getItem("Ao5"+i)+"点</b><br>"
        }else{
            result = result + i+"回目&nbsp;<b>"+localStorage.getItem("score"+i)+"点</b><br>"
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
    var all_delete_permission = window.confirm('本当に記録を削除してもよろしいですか？(オリジナルモードの記録のみ削除します)');
    if( all_delete_permission ) {
        for(i=value-1;i>0;i--){
            localStorage.removeItem("score"+i)
            localStorage.removeItem("answer_rgb16"+i)
            localStorage.removeItem("input_rgb16"+i)
            localStorage.removeItem("answer_rgb"+i)
            localStorage.removeItem("input_rgb"+i)
            localStorage.removeItem("Ao5"+i)
        }
        localStorage.removeItem("my_1record")
        localStorage.removeItem("my_ao5record")
        localStorage.removeItem("index")
            
        location.reload();
    }
    else {

    }
})

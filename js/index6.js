
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
    
    document.getElementById("sample").style.backgroundColor = RGB;    
}
changeColor();

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




function judgement(){
    // ボタン押した回数
    Counter = Counter + 1

    // 回数表示
    var C =Counter
    // alert(C)
    document.getElementById("count").innerText = (C+1)+"回目";

    // alert(Counter+"回")
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

        }else{
        alert("RGBは0から255の整数値を入力してください")
        
        }
    }else{
        alert("RGBは0から255の整数値を入力してください")
        
    }
    
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
    if(Counter==1){
        myrecord = localStorage.getItem("myrecord");
        if(myrecord==null || myrecord==0){
            myrecord = 0;
        }

        if(score>myrecord){
            localStorage.setItem("myrecord",score);
            document.getElementById("score").innerText = point+"(PB更新！)";
            document.getElementById("answer1").innerText = "答え: ("+R_s+","+G_s+","+B_s+")";
            document.getElementById("answer2").innerText = "あなたの回答: ("+R_n+","+G_n+","+B_n+")";
            
            music = document.querySelector("#music");
            music.play();

        }else{
            document.getElementById("score").innerText = point
            document.getElementById("answer1").innerText = "答え: ("+R_s+","+G_s+","+B_s+")";
            document.getElementById("answer2").innerText = "あなたの回答: ("+R_n+","+G_n+","+B_n+")";
        }
        //記録保存
        localStorage.setItem("value"+value,score)
        // alert("storegeの"+value+"番目に"+score+"を格納")
    
        // 記録個数1増やす
        value = value+1;
        localStorage.setItem("value",value)

    }else{
        alert("2回目以降はPBに反映されません")
        document.getElementById("score").innerText = point+"("+Counter+"回目)"
        document.getElementById("answer1").innerText = "答え: ("+R_s+","+G_s+","+B_s+")";
        document.getElementById("answer2").innerText = "あなたの回答: ("+R_n+","+G_n+","+B_n+")";

    }
        
}



function MyRecord(){
    //記録個数取得
    value = Number(localStorage.getItem("value"));

    // 前回の記録
    if(value==null || value==0){
        value = 1;
    }else{
        document.getElementById("prerecord").innerText = "前回の記録 Single: "+localStorage.getItem("value"+(value-1))+"点 "
    }
    
    // alert("value"+value)


    
    // 記録表示
    // for(i=1;i<value;i++){
    //     alert(i+"個目の記録は"+localStorage.getItem("value"+i))
    // }

    //ao5表示
    if(value>5){
        data5 = [];
        for(i=value-5;i<value;i++){
            data5[data5.length] = Number(localStorage.getItem("value"+i))
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
        document.getElementById("ao5record").innerText = "Ao5: "+ao5+"点"

        all_ao5 = []
        for(i=0;i<value;i++){
            all_ao5[i]= localStorage.getItem("Ao5"+i)
        }
        Ao5record = Math.max.apply(null, all_ao5);
        // alert(all_ao5)
        localStorage.setItem("Ao5record", Ao5record);
    }else{
        localStorage.setItem("Ao5"+value,"")
        localStorage.setItem("Ao5record","")
    }


    // PB表示
    myrecord = localStorage.getItem("myrecord");
    if(myrecord==null){

    }else{
        document.getElementById("myrecord1").innerText = "PB Single:"+myrecord+"点 "
    }

    Ao5record = localStorage.getItem("Ao5record");
    if(Ao5record==""){
        
    }else{
        document.getElementById("myrecord2").innerText = "Ao5: "+Ao5record+"点";
    }




    // 過去記録表示
    result = "" ;
    for(i=value-1;i>0;i--){

        result = result + i+"回目:"+localStorage.getItem("value"+i)+"(Ao5: "+localStorage.getItem("Ao5"+i)+")"+"<br>"
    }

    document.getElementById("result").innerHTML = result
}

function restart(){
    // 色を表示
    document.getElementById("sample").style.backgroundColor = randColor();
    
    // 記録表示
    MyRecord();
    
    // ボタン回数初期化
    Counter = 0
    document.getElementById("count").innerText = (C+1)+"回目";
    // location.reload();
    
}
function record_delete(){
    //記録全削除
    localStorage.clear();
    location.reload()
}


//スライダー実装
// input要素
const inputElem = document.getElementById('R_number');

// 埋め込む先の要素
const currentValueElem = document.getElementById('current-value');

// 現在の値を埋め込む関数
const setCurrentValue = (val) => {
  currentValueElem.innerText = val;
}

// inputイベント時に値をセットする関数
const rangeOnChange = (e) =>{
  setCurrentValue(e.target.value);
}

window.onload = () => {
  // 変更に合わせてイベントを発火する
  inputElem.addEventListener('input', rangeOnChange);
  // ページ読み込み時の値をセット
  setCurrentValue(inputElem.value);
}



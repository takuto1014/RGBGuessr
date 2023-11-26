
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



// ボタン押した回数の初期化
let Counter = 0

// 記録表示
MyRecord();

// ボタン回数表示
var C =Counter
document.getElementById("count").innerText = (C+1)+"回目";



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
            
            //localStorageに一時保存したrgb値を削除
            localStorage.removeItem("rgb")
        }else{
        alert("RGBは0から255の整数値を入力してください")
        
        }
    }else{
        alert("RGBは0から255の整数値を入力してください")
        
    }
    
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
    if(Counter==1){
        myrecord = localStorage.getItem("2myrecord");
        if(myrecord==null || myrecord==0){
            myrecord = 0;
        }

        if(score>myrecord){
            localStorage.setItem("2myrecord",score);
            document.getElementById("score").innerText = point+"(自己ベスト更新！)";
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
        localStorage.setItem("2value"+value,score)
        // alert("storegeの"+value+"番目に"+score+"を格納")
    
        // 記録個数1増やす
        value = value+1;
        localStorage.setItem("2value",value)

    }else{
        alert("2回目以降は自己ベストに反映されません")
        document.getElementById("score").innerText = point+"("+Counter+"回目)"
        document.getElementById("answer1").innerText = "答え: ("+R_s+","+G_s+","+B_s+")";
        document.getElementById("answer2").innerText = "あなたの回答: ("+R_n+","+G_n+","+B_n+")";

    }
        
}


function MyRecord(){
    //記録個数取得
    value = Number(localStorage.getItem("2value"));

    // 前回の記録
    if(value==null || value==0){
        value = 1;
    }else{
        document.getElementById("prerecord").innerText = "前回の記録 単発: "+localStorage.getItem("2value"+(value-1))+"点 "
    }
    
    // alert("value"+value)


    
    // 記録表示
    // for(i=1;i<value;i++){
    //     alert(i+"個目の記録は"+localStorage.getItem("2value"+i))
    // }

    //ao5表示
    if(value>5){
        data5 = [];
        for(i=value-5;i<value;i++){
            data5[data5.length] = Number(localStorage.getItem("2value"+i))
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
        document.getElementById("ao5record").innerText = "Ao5: "+ao5+"点"

        all_ao5 = []
        for(i=0;i<value;i++){
            all_ao5[i]= localStorage.getItem("2Ao5"+i)
        }
        Ao5record = Math.max.apply(null, all_ao5);
        // alert(all_ao5)
        localStorage.setItem("2Ao5record", Ao5record);
    }else{
        localStorage.setItem("2Ao5"+value,"")
        localStorage.setItem("2Ao5record","")
    }


    // 自己ベスト表示
    myrecord = localStorage.getItem("2myrecord");
    if(myrecord==null){

    }else{
        document.getElementById("myrecord1").innerText = "自己ベスト 単発:"+myrecord+"点 "
    }

    Ao5record = localStorage.getItem("2Ao5record");
    if(Ao5record==""){
        
    }else{
        document.getElementById("myrecord2").innerText = "Ao5: "+Ao5record+"点";
    }




    // 過去記録表示
    result = "" ;
    for(i=value-1;i>0;i--){

        result = result + i+"回目:"+localStorage.getItem("2value"+i)+"(Ao5: "+localStorage.getItem("2Ao5"+i)+")"+"<br>"
    }

    document.getElementById("result").innerHTML = result


    //満点限定王冠
    if(myrecord==5000){
        text = document.getElementById("title")
        text.innerHTML = "<a  href =fJpMDEXFiMwi5K3BeAWDsOvWGeNQ7X4lSHYOUf3eNhViTPUPgFVQXY4qoyEJYTYKEGQy0hC8XNptFRRVi8ShvneDkxMtMJaqHHNa.html>"+"勝者に授ける道"+"</a>";
        
    }


    //AO5 4990点以上バッジ
    Ao5record = localStorage.getItem("Ao5record")
    Ao5record2 = localStorage.getItem("2Ao5record")
    if(Ao5record==5000||Ao5record2==5000){
        document.getElementById("title_image").src="RgbGuessrGod.jpg"
    
    }else if(Ao5record>=4990||Ao5record2>=4990){
        document.getElementById("title_image").src="RgbGuessrPro.jpg"
    } 
     
}

function restart(){
    //色変更不可能を実装
    if(Counter!=0){
        // 色を表示
        document.getElementById("sample").style.backgroundColor = randColor();
        
        // 記録表示
        MyRecord();
        
        // ボタン回数初期化
        Counter = 0
        document.getElementById("count").innerText = (C+1)+"回目";
        // location.reload();
    }
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




//隠しコマンド
n=0
function timeout(){
    n=0
    oKeyDisplay.innerHTML = n;
}
secret_button = document.getElementById("secret")
secret_button.addEventListener('click', () => {
    
    n += 1

    setTimeout(timeout, 2500);
    if(n>20){
        location.href="fJpMDEXFiMwi5K3BeAWDsOvWGeNQ7X4lSHYOUf3eNhViTPUPgFVQXY4qoyEJYTYKEGQy0hC8XNptFRRVi8ShvneDkxMtMJaqHHNa.html"
    }
    // oKeyDisplay = document.getElementById('idKeyDisplay');
    // oKeyDisplay.innerHTML = n;
})


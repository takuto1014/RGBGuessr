// ボタン回数初期化
let Counter = 0

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


//guess!ボタン
function Guess_Action(){
    // ボタン回数+
    Counter = Counter + 1
    
    // "判定処理"
    Input_Convert();
    
    //スコア計算&結果表示
    Result();

    //過去記録表示
    MyRecord();
    
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

    //記録&色(16進数と括弧表示)保存
    localStorage.setItem("3input_rgb16"+value,RGB_input16)
    localStorage.setItem("3input_rgb"+value,"("+R_n+","+G_n+","+B_n+")")
    
    // 記録個数1増やす
    value = value+1;
    localStorage.setItem("3index",value)   
    
}


function MyRecord(){
    //記録個数取得
    value = Number(localStorage.getItem("3index"));
    // 前回の記録
    if(value==null || value==0){
        value = 1;
    }else{
        
    }
    
    
    // 過去記録表示
    result = "" ;
    for(i=value-1;i>0;i--){
        result = result + i+". <a style=\"background-color:"+localStorage.getItem("3input_rgb16"+i)+";\">　 </a>&nbsp;"+localStorage.getItem("3input_rgb"+i)+"<br>"
    }
    

    document.getElementById("result").innerHTML = result

}


//記録全削除
var all_delete_button = document.getElementById('all_delete');
all_delete_button.addEventListener('click', function() {
    var all_delete_permission = window.confirm('本当に保存した色を削除してもよろしいですか？');
    if( all_delete_permission ) {
        for(i=value-1;i>0;i--){
            localStorage.removeItem("3input_rgb16"+i)
            localStorage.removeItem("3input_rgb"+i)
        }
        localStorage.removeItem("3index")
        
        location.reload();
    }
    else {

    }
})


//AO5 4950点以上バッジ
Ao5record = localStorage.getItem("my_ao5record");
if(Ao5record>=4990){
    document.getElementById("title_image").src="img/RgbGuessrGod.jpg"

}else if(Ao5record>=4950){
    document.getElementById("title_image").src="img/RgbGuessrPro.jpg"
} 

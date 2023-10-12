// 储存初始数据
class data {
    chip_begin = 0;// 初始筹码
    games_begin = 0;// 总局数
    players_begin = 0;// 玩家个数
    playeri = 1;// 当前玩家
    rounds = 1;// 当前轮数
    half_rounds = 0.5;// 当前轮数的一半 
    nowgames = 0;// 当前局数
    nexr_games = 0;// 剩余局数
    magnification = 1;// 总倍率
    redouble_result = 0;// 加倍数
    aiplayer = 0;// ai个数
    playersArray = [];
}
var _data = new data();

// 储存动态数据
class Play{
    name = 0;// 名字
    chip = 0;// 筹码
    dice_mark = 0;//骰子分数
    changes = new Array(1,1,1,1,1);// 判定数字，无意义
    num2 = 0;// 判定数字，无意义
    num3 = new Array(1,1,1,1,1);// 判定数字，无意义
    a = new Array(0,0,0,0,0);// 判定数字，无意义
}
var _play = new data();

// 隐藏开始页面
var play1_open = function(){
    $(".open").hide();
}

// 开始按钮功能函数
var do_open = function(){
    // 获取初始数据
    var begin = document.querySelectorAll("input");
    _data.chip_begin = begin[0].value;
    _data.games_begin = begin[1].value;
    _data.players_begin = begin[2].value;
    _data.magnification = parseInt(begin[3].value);
    _data.aiplayer = begin[4].value;
    // 隐藏初始化页面
    $(".begin").hide();
    add_player();
    $(".redouble0").hide();
    $(".redouble1").hide();
    $(".redouble2").hide();
    $(".redouble3").hide();
    letsgo();
}

// 添加玩家函数,写入总局数,创建类
var add_player = function(){
    _data.players_begin = parseInt(_data.aiplayer) + parseInt(_data.players_begin);
    _data.players_begin = _data.players_begin + '';
    var num1 = _data.players_begin;
    for(var i=0;i<num1;i++){
        var j = num1-i;
        var txt1='\
        <div class="player" id="p'+j+'">\
            <div class="avatar"><img src="images3/m'+parseInt(Math.random()*291+1)+'.png"></div>\
            <div class="name"><p>玩家'+j+'</p></div>\
            <div class="chip"><p>剩余筹码: '+_data.chip_begin+'</p></div>\
            <div class="dicess1"><img src="img3/color2.png"></div>\
            <div class="dicess2"><img src="img3/color2.png"></div>\
            <div class="dicess3"><img src="img3/color2.png"></div>\
            <div class="dicess4"><img src="img3/color2.png"></div>\
            <div class="dicess5"><img src="img3/color2.png"></div>\
            <div class="mark"><p>得分: </p></div>\
        </div>';
        $('.player').animate({'top':'+=120px'});
        $(".leaderboard-box").append(txt1);
    }
    var next_games = document.querySelector(".status-box");
    next_games = next_games.querySelectorAll('div');
    next_games[1].innerHTML = '总局数: '+_data.games_begin;
    for(var i=1;i<num1+1;i++){
        var p = new Play();
        _play.playersArray.push(p)
    }
    ai_name();
}

// 摇骰子函数
var roll_click1 = function(){
    var d = document.querySelector('.dice');
    d = d.querySelectorAll('div')
    var b = document.querySelector('.dice');
    b = b.querySelectorAll('p')
    for(var i = 0;i<5;i++){
        d[i].innerHTML = '<img src="img3/color3.png">';
    }
    setTimeout(()=>{
        for(var i = 0;i<5;i++){
            if(_play.playersArray[_data.playeri].changes[i] === 1){
                var num0 = parseInt(Math.random()*6+1)
                d[i].innerHTML = '<img src="img3/'+num0+'.png">';
                b[i].innerHTML = num0;
            }
        }
        ai_1();
    },400)
}


var roll_click = function(){
    roll_click1();
}

//取得锁定
var dice0_click = function(){
    if(_play.playersArray[_data.playeri].changes[0] === 1){
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var dice_result = document.querySelector('.dice');
        dice_result = dice_result.querySelectorAll('p');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        change[_play.playersArray[_data.playeri].num2].innerHTML = 0;
        dice_locked[_play.playersArray[_data.playeri].num2].innerHTML = '<img src="img3/'+dice_result[0].innerHTML+'.png">';
        _play.playersArray[_data.playeri].num2++;
        _play.playersArray[_data.playeri].changes[0] = 0;
    }
}
var dice1_click = function(){
    if(_play.playersArray[_data.playeri].changes[1] === 1){
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var dice_result = document.querySelector('.dice');
        dice_result = dice_result.querySelectorAll('p');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        change[_play.playersArray[_data.playeri].num2].innerHTML = 1;
        dice_locked[_play.playersArray[_data.playeri].num2].innerHTML = '<img src="img3/'+dice_result[1].innerHTML+'.png">';
        _play.playersArray[_data.playeri].num2++;
        _play.playersArray[_data.playeri].changes[1] = 0;
    }
}
var dice2_click = function(){
    if(_play.playersArray[_data.playeri].changes[2] === 1){
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var dice_result = document.querySelector('.dice');
        dice_result = dice_result.querySelectorAll('p');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        change[_play.playersArray[_data.playeri].num2].innerHTML = 2;
        dice_locked[_play.playersArray[_data.playeri].num2].innerHTML = '<img src="img3/'+dice_result[2].innerHTML+'.png">';
        _play.playersArray[_data.playeri].num2++;
        _play.playersArray[_data.playeri].changes[2] = 0;
    }
}
var dice3_click = function(){
    if(_play.playersArray[_data.playeri].changes[3] === 1){
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var dice_result = document.querySelector('.dice');
        dice_result = dice_result.querySelectorAll('p');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        change[_play.playersArray[_data.playeri].num2].innerHTML = 3;
        dice_locked[_play.playersArray[_data.playeri].num2].innerHTML = '<img src="img3/'+dice_result[3].innerHTML+'.png">';
        _play.playersArray[_data.playeri].num2++;
        _play.playersArray[_data.playeri].changes[3] = 0;
    }
}
var dice4_click = function(){
    if(_play.playersArray[_data.playeri].changes[4] === 1){
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var dice_result = document.querySelector('.dice');
        dice_result = dice_result.querySelectorAll('p');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        change[_play.playersArray[_data.playeri].num2].innerHTML = 4;
        dice_locked[_play.playersArray[_data.playeri].num2].innerHTML = '<img src="img3/'+dice_result[4].innerHTML+'.png">';
        _play.playersArray[_data.playeri].num2++;
        _play.playersArray[_data.playeri].changes[4] = 0;
    }
}

//取消锁定
var unlock0 = function(){
    if(_play.playersArray[_data.playeri].num3[0] === 1){
        var unlock = document.querySelector('.select');
        unlock = unlock.querySelectorAll('div');
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        dice_locked[0].innerHTML = dice_locked[1].innerHTML;
        dice_locked[1].innerHTML = dice_locked[2].innerHTML;
        dice_locked[2].innerHTML = dice_locked[3].innerHTML;
        dice_locked[3].innerHTML = dice_locked[4].innerHTML;
        _play.playersArray[_data.playeri].changes[change[0].innerHTML] = 1;
        change[0].innerHTML = change[1].innerHTML;
        change[1].innerHTML = change[2].innerHTML;
        change[2].innerHTML = change[3].innerHTML;
        change[3].innerHTML = change[4].innerHTML;
        unlock[4].innerHTML = '<img src="img3/color1.png">';
        _play.playersArray[_data.playeri].num2--;
    }
}
var unlock1 = function(){
    if(_play.playersArray[_data.playeri].num3[1] === 1){
        var unlock = document.querySelector('.select');
        unlock = unlock.querySelectorAll('div');
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        dice_locked[1].innerHTML = dice_locked[2].innerHTML;
        dice_locked[2].innerHTML = dice_locked[3].innerHTML;
        dice_locked[3].innerHTML = dice_locked[4].innerHTML;
        _play.playersArray[_data.playeri].changes[change[1].innerHTML] = 1;
        change[1].innerHTML = change[2].innerHTML;
        change[2].innerHTML = change[3].innerHTML;
        change[3].innerHTML = change[4].innerHTML;
        unlock[4].innerHTML = '<img src="img3/color1.png">';
        _play.playersArray[_data.playeri].num2--;
    }
}
var unlock2 = function(){
    if(_play.playersArray[_data.playeri].num3[2] === 1){
        var unlock = document.querySelector('.select');
        unlock = unlock.querySelectorAll('div');
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        dice_locked[2].innerHTML = dice_locked[3].innerHTML;
        dice_locked[3].innerHTML = dice_locked[4].innerHTML;
        _play.playersArray[_data.playeri].changes[change[2].innerHTML] = 1;
        change[2].innerHTML = change[3].innerHTML;
        change[3].innerHTML = change[4].innerHTML;
        unlock[4].innerHTML = '<img src="img3/color1.png">';
        _play.playersArray[_data.playeri].num2--;
    }
}
var unlock3 = function(){
    if(_play.playersArray[_data.playeri].num3[3] === 1){
        var unlock = document.querySelector('.select');
        unlock = unlock.querySelectorAll('div');
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        dice_locked[3].innerHTML = dice_locked[4].innerHTML;
        _play.playersArray[_data.playeri].changes[change[3].innerHTML] = 1;
        change[3].innerHTML = change[4].innerHTML;
        unlock[4].innerHTML = '<img src="img3/color1.png">';
        _play.playersArray[_data.playeri].num2--;
    }
}
var unlock4 = function(){
    if(_play.playersArray[_data.playeri].num3[4] === 1){
        var unlock = document.querySelector('.select');
        unlock = unlock.querySelectorAll('div');
        var dice_locked = document.querySelector('.select');
        dice_locked = dice_locked.querySelectorAll('div');
        var change = document.querySelector('.select');
        change = change.querySelectorAll('p');

        _play.playersArray[_data.playeri].changes[change[4].innerHTML] = 1;
        unlock[4].innerHTML = '<img src="img3/color1.png">';
        _play.playersArray[_data.playeri].num2--;
    }
}

//锁定，上传骰子函数
var lock_result1 = function(){
    var dice_locked = document.querySelector('.select');
    dice_locked = dice_locked.querySelectorAll('div');
    var dicess_result = document.querySelector('#p'+_data.playeri+'')
    dicess_result = dicess_result.querySelectorAll('div');
    for(var i=0;i<5;i++){
        if(dice_locked[i].innerHTML[15] != "c"){
            dicess_result[i+3].innerHTML = dice_locked[i].innerHTML;
            _play.playersArray[_data.playeri].num3[i] = 0;
            _play.playersArray[_data.playeri].a[i] = Number(dice_locked[i].innerHTML[15]);
        }
    }
    go_left();
    if(dice_locked[4].innerHTML[15] != "c"){
        _play.playersArray[_data.playeri].a.sort((x,y)=> x - y)
        calculate();
    }
    if(_data.playeri == parseInt(_data.players_begin)&&_data.rounds == 3){
        get_chip();
        if(_data.games_begin != 1){
            go_right();
            _data.playeri = 1;
            go_left();
            _data.rounds = 1;
            goback3();
            goback2();
            next_rounds();
            now_rounds();
        }
        else{
            get_winner();
        }
    }
    else if(_data.playeri < parseInt(_data.players_begin)){
        _dataplayeriup();
        roll_click();
    }
    else if(_data.playeri == parseInt(_data.players_begin)&&_data.half_rounds+0.5 == _data.rounds){
        go_right();
        _data.playeri = 0;
        _data.half_rounds += 0.5;
        get_redouble();
    }
    goback1();
}

// 取倍率，上传
var redouble0_click = function(){
    _data.redouble_result = 0;
    $(".redouble0").hide();
    $(".redouble1").hide();
    $(".redouble2").hide();
    $(".redouble3").hide();
    _data.magnification += _data.redouble_result;
    var now_magnification = document.querySelector('.status-box');
    now_magnification = now_magnification.querySelectorAll('div');
    now_magnification[3].innerHTML = '总倍率: '+ _data.magnification+''
    if(_data.playeri !=parseInt(_data.players_begin)){
        setTimeout(get_redouble,500)
    }
    if(_data.playeri == parseInt(_data.players_begin)&&_data.half_rounds == _data.rounds){
        go_right();
        _data.playeri = 1;
        go_left();
        _data.half_rounds += 0.5;
        _data.rounds++;
        roll_click();
        now_rounds();
    }
}
var redouble1_click = function(){
    _data.redouble_result = 1;
    $(".redouble0").hide();
    $(".redouble1").hide();
    $(".redouble2").hide();
    $(".redouble3").hide();
    _data.magnification += _data.redouble_result;
    var now_magnification = document.querySelector('.status-box');
    now_magnification = now_magnification.querySelectorAll('div');
    now_magnification[3].innerHTML = '总倍率: '+ _data.magnification+''
    if(_data.playeri !=parseInt(_data.players_begin)){
        setTimeout(get_redouble,500)
    }
    if(_data.playeri == parseInt(_data.players_begin)&&_data.half_rounds == _data.rounds){
        go_right();
        _data.playeri = 1;
        go_left();
        _data.half_rounds += 0.5;
        _data.rounds++;
        roll_click();
        now_rounds();
    }
}
var redouble2_click = function(){
    _data.redouble_result = 2;
    $(".redouble0").hide();
    $(".redouble1").hide();
    $(".redouble2").hide();
    $(".redouble3").hide();
    _data.magnification += _data.redouble_result;
    var now_magnification = document.querySelector('.status-box');
    now_magnification = now_magnification.querySelectorAll('div');
    now_magnification[3].innerHTML = '总倍率: '+ _data.magnification+''
    if(_data.playeri !=parseInt(_data.players_begin)){
        setTimeout(get_redouble,500)
    }
    if(_data.playeri == parseInt(_data.players_begin)&&_data.half_rounds == _data.rounds){
        go_right();
        _data.playeri = 1;
        go_left();
        _data.half_rounds += 0.5;
        _data.rounds++;
        roll_click();
        now_rounds();
    }
}
var redouble3_click = function(){
    _data.redouble_result = 3;
    $(".redouble0").hide();
    $(".redouble1").hide();
    $(".redouble2").hide();
    $(".redouble3").hide();
    _data.magnification += _data.redouble_result;
    var now_magnification = document.querySelector('.status-box');
    now_magnification = now_magnification.querySelectorAll('div');
    now_magnification[3].innerHTML = '总倍率: '+ _data.magnification+''
    if(_data.playeri !=parseInt(_data.players_begin)){
        setTimeout(get_redouble,400)
    }
    if(_data.playeri == parseInt(_data.players_begin)&&_data.half_rounds == _data.rounds){
        go_right();
        _data.playeri = 1;
        go_left();
        _data.half_rounds += 0.5;
        _data.rounds++;
        roll_click();
        now_rounds();
    }
}
var get_redouble = function(){
    var ai_name = document.querySelector('#p'+parseInt(_data.playeri+1)+'');
    ai_name = ai_name.querySelectorAll('div')
    if(ai_name[1].innerHTML[3]+ai_name[1].innerHTML[4] == 'AI'){
        _data.magnification += 3*_data.aiplayer;
        var now_magnification = document.querySelector('.status-box');
        now_magnification = now_magnification.querySelectorAll('div');
        now_magnification[3].innerHTML = '总倍率: '+ _data.magnification+''
        go_right();
        _data.playeri = 1;
        go_left();
        _data.half_rounds += 0.5;
        _data.rounds++;
        roll_click();
        now_rounds();
        return;
    }
    $(".redouble0").show();
    $(".redouble1").show();
    $(".redouble2").show();
    $(".redouble3").show();
    _dataplayeriup();
}

//算分数，上传分数函数
var lock_result = function(){
    lock_result1();
}

var calculate = function(){
    var zero11 = 0,zero21 = 0,one1 = 0;
    var b1 = new Array(0,0,0,0);
    var c1 = new Array(0,0,0);
    
    var dice_locked = document.querySelector('.select');
    dice_locked = dice_locked.querySelectorAll('div');
    var mark_result = document.querySelector('#p'+_data.playeri+'');
    mark_result = mark_result.querySelectorAll('div');

    for(var i=0;i<5;i++){
        _play.playersArray[_data.playeri].dice_mark+=_play.playersArray[_data.playeri].a[i];
    }
    for(var i=0;i<4;i++){
        b1[i] = Math.abs(_play.playersArray[_data.playeri].a[i+1]-_play.playersArray[_data.playeri].a[i]);
    }
    for(var i=0;i<3;i++){
        c1[i] =  Math.abs(b1[i+1]-b1[i]);
    }
    for(var i=0;i<4;i++){
        if(b1[i] == 1) one1++;
        else if(b1[i] == 0) zero11++;
    }
    for(var i=0;i<3;i++){
        if(c1[i] == 0) zero21++;
    }
    
    if(one1 == 4) _play.playersArray[_data.playeri].dice_mark += 60;
    else if(one1 == 3 && zero11 == 1) _play.playersArray[_data.playeri].dice_mark += 30;
    else if(one1 == 3 && zero11 == 0 && zero21 == 2) _play.playersArray[_data.playeri].dice_mark += 30;
    else if(zero11 == 4) _play.playersArray[_data.playeri].dice_mark += 100;
    else if(zero11 == 3 && zero21 == 2) _play.playersArray[_data.playeri].dice_mark += 40;
    else if(zero11 == 3 && zero21 == 1) _play.playersArray[_data.playeri].dice_mark += 20;
    else if(zero11 == 2 && zero21 != 0) _play.playersArray[_data.playeri].dice_mark += 10;
    else if(zero11 == 2 && zero21 == 0) _play.playersArray[_data.playeri].dice_mark += 10;
    mark_result[8].innerHTML = '<p>得分: '+_play.playersArray[_data.playeri].dice_mark+'</p>';
}

// 复原函数1
var goback1 = function(){
    var d = document.querySelector('.dice');
    d = d.querySelectorAll('div')
    for(var i = 0;i<5;i++){
        d[i].innerHTML = '<img src="img3/color3.png">';
    }

    var dice_locked = document.querySelector('.select');
    dice_locked = dice_locked.querySelectorAll('div');
    for(var i = 0;i<5;i++){
        dice_locked[i].innerHTML = '<img src="img3/color1.png">';
    }
}

// 复原函数2
var goback2 = function(){
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        var go_back2 = document.querySelector('#p'+i+'');
        go_back2 = go_back2.querySelectorAll('div')
        go_back2[3].innerHTML = '<img src="img3/color2.png"></img>';
        go_back2[4].innerHTML = '<img src="img3/color2.png"></img>';
        go_back2[5].innerHTML = '<img src="img3/color2.png"></img>';
        go_back2[6].innerHTML = '<img src="img3/color2.png"></img>';
        go_back2[7].innerHTML = '<img src="img3/color2.png"></img>';
        go_back2[8].innerHTML = '<p>得分: </p>';
    }
}

// 复原函数3
var goback3 = function(){
    goback1();
    _data.half_rounds = 0.5;
    for(var i =0;i<parseInt(_data.players_begin);i++){
        if(_play.playersArray[i+1].chip > 0){
            _play.playersArray[i+1].dice_mark = 0;
        _play.playersArray[i+1].changes = new Array(1,1,1,1,1);
        _play.playersArray[i+1].num2 = 0;
        _play.playersArray[i+1].num3 = new Array(1,1,1,1,1);
        _play.playersArray[i+1].a = new Array(0,0,0,0,0)
        }
    }
    _data.games_begin--;
    roll_click1()
}

// 算筹码函数
var get_chip = function(){
    var a1 = new Array();
    var max = 0;
    var sum = 0;
    var max_number = 0;
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        if(_play.playersArray[i].dice_mark > max){
            max = _play.playersArray[i].dice_mark;
        }
    }
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        if(_play.playersArray[i].dice_mark == max){
            max_number++;
        }
        a1[i] = (max - _play.playersArray[i].dice_mark)*_data.magnification;
        sum += a1[i];
    }
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        if(_play.playersArray[i].dice_mark == max){
            _play.playersArray[i].chip += sum;
        }
        else if(_play.playersArray[i].dice_mark < max){
            _play.playersArray[i].chip -= a1[i]*max_number;
        }
    }
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        var player_chip = document.querySelector('#p'+i+'')
        player_chip = player_chip.querySelectorAll('div')
        player_chip[2].innerHTML = '<p>剩余筹码: '+_play.playersArray[i].chip+'</p>';
    }
    clear_dead();
}

// 算赢家函数
var get_winner = function(){
    var max = 0;
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        if(_play.playersArray[i].chip >= max){
            max = _play.playersArray[i].chip;
        }
    }
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        if(_play.playersArray[i].chip == max){
            var ai_name = document.querySelector('#p'+i+'');
            ai_name = ai_name.querySelectorAll('div')
            if(ai_name[1].innerHTML[3]+ai_name[1].innerHTML[4] != 'AI'){
                var winner = document.querySelector('#p'+i+'')
                winner = winner.querySelectorAll('div')
                alert(winner[1].innerHTML[3]+winner[1].innerHTML[4]+winner[1].innerHTML[5]+"获胜")
            }
            else if(ai_name[1].innerHTML[3]+ai_name[1].innerHTML[4] == 'AI'){
                var winner = document.querySelector('#p'+i+'')
                winner = winner.querySelectorAll('div')
                alert(winner[1].innerHTML[3]+winner[1].innerHTML[4]+winner[1].innerHTML[5]+winner[1].innerHTML[6]+winner[1].innerHTML[7]+"获胜")
            }
        }
    }
}

// 同步当前轮数
var now_rounds = function(){
    var rounds = document.querySelector('.status-box')
    rounds = rounds.querySelectorAll('div')
    rounds[0].innerHTML = '当前轮数: '+_data.rounds+''
}

//同步当前剩余局数 
var next_rounds = function(){
    var next_rounds = document.querySelector('.status-box')
    next_rounds = next_rounds.querySelectorAll('div')
    next_rounds[2].innerHTML = '剩余局数: '+_data.games_begin+''
}

// 玩家突出函数
var go_left = function(){
    $('#p'+_data.playeri+'').css("right","4%");
    // $('#p'+_data.playeri+'').animate({left:'10px'});
}
var go_right = function(){
    $('#p'+_data.playeri+'').css("right","2%");
    // $('#p'+_data.playeri+'').animate({right:'20px'});
}

// _data.playeri++函数
var _dataplayeriup = function(){
    go_right()
    _data.playeri++;
    go_left()
}

// 清除死人函数
var clear_dead = function(){
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        if(_play.playersArray[i].chip <= 0){
            var loser    = document.querySelector('#p'+i+'')
            loser = loser.querySelectorAll('div')
            var ai_name = document.querySelector('#p'+i+'');
            ai_name = ai_name.querySelectorAll('div')
            if(ai_name[1].innerHTML[3]+ai_name[1].innerHTML[4] != 'AI'){
                alert("游戏结束,"+loser[1].innerHTML[3]+loser[1].innerHTML[4]+loser[1].innerHTML[5]+"死亡")
                _data.games_begin = 1;
            }
            else if(ai_name[1].innerHTML[3]+ai_name[1].innerHTML[4] == 'AI'){
                alert("游戏结束,"+loser[1].innerHTML[3]+loser[1].innerHTML[4]+loser[1].innerHTML[5]+loser[1].innerHTML[6]+loser[1].innerHTML[7]+"死亡")
                _data.games_begin = 1;
            }
        }
    }
}

// ai锁定算法
var ai_1 = function(){
    // 如果当前不是ai，退出
    var ai_name = document.querySelector('#p'+_data.playeri+'');
    ai_name = ai_name.querySelectorAll('div')
    if(ai_name[1].innerHTML[3]+ai_name[1].innerHTML[4] != 'AI'){
        return;
    }
    else{
        get_dice();
        lock_result1();
    }
}

// 骰子函数1
var get_dice = function(){
    for(var i=0;i<5;i++){
        if(_play.playersArray[_data.playeri].changes[i] === 1){
            var get_dices = document.querySelector('.dice');
            get_dices = get_dices.querySelectorAll('div');
            if(_data.rounds == 1){
                AIwork();
            }
            else if(_data.rounds == 2){
                // if((get_dices[i].innerHTML[15]) > 4){
                //     eval('dice'+i+'_click()')
                // }
            }
            else if(_data.rounds == 3){
                eval('dice'+i+'_click()')
            }
        }
    }
}

//ai改名 
var ai_name = function(){
    var ai_names = 0;
    for(var i=parseInt(_data.players_begin)-parseInt(_data.aiplayer)+1;i<parseInt(_data.players_begin)+1;i++){
        ai_names++;
        var ai_name = document.querySelector('#p'+i+'')
        ai_name = ai_name.querySelectorAll('div')
        ai_name[1].innerHTML = '<p>AI玩家'+ai_names+'</p>'
    }
}

function AIwork(){
	var a2 = new Array(0,0,0,0,0)
    var a1 = new Array(0,0,0,0,0)
	for(var i=0;i<5;i++){
    	var dice_1 = document.querySelector('.dice')
    	dice_1 = dice_1.querySelectorAll('div')
    	a2[i] = parseInt(dice_1[i].innerHTML[15]);
	}// 投掷了5个骰子

    for(var i=0;i<5;i++){
        a1[i] = a2[i];
    }
    var num = 0,zero1 = 0,zero2 = 0,one = 0;
    var b = new Array(0,0,0,0);
    var c = new Array(0,0,0);
    a1.sort((x,y)=> x - y)

    for(var i=0;i<4;i++){
        b[i] = Math.abs(a1[i+1]-a1[i]);
        }
    for(var i=0;i<3;i++){
        c[i] =  Math.abs(b[i+1]-b[i]);
    }
    for(var i=0;i<4;i++){
        if(b[i] == 1) one++;
        else if(b[i] == 0) zero1++;
    }
    for(var i=0;i<3;i++){
        if(c[i] == 0) zero2++;
    }
	let counts = Array(6).fill(0);
	for (let i = 0; i < a2.length; i++) {  
        if (a2[i] == 1) {  
            counts[0]++;  
        } else if (a2[i] == 2) {  
            counts[1]++;  
        } else if (a2[i] == 3) {  
            counts[2]++;  
        } else if (a2[i] == 4) {  
            counts[3]++;  
        } else if (a2[i] == 5) {  
            counts[4]++;  
        } else if (a2[i] == 6) {  
            counts[5]++;  
        }  
    }//对出现的数字进行计数
	
	if (countOccurrences(counts,5)===1){
		keynumber=findIndex(counts,5)
		var count = 0;
		var dice_1 = document.querySelector('.dice')
		dice_1 = dice_1.querySelectorAll('div')
		for(var i=0;i<5;i++){
			if(count == 5){
				break;
			}
			if(parseInt(dice_1[i].innerHTML[15]) == keynumber){
				eval('dice'+i+'_click()')
				count++
			}
		}
	}
	else if (countOccurrences(counts,4)===1&&countOccurrences(counts,1)===1){
		//4连 锁四个相同的
		keynumber=findIndex(counts,4)
		var count = 0;
		var dice_1 = document.querySelector('.dice')
		dice_1 = dice_1.querySelectorAll('div')
		for(var i=0;i<5;i++){
			if(count == 4){
				break;
			}
			if(parseInt(dice_1[i].innerHTML[15]) == keynumber){
				eval('dice'+i+'_click()')
				count++
			}
		}
	}
	else if(countOccurrences(counts,3)===1&&countOccurrences(counts,2)===1){
		//葫芦 锁3个相同的
		keynumber=findIndex(counts,3)
		var count = 0;
		var dice_1 = document.querySelector('.dice')
		dice_1 = dice_1.querySelectorAll('div')
		for(var i=0;i<5;i++){
			if(count == 3){
				break;
			}
			if(parseInt(dice_1[i].innerHTML[15]) == keynumber){
				eval('dice'+i+'_click()')
				count++
			}
		}
	}
	else if(countOccurrences(counts,3)===1&&countOccurrences(counts,1)===2){
		//3连 锁前面3个
		keynumber=findIndex(counts,3)
		var count = 0;
		var dice_1 = document.querySelector('.dice')
		dice_1 = dice_1.querySelectorAll('div')
		for(var i=0;i<5;i++){
			if(count == 3){
				break;
			}
			if(parseInt(dice_1[i].innerHTML[15]) == keynumber){
				eval('dice'+i+'_click()')
				count++
			}
		}
	}
	else if(one == 4){
		//大顺子 全部锁
		for(var i=0;i<5;i++){
			eval('dice'+i+'_click()')
		}
	}
	else if(one == 3 && zero1 == 1){
		//小顺子 锁四个连续的
        a1.sort((x,y)=> x - y)
        for(var i=0;i<4;i++){
            if(a1[i+1] == a1[i]) a1[i] = 0;
        }
        for(var i=0;i<5;i++){
            if(a1[i] != 0){
            eval('dice'+i+'_click()');
            }
        }
    }
    else if(one == 3 && zero1 == 0 && zero2 == 2){
        a1.sort((x,y)=> x - y)
        for(var i=0;i<4;i++){
            if(a1[0] == 1 && a1[1] == 3) a1[0] = 0;
            if(a1[3] == 4 && a1[4] == 6) a1[4] = 0;
        }
        for(var i=0;i<5;i++){
            if(a1[i] != 0){
            eval('dice'+i+'_click()');
            }
        }
    }
	else if(countOccurrences(counts,2)===2&&countOccurrences(counts,1)===1)
	{	//双对 锁最大的俩个相同数字
		keynumber=findIndex(counts,2)
		var count = 0;// 计数
		// 获取骰子结果
		var dice_1 = document.querySelector('.dice')
		dice_1 = dice_1.querySelectorAll('div')
		for(var i=0;i<5;i++){
			if(count == 2){
				break;
			}
			if(parseInt(dice_1[i].innerHTML[15]) == keynumber){
				eval('dice'+i+'_click()')
				count++
			}
		}
	}
	else if(countOccurrences(counts,2)===1&&countOccurrences(counts,1)===3)
	{	
		//只有俩个相同的 锁俩个相同的
		keynumber=findIndex(counts,2)
		var count = 0;
		var dice_1 = document.querySelector('.dice')
		dice_1 = dice_1.querySelectorAll('div')
		for(var i=0;i<5;i++){
			if(count == 2){
				break;
			}
			if(parseInt(dice_1[i].innerHTML[15]) == keynumber){
				eval('dice'+i+'_click()')
				count++
			}
		}
	}
	else {
        var dice_1 = document.querySelector('.dice')
		dice_1 = dice_1.querySelectorAll('div')
        for(var i=0;i<5;i++){
            if(parseInt(dice_1[i].innerHTML[15]) > 4){
                eval('dice'+i+'_click()')
            }
        }
	}
}

function findIndex(arr, num) {  
    for (let i = 0; i < arr.length; i++) {  
      if (arr[i] === num) {  
        return i+1;  
      }  
    }  
    return -1;  
}
  
function countOccurrences(array, number) {  
    let count = 0;  
    for(let i = 0; i < array.length; i++) {  
        if(array[i] === number) {  
            count++;  
        }  
    }  
    return count;  
}

// 开始游戏函数
var letsgo = function(){
    // 获取初始筹码
    for(var i=1;i<parseInt(_data.players_begin)+1;i++){
        _play.playersArray[i].chip = parseInt(_data.chip_begin);
    }
    // 写入初始倍率
    var redouble_begin = document.querySelector(".status-box");
    redouble_begin = redouble_begin.querySelectorAll('div');
    redouble_begin[3].innerHTML = '总倍率: '+_data.magnification+''
    next_rounds();
    roll_click();
    go_left();
}
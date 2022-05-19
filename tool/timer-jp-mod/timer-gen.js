//リンク生成、「特定の日時を指定するタイマー」
function generateDeletionLink() {
    var ardate = document.getElementById("end-date")
    var artime = document.getElementById("end-time")
    var spdate = ardate.value.split("-")
    var sptime = artime.value.split(":")
    var month = spdate[1];
    var day = spdate[2];
    var year = spdate[0];
    var hour = sptime[0];
    var minute = sptime[1];
    var type = $("input:radio[name=type]:checked").val();
    var timestamp = new Date(year, month, day, hour, minute, 0, 0);
    var code = "";

    var url =
        "https://puton1221.github.io/tool/timer-jp/timer.html?timestamp=" +
        timestamp.getTime() + "&type=" + type;

    if ($("#notice").prop("checked")) {
        code += "この記事は評価が-3を下回った為、「低評価による削除」の対象となりました。\n" +
            "この通知から**72時間後**までに、評価-2以上にならなければ削除となります。\n" +
            "詳しくは[[[deletions-guide|こちら]]]を参照して、適切な対処を行ってください。\n" +
            "\n";
    }

    code += "[[iframe " + url + ' style="width: 400px; height: 50px;"]]';
    $("#code").html(code);
    $("iframe").prop("src", url);
    $("#generated").show();
}

//タイマーの日時を指定時間後にセットする
function setDeletionTimer() {
    var day = $("#aftDay").val();
    var hour = $("#aftHour").val();
    var minute = $("#aftMinute").val();
    var now = new Date();
    var timestamp = new Date(
        now.getTime() + (day * 24 * 60 * 60 * 1000) + (hour * 60 * 60 * 1000) +
            (minute * 60 * 1000),
    );

    spdate[0](timestamp.getFullYear());
    spdate[1](timestamp.getMonth());
    spdate[2](timestamp.getDate());
    sptime[0](timestamp.getHours());
    sptime[1](timestamp.getMinutes());
    $("input:radio[name=type]:eq(0)").prop("checked", true);

    generateDeletionLink();
}

//削除通知一括設定
function batchDelete() {
    $("#aftDay").val(3);
    $("#aftHour").val(0);
    $("#aftMinute").val(0);
    $("#notice").prop("checked", true);

    setDeletionTimer();
}

//ページ表示時の初期処理
function initGenerators() {
    var now = new Date();
    var i;
    var html = "";

    for (i = 2014; i < 2060; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    spdate[0].html(html).val(now.getFullYear());
    html = "";

    for (i = 0; i < 12; i++) {
        html += '<option value="' + i + '">' + (i + 1) + "</option>";
    }
    spdate[1].html(html).val(now.getMonth());
    html = "";

    for (i = 1; i < 32; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    spdate[2].html(html).val(now.getDate());
    html = "";

    for (i = 0; i < 24; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    sptime[0].html(html).val(now.getHours());
    html = "";

    for (i = 0; i < 60; i++) {
        html += '<option value="' + i + '">' + (i < 10 ? "0" : "") + i +
            "</option>";
    }
    sptime[1].html(html).val(now.getMinutes());
    html = "";

    for (i = 0; i < 31; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#aftDay").html(html);
    html = "";

    for (i = 0; i < 24; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#aftHour").html(html);
    html = "";

    for (i = 0; i < 60; i++) {
        html += '<option value="' + i + '">' + i + "</option>";
    }
    $("#aftMinute").html(html);

    $("#batchDel").on("click", function () {
        batchDelete();
    });
}

//コピーボタンの実装
function copy() {
  var copyTarget = document.getElementById("code");
  copyTarget.select();
  document.execCommand("Copy");
  alert("コピーしました");
};

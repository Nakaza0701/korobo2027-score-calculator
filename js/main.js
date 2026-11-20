
// ========================================
// チーム設定
// ========================================

// HTMLの要素を取得
const myTeamColor = document.getElementById("my-team-color");
const partnerTeamColor = document.getElementById("partner-team-color");

function checkTeamColor(changedTeam) {
    if (myTeamColor.value === partnerTeamColor.value) {
        alert("自チームとタッグメイトの色を反転します。");

        // 変更された側の色を反転
        if (changedTeam === "my") {
            myTeamColor.value =
                myTeamColor.value === "red" ? "blue" : "red";
        } else {
            partnerTeamColor.value =
                partnerTeamColor.value === "red" ? "blue" : "red";
        }
    }
}

// 色が変更されたときに確認
myTeamColor.addEventListener("change", function() {
    checkTeamColor("my");
});

partnerTeamColor.addEventListener("change", function() {
    checkTeamColor("partner");
});

// 初期状態も確認
checkTeamColor("my");

// ========================================
// バケツ・ボールの管理
// ========================================

// 最大登録数
const MAX_BUCKETS = 6;
const MAX_BALLS = 12;

// バケツとボールの登録数
let bucketCount = 0;
let ballCount = 0;

// HTMLの要素を取得
const bucketList = document.getElementById("bucket-list");
const addBucketButton = document.getElementById("add-bucket-button");

const bucketCountDisplay = document.getElementById("bucket-count");
const ballCountDisplay = document.getElementById("ball-count");

// ========================================
// 表示の更新
// ========================================

function updateCount() {
    bucketCountDisplay.textContent =
        `バケツ：${bucketCount} / ${MAX_BUCKETS} 個`;

    ballCountDisplay.textContent =
        `ボール：${ballCount} / ${MAX_BALLS} 個`;
}

// 初期表示
updateCount();


// ========================================
// バケツの追加
// ========================================

function addBucket() {
    // 最大数を超えていないか確認
    if (bucketCount >= MAX_BUCKETS) {
        alert("バケツは最大6個までです。");
        return;
    }

    // バケツの番号
    const bucketNumber = bucketList.children.length + 1;

    // バケツの要素を作成
    const bucketCard = document.createElement("div");
    bucketCard.className = "bucket-card";

    // バケツのHTMLを設定
    bucketCard.innerHTML = `
        <h3>バケツ ${bucketNumber}</h3>

        <div class="bucket-info">
            <label>
                バケツの色
                <select class="bucket-color">
                    <option value="red">赤</option>
                    <option value="blue">青</option>
                </select>
            </label>

            <label>
                設置場所
                <select class="bucket-location">
                    <option value="summit">山頂</option>
                    <option value="hut">山小屋</option>
                    <option value="trailhead">登山口</option>
                </select>
            </label>
        </div>

        <div class="ball-section">
            <h4>バケツの中のボール</h4>

            <div class="ball-list"></div>

            <button type="button" class="add-ball-button">
                ボールを追加
            </button>
        </div>

        <button type="button" class="delete-bucket-button">
            バケツを削除
        </button>
    `;

    // バケツ一覧に追加
    bucketList.appendChild(bucketCard);

    // バケツ数を更新
    bucketCount++;

    updateCount();
    updateColorOptions();
    calculateScore();
}

// ========================================
// バケツの削除
// ========================================

function deleteBucket(button) {
    // 削除対象のバケツを取得
    const bucketCard = button.closest(".bucket-card");

    // バケツ内のボール数を取得
    const balls = bucketCard.querySelectorAll(".ball-list .ball-item");

    // ボール数を減らす
    ballCount -= balls.length;

    // バケツを削除
    bucketCard.remove();

    // バケツ数を減らす
    bucketCount--;

    updateCount();
    calculateScore();

    // バケツ番号を振り直す
    updateBucketNumbers();
}

// ========================================
// バケツ番号の更新
// ========================================

function updateBucketNumbers() {
    const buckets = bucketList.querySelectorAll(".bucket-card");

    buckets.forEach((bucket, index) => {
        bucket.querySelector("h3").textContent =
            `バケツ ${index + 1}`;
    });
}

// ========================================
// ボタンの動作
// ========================================

// バケツ追加ボタン
addBucketButton.addEventListener("click", addBucket);

// バケツ削除ボタン
bucketList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-bucket-button")) {
        deleteBucket(event.target);
    }
});

// ========================================
// ボールの追加
// ========================================

function addBall(button) {
    // 最大数を超えていないか確認
    if (ballCount >= MAX_BALLS) {
        alert("ボールは最大12個までです。");
        return;
    }

    // ボールを追加するバケツを取得
    const bucketCard = button.closest(".bucket-card");

    // ボール一覧を取得
    const ballList = bucketCard.querySelector(".ball-list");

    // ボールの要素を作成
    const ballItem = document.createElement("div");
    ballItem.className = "ball-item";

    // ボールのHTMLを設定
    ballItem.innerHTML = `
        <label>
            ボールの色
            <select class="ball-color">
                <option value="red">赤</option>
                <option value="blue">青</option>
            </select>
        </label>

        <button type="button" class="delete-ball-button">
            削除
        </button>
    `;

    // ボール一覧に追加
    ballList.appendChild(ballItem);

    // ボール数を更新
    ballCount++;

    updateCount();
    updateColorOptions();
    calculateScore();
}

// ========================================
// ボールの削除
// ========================================

function deleteBall(button) {
    // 削除対象のボールを取得
    const ballItem = button.closest(".ball-item");

    // ボールを削除
    ballItem.remove();

    // ボール数を更新
    ballCount--;

    updateCount();
    calculateScore();
}

// ========================================
// ボール追加・削除ボタンの動作
// ========================================

bucketList.addEventListener("click", function(event) {
    // ボール追加ボタン
    if (event.target.classList.contains("add-ball-button")) {
        addBall(event.target);
    }

    // ボール削除ボタン
    if (event.target.classList.contains("delete-ball-button")) {
        deleteBall(event.target);
    }
});

// ========================================
// バケツ・ボールの色設定
// ========================================

function updateColorOptions() {
    // 現在のチームカラーを取得
    const colors = [
        {
            value: myTeamColor.value,
            label: myTeamColor.options[myTeamColor.selectedIndex].text
        },
        {
            value: partnerTeamColor.value,
            label: partnerTeamColor.options[partnerTeamColor.selectedIndex].text
        }
    ];

    // すべてのバケツ・ボールの色選択欄を取得
    const colorSelects = document.querySelectorAll(
        ".bucket-color, .ball-color"
    );

    colorSelects.forEach(select => {
        // 現在選択されている色を保存
        const previousValue = select.value;

        // 選択肢を初期化
        select.innerHTML = "";

        // チームカラーを選択肢に追加
        colors.forEach(color => {
            const option = document.createElement("option");

            option.value = color.value;
            option.textContent = color.label;

            select.appendChild(option);
        });

        // 以前の選択色が存在すれば維持する
        if (colors.some(color => color.value === previousValue)) {
            select.value = previousValue;
        }
    });
}

// チームカラーが変更されたときに更新
myTeamColor.addEventListener("change", updateColorOptions);
partnerTeamColor.addEventListener("change", updateColorOptions);

// 初期状態を更新
updateColorOptions();

// ========================================
// 得点計算
// ========================================

// 場所ごとの倍率
const locationMultipliers = {
    summit: 4,
    hut: 2,
    trailhead: 1
};

// 場所の表示名
const locationNames = {
    summit: "山頂",
    hut: "山小屋",
    trailhead: "登山口"
};

// オブジェクトの交換倍率を取得
function getExchangeMultiplier(color) {
    if (color === myTeamColor.value) {
        return 1;
    }

    return 5;
}

// 得点計算
function calculateScore() {
    let totalScore = 0;
    const details = [];

    // すべてのバケツを取得
    const buckets = bucketList.querySelectorAll(".bucket-card");

    buckets.forEach((bucket, index) => {
        // バケツの情報を取得
        const bucketColor =
            bucket.querySelector(".bucket-color").value;

        const location =
            bucket.querySelector(".bucket-location").value;

        const locationMultiplier =
            locationMultipliers[location];

        const locationName =
            locationNames[location];

        // バケツの得点を計算
        const bucketMultiplier =
            getExchangeMultiplier(bucketColor);

        const bucketScore =
            1 * locationMultiplier * bucketMultiplier;

        totalScore += bucketScore;

        // バケツの内訳
        details.push(
            `バケツ ${index + 1}（${bucketColor === myTeamColor.value ? "自チーム色" : "タッグメイト色"}）：${bucketScore}点`
        );

        // バケツ内のボールを取得
        const balls = bucket.querySelectorAll(".ball-item");

        balls.forEach((ball, ballIndex) => {
            const ballColor =
                ball.querySelector(".ball-color").value;

            // ボールの交換倍率
            const ballMultiplier =
                getExchangeMultiplier(ballColor);

            // ボールの得点
            const ballScore =
                2 * locationMultiplier * ballMultiplier;

            totalScore += ballScore;

            // ボールの内訳
            details.push(
                `　ボール ${ballIndex + 1}（${ballColor === myTeamColor.value ? "自チーム色" : "タッグメイト色"}）：${ballScore}点`
            );
        });

        // バケツごとの小計を表示するための区切り
        details.push(
            `　設置場所：${locationName}（×${locationMultiplier}）`
        );
    });

    // 合計得点を表示
    document.getElementById("total-score").textContent =
        `合計得点：${totalScore} 点`;

    // 得点の内訳を表示
    document.getElementById("score-details").textContent =
        details.join("\n");
}

// ========================================
// 得点の自動更新
// ========================================

// バケツ・ボールの色や設置場所が変更されたとき
bucketList.addEventListener("change", calculateScore);

// チームカラーが変更されたとき
myTeamColor.addEventListener("change", calculateScore);
partnerTeamColor.addEventListener("change", calculateScore);

// 初期状態の得点を計算
calculateScore();

// ========================================
// リセット機能
// ========================================

const resetButton = document.getElementById("reset-button");

function resetData() {
    // 本当にリセットするか確認
    const result = confirm(
        "バケツとボールの登録内容をすべてリセットしますか？"
    );

    // キャンセルされた場合は何もしない
    if (!result) {
        return;
    }

    // すべてのバケツを削除
    bucketList.innerHTML = "";

    // 登録数を初期状態に戻す
    bucketCount = 0;
    ballCount = 0;

    // 表示を更新
    updateCount();
    calculateScore();
}

// リセットボタンの動作
resetButton.addEventListener("click", resetData);

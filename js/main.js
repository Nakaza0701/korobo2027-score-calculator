
// チームカラーの設定
const colors = [
    { value: "red", label: "赤" },
    { value: "blue", label: "青" }
];

// 設置場所の設定
const locations = [
    { value: "summit", label: "山頂" },
    { value: "hut", label: "山小屋" },
    { value: "trailhead", label: "登山口" }
];

// チームごとのバケツ数
const bucketCounts = {
    A: 0,
    B: 0
};

// チームカラーの選択肢を設定する
function setupTeamColors() {
    const teamAColor = document.getElementById("team-a-color");
    const teamBColor = document.getElementById("team-b-color");

    colors.forEach(color => {
        const optionA = document.createElement("option");
        optionA.value = color.value;
        optionA.textContent = color.label;
        teamAColor.appendChild(optionA);

        const optionB = document.createElement("option");
        optionB.value = color.value;
        optionB.textContent = color.label;
        teamBColor.appendChild(optionB);
    });

    // 同じ色が選択されないようにする
    teamAColor.addEventListener("change", () => {
        if (teamAColor.value === teamBColor.value) {
            alert("チームAとチームBには別々の色を設定してください。");
            teamAColor.value = "";
        }
    });

    teamBColor.addEventListener("change", () => {
        if (teamAColor.value === teamBColor.value) {
            alert("チームAとチームBには別々の色を設定してください。");
            teamBColor.value = "";
        }
    });
}

// 選択肢を作成する
function createSelect(options) {
    const select = document.createElement("select");

    options.forEach(item => {
        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = item.label;
        select.appendChild(option);
    });

    return select;
}

// バケツを追加する
function addBucket(team) {
    if (bucketCounts[team] >= 3) {
        return;
    }

    bucketCounts[team]++;

    const container = document.getElementById(`team-${team.toLowerCase()}-buckets`);

    // バケツ全体
    const bucket = document.createElement("div");
    bucket.className = "bucket-card";

    // バケツの見出し
    const title = document.createElement("h3");
    title.textContent = `バケツ ${bucketCounts[team]}`;
    bucket.appendChild(title);

    // バケツの色
    const colorLabel = document.createElement("label");
    colorLabel.textContent = "バケツの色：";

    const colorSelect = createSelect([
        { value: "red", label: "赤" },
        { value: "blue", label: "青" }
    ]);

    colorLabel.appendChild(colorSelect);
    bucket.appendChild(colorLabel);

    // 設置場所
    const locationLabel = document.createElement("label");
    locationLabel.textContent = "設置場所：";

    const locationSelect = createSelect(locations);

    locationLabel.appendChild(locationSelect);
    bucket.appendChild(locationLabel);

    // 富士山に置かれているか
    const placedLabel = document.createElement("label");
    placedLabel.textContent = "富士山に置かれている：";

    const placedSelect = createSelect([
        { value: "yes", label: "はい" },
        { value: "no", label: "いいえ" }
    ]);

    placedLabel.appendChild(placedSelect);
    bucket.appendChild(placedLabel);

    // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "このバケツを削除";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => {
        bucket.remove();
        bucketCounts[team]--;
        updateBucketTitles(team);
        updateAddButton(team);
    });

    bucket.appendChild(deleteButton);

    container.appendChild(bucket);

    updateAddButton(team);
}

// バケツの番号を振り直す
function updateBucketTitles(team) {
    const container = document.getElementById(`team-${team.toLowerCase()}-buckets`);
    const buckets = container.querySelectorAll(".bucket-card");

    buckets.forEach((bucket, index) => {
        bucket.querySelector("h3").textContent = `バケツ ${index + 1}`;
    });
}

// バケツ追加ボタンの状態を更新する
function updateAddButton(team) {
    const button = document.getElementById(`add-team-${team.toLowerCase()}-bucket`);
    button.disabled = bucketCounts[team] >= 3;
}

// 初期化
setupTeamColors();

// 最初のバケツを1個ずつ追加
addBucket("A");
addBucket("B");

// バケツ追加ボタン
document.getElementById("add-team-a-bucket").addEventListener("click", () => {
    addBucket("A");
});

document.getElementById("add-team-b-bucket").addEventListener("click", () => {
    addBucket("B");
});

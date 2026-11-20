
// ========================================
// チーム設定
// ========================================

// HTMLの要素を取得
const myTeamColor = document.getElementById("my-team-color");
const partnerTeamColor = document.getElementById("partner-team-color");

// ========================================
// バケツ・ボールの管理
// ========================================

// 最大登録数
const MAX_BUCKETS = 6;
const MAX_BALLS = 12;

// バケツとボールの登録数
let bucketCount = 1;
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

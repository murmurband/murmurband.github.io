let sentences = [
  "所有的自言自語構築了我們。",
  //遠走
  "那就遠走吧。",
  "世界再大也攔不住你的輕狂。",
  "多麽徬徨就看作是一個笑話。",
  "有我在等你回來。",
  //給你的光
  "但我早在你心裡面。",
  "倔強不被夜色淹滅。",
  "這次你就只管往前。",
  "我想我還沒辦法說再見。",
  "今後你就只管閃爍黑夜。",
  //Luna
  "你的花火之中世界便開始閃爍。",
  "奮不顧身為我保留。",
  "你的眼眸之中時間便從此永久。",
  "我會陪在你的身後。",
  "擁有你哪怕如果。",
  
  //宇宙裡的星點
  "昨天的夢裡有沒有未來。",
  "我多想知道你的一切。",
  "太多複雜與簡單在你眼底打轉。",
  "發現你努力忽明忽暗。",
  "一閃而過也算完美。",
  "別急著說再見。",
  "你是星點在宇宙絢爛。",
  //我好想你
  "請不要再說加油。",
  "要多少努力才能夠再遇見你。",
  "我已經很努力。",
  //共生
  //輾轉
  
];

let currentSentence = ""; // 當前顯示的句子
let previousSentence = ""; // 上一個顯示的句子
let textDisplay = ""; // 當前顯示的文字
let index = 0; // 當前顯示的字符索引
let deleting = false; // 是否正在刪除
let typing = true; // 是否正在打字
let deletionCompleted = false; // 是否已經完成刪除
let delayTime = 1200; // 停頓時間 x 秒
let yPos = 0; // 垂直方向上顯示的起始位置
let totalTextHeight = 0; // 用來計算總高度
let lineHeight = 23; // 每個字母間的垂直間距


function preload() {
    // 加載本地字體文件，將 'path/to/font.ttf' 替換為字體文件的實際路徑
    customFont = loadFont('js/wc.ttf');
  }

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
//   textFont(customFont); // 設置自定義字體
  textFont('Shippori Mincho', 'Serif');
  textSize(17);
  textAlign(LEFT, TOP);
//   textStyle(LIGHT);
  fill(255);


  // 隨機選擇一個句子並確保不與上一個句子相同
  currentSentence = getRandomSentence();
  totalTextHeight = currentSentence.length * lineHeight;
}

function draw() {
  clear();
  let scaleFactor = min(width / 300, height/ 300);
  
  scale(scaleFactor); // 根據畫布尺寸縮放內容

  let yPos = (height - totalTextHeight) / 2;

  for (let i = 0; i < index; i++) {
    text(currentSentence.charAt(i), 50, (50 + i * lineHeight)  ); // 每個字符向下排列，yPos 控制起始位置
  }
  // 打字效果
  if (typing) {
    if (frameCount % 5 == 0 && index < currentSentence.length) {
      index++; // 每5幀顯示一個新的字符
      textDisplay = currentSentence.substring(0, index);
    }

    // 完成打字後，延遲 0.5 秒後開始刪除
    if (index === currentSentence.length) {
      typing = false;
      setTimeout(() => {
        deleting = true; // 開始刪除
      }, delayTime); // 延遲0.5秒
    }
  }

  // 刪除效果
  if (deleting) {
    if (frameCount % 5 == 0 && index > 0) {
      index--; // 每5幀刪除一個字符
      textDisplay = currentSentence.substring(0, index);
    }

    // 完成刪除後，延遲 0.5 秒再打新句子
    if (index === 0) {
      deleting = false;
      setTimeout(() => {
        deletionCompleted = true; // 標記刪除完成
      }, delayTime); // 延遲0.5秒
    }
  }

  // 切換到新句子，並重新開始打字過程
  if (deletionCompleted) {
    currentSentence = getRandomSentence(); // 隨機選擇一個新句子，並確保不重複
    index = 0; // 重置索引
    typing = true; // 開始打新句子
    deletionCompleted = false; // 重置刪除完成狀態
  }
}

// 隨機選擇句子並確保不重複
function getRandomSentence() {
  let newSentence;
  do {
    newSentence = random(sentences); // 隨機選擇一個句子
  } while (newSentence === previousSentence); // 確保不選擇與上次相同的句子

  previousSentence = newSentence; // 更新上一個句子
  return newSentence;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

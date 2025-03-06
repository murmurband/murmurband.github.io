document.addEventListener("DOMContentLoaded", function() {
    function updateImage() {
        let img = document.getElementById("responsiveImg");
        if (img) { // 檢查 img 是否存在
            console.log("原始圖片路徑：" + img.src); // 顯示當前圖片路徑
            if (window.innerWidth > 1024) { // 當視窗寬度超過 1024px，換成 3.jpg
                img.src = "./3.jpg?timestamp=" + new Date().getTime();
                console.log("更換為圖片 3.jpg");
            } else {
                img.src = "./2.jpg";
                console.log("更換為圖片 2.jpg");
            }
        }
    }

    // 監聽視窗大小變化
    window.addEventListener("resize", updateImage);

    // 頁面載入時先執行一次
    updateImage();
});

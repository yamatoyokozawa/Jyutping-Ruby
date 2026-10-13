# Jyutping Ruby

[粵文](#粵文) | [English](#english) | [简体中文](#简体中文) | [繁體中文](#繁體中文) | [日本語](#日本語)

---

## 粵文

喺網頁嘅漢字上面自動顯示粵拼嘅 Chrome 擴充功能。

### 功能
- 自動喺網頁所有漢字上面顯示粵拼（繁體、簡體都得）
- 簡體字會保持簡體顯示，只係加上粵拼
- 以詞語為單位判斷讀音，多音字都可以處理到（例如「銀行 ngan4 hong4」、「行路 haang4 lou6」）
- 之後先載入嘅內容（例如捲動載入、社交網站）都會自動加上粵拼
- 日文（有平假名／片假名或者標示咗 `lang="ja"`）同輸入欄唔會加粵拼

### 安裝
1. 下載呢個儲存庫（Code → Download ZIP），然後解壓
2. 喺 Chrome 打開 `chrome://extensions`
3. 打開右上角嘅「開發人員模式」
4. 撳「載入未封裝項目」，揀解壓咗嘅資料夾

### 設定
撳工具列上面嘅擴充功能圖示，可以設定：
- 全部網站啟用／停用
- 喺呢個網站停用
- 顯示聲調數字
- 粵拼大細

### 限制
- 讀音準確度唔係 100%，詞典冇收錄嘅詞語可能會讀錯
- 圖片、影片入面嘅文字、Chrome 內置 PDF 檢視器、`chrome://` 頁面唔支援
- 用 React 等框架整嘅網站，有時排版可能會亂；可以用「喺呢個網站停用」

---

## English

A Chrome extension that automatically shows Jyutping (Cantonese romanization) above Chinese characters on web pages.

### Features
- Annotates every Chinese character on a page with Jyutping (both Traditional and Simplified)
- Simplified characters stay Simplified; only the Jyutping is added
- Determines readings word by word, so most characters with multiple readings are handled (e.g. 銀行 ngan4 hong4, 行路 haang4 lou6)
- Content loaded later (infinite scroll, social media feeds) is annotated automatically
- Japanese text (containing kana or marked `lang="ja"`) and input fields are left untouched

### Installation
1. Download this repository (Code → Download ZIP) and unzip it
2. Open `chrome://extensions` in Chrome
3. Turn on **Developer mode** (top-right corner)
4. Click **Load unpacked** and select the unzipped folder

### Settings
Click the extension icon in the toolbar to:
- Enable / disable on all sites
- Disable on the current site
- Show / hide tone numbers
- Change the Jyutping size

### Limitations
- Readings are not 100% accurate; words missing from the dictionary may be read incorrectly
- Text inside images or videos, Chrome's built-in PDF viewer and `chrome://` pages are not supported
- Sites built with frameworks such as React may occasionally break; use "Disable on this site" if that happens

---

## 简体中文

在网页汉字上方自动显示粤拼（粤语拼音）的 Chrome 扩展程序。

### 功能
- 为网页上所有汉字自动标注粤拼（繁体、简体均可）
- 简体字保持简体显示，只添加粤拼
- 以词语为单位判断读音，可处理多音字（例如「银行 ngan4 hong4」、「行路 haang4 lou6」）
- 之后加载的内容（如滚动加载、社交网站）也会自动标注
- 日语文本（含平假名／片假名或标记为 `lang="ja"`）及输入框不会标注

### 安装
1. 下载本仓库（Code → Download ZIP）并解压
2. 在 Chrome 中打开 `chrome://extensions`
3. 打开右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」，选择解压后的文件夹

### 设置
点击工具栏上的扩展程序图标，可以设置：
- 在所有网站启用／停用
- 在此网站停用
- 显示声调数字
- 粤拼大小

### 限制
- 读音准确度并非 100%，词典未收录的词语可能读错
- 不支持图片、视频中的文字、Chrome 内置 PDF 查看器及 `chrome://` 页面
- 使用 React 等框架构建的网站偶尔可能出现排版错乱；可使用「在此网站停用」

---

## 繁體中文

在網頁漢字上方自動顯示粵拼（粵語拼音）的 Chrome 擴充功能。

### 功能
- 為網頁上所有漢字自動標註粵拼（繁體、簡體皆可）
- 簡體字維持簡體顯示，只加上粵拼
- 以詞語為單位判斷讀音，可處理多音字（例如「銀行 ngan4 hong4」、「行路 haang4 lou6」）
- 之後載入的內容（如捲動載入、社群網站）也會自動標註
- 日文文字（含平假名／片假名或標記為 `lang="ja"`）及輸入欄位不會標註

### 安裝
1. 下載本儲存庫（Code → Download ZIP）並解壓縮
2. 在 Chrome 中開啟 `chrome://extensions`
3. 開啟右上角的「開發人員模式」
4. 點選「載入未封裝項目」，選擇解壓縮後的資料夾

### 設定
點選工具列上的擴充功能圖示，可以設定：
- 在所有網站啟用／停用
- 在此網站停用
- 顯示聲調數字
- 粵拼大小

### 限制
- 讀音準確度並非 100%，詞典未收錄的詞語可能讀錯
- 不支援圖片、影片中的文字、Chrome 內建 PDF 檢視器及 `chrome://` 頁面
- 使用 React 等框架建構的網站偶爾可能出現版面錯亂；可使用「在此網站停用」

---

## 日本語

ウェブページ上の漢字に、粵拼（広東語のローマ字表記）のルビを自動で付ける Chrome 拡張機能です。

### 機能
- ページ内のすべての漢字に粵拼を付ける（繁体字・簡体字の両方に対応）
- 簡体字は簡体字のまま表示し、粵拼だけを付ける
- 単語単位で読みを判定するので、多音字にもある程度対応（例：「銀行 ngan4 hong4」「行路 haang4 lou6」）
- スクロールや SNS など、後から読み込まれた内容にも自動で付ける
- 日本語の文（かなを含む、または `lang="ja"` 指定のもの）と入力欄には付けない

### インストール
1. このリポジトリをダウンロード（Code → Download ZIP）して展開する
2. Chrome で `chrome://extensions` を開く
3. 右上の「デベロッパー モード」をオンにする
4. 「パッケージ化されていない拡張機能を読み込む」を押し、展開したフォルダを選ぶ

### 設定
ツールバーの拡張機能アイコンをクリックすると、次の設定ができます。
- 全体のオン/オフ
- このサイトだけ無効にする
- 声調の数字の表示/非表示
- ルビの大きさ

### 制限
- 読みの精度は 100% ではなく、辞書にない語は間違えることがある
- 画像・動画内の文字、Chrome 標準の PDF ビューア、`chrome://` のページには対応しない
- React などで作られたサイトでは表示が崩れることがある（その場合は「このサイトでは無効」を使う）

---

## Libraries

| Library | Version | License |
|---|---|---|
| [to-jyutping](https://github.com/CanCLID/to-jyutping) (CanCLID) | 3.1.1 | BSD-2-Clause |
| [opencc-js](https://github.com/nk2028/opencc-js) | 1.4.2 | MIT (code), Apache-2.0 (dictionary data) |

Both are bundled in `lib/` together with their license files.

## License

The code of this extension is released under the [MIT License](LICENSE).

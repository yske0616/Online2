// server.js (プロジェクトルートに配置)
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// 環境変数の設定
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 簡単なルート
app.get('/api/test', (req, res) => {
  res.json({ message: 'API接続テスト成功！' });
});

// 基本的なエラーハンドラー
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'サーバーエラーが発生しました' });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});
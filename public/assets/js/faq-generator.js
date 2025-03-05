// public/assets/js/faq-generator.js

document.addEventListener('DOMContentLoaded', function() {
  // フォーム要素の取得
  const form = {
    productName: document.getElementById('product-name'),
    productDescription: document.getElementById('product-description'),
    targetAudience: document.getElementById('target-audience'),
    existingQuestions: document.getElementById('existing-questions'),
    faqCount: document.getElementById('faq-count'),
    faqStyle: document.getElementById('faq-style'),
    generateButton: document.getElementById('generate-faq'),
    clearButton: document.getElementById('clear-form'),
    llmModel: document.getElementById('llm-model')
  };
  
  // 結果表示領域
  const resultElements = {
    content: document.getElementById('result-content'),
    copyButton: document.getElementById('copy-result'),
    saveButton: document.getElementById('save-template'),
    downloadButton: document.getElementById('download-html'),
    loadingIndicator: document.getElementById('loading-indicator')
  };
  
  // FAQ生成イベント
  form.generateButton.addEventListener('click', async function() {
    // 入力検証
    if (!validateForm()) {
      alert('商品名と説明は必須項目です');
      return;
    }
    
    // ローディング表示
    resultElements.loadingIndicator.style.display = 'flex';
    resultElements.content.innerHTML = '';
    
    try {
      // AIモデルに送信するデータを準備
      const faqData = {
        productName: form.productName.value,
        productDescription: form.productDescription.value,
        targetAudience: form.targetAudience.value,
        existingQuestions: form.existingQuestions.value,
        faqCount: form.faqCount.value,
        faqStyle: form.faqStyle.value,
        model: form.llmModel.value
      };
      
      // API呼び出し (仮のモックデータを返す実装)
      // 実際の実装ではサーバーへのAPIリクエストを行います
      const faqResult = await mockGenerateFAQ(faqData);
      
      // 結果表示
      displayFAQ(faqResult);
    } catch (error) {
      console.error('FAQ生成エラー:', error);
      resultElements.content.innerHTML = `
        <div class="error-message">
          <p>エラーが発生しました: ${error.message}</p>
          <p>もう一度お試しください。</p>
        </div>
      `;
    } finally {
      // ローディング非表示
      resultElements.loadingIndicator.style.display = 'none';
    }
  });
  
  // フォームクリアイベント
  form.clearButton.addEventListener('click', function() {
    clearForm();
  });
  
  // 結果コピーイベント
  resultElements.copyButton.addEventListener('click', function() {
    const contentText = resultElements.content.innerText;
    navigator.clipboard.writeText(contentText)
      .then(() => {
        alert('FAQをクリップボードにコピーしました');
      })
      .catch(err => {
        console.error('コピーに失敗しました:', err);
        alert('コピーに失敗しました');
      });
  });
  
  // テンプレート保存イベント
  resultElements.saveButton.addEventListener('click', function() {
    alert('テンプレートとして保存しました');
    // 実際の実装ではテンプレート保存APIを呼び出します
  });
  
  // HTMLダウンロードイベント
  resultElements.downloadButton.addEventListener('click', function() {
    const content = resultElements.content.innerHTML;
    const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FAQ - ${form.productName.value}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; }
    h1 { color: #2980b9; }
    .faq-container { max-width: 800px; margin: 0 auto; }
    .faq-item { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
    .faq-question { font-weight: bold; margin-bottom: 10px; color: #2c3e50; }
    .faq-answer { margin-top: 5px; }
  </style>
</head>
<body>
  <div class="faq-container">
    <h1>${form.productName.value} よくある質問</h1>
    ${content}
  </div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.productName.value.replace(/\s+/g, '_')}_FAQ.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  
  // フォーム検証
  function validateForm() {
    return (
      form.productName.value &&
      form.productDescription.value
    );
  }
  
  // フォームクリア
  function clearForm() {
    form.productName.value = '';
    form.productDescription.value = '';
    form.targetAudience.value = '';
    form.existingQuestions.value = '';
    form.faqCount.value = '10';
    form.faqStyle.value = 'friendly';
  }
  
  // FAQ表示
  function displayFAQ(faqData) {
    let html = '<div class="faq-list">';
    
    faqData.faqs.forEach((faq, index) => {
      html += `
        <div class="faq-item">
          <div class="faq-question">Q${index + 1}. ${faq.question}</div>
          <div class="faq-answer">A. ${faq.answer}</div>
        </div>
      `;
    });
    
    html += '</div>';
    resultElements.content.innerHTML = html;
  }
  
  // モックAPI (開発用)
  async function mockGenerateFAQ(data) {
    return new Promise((resolve) => {
      // 処理時間をシミュレート
      setTimeout(() => {
        // 仮のFAQデータを作成
        const mockFaqs = [];
        const count = parseInt(data.faqCount);
        
        const baseQuestions = [
          "商品の価格はいくらですか？",
          "配送にはどのくらい時間がかかりますか？",
          "返品・交換は可能ですか？",
          "保証期間はどのくらいですか？",
          "使い方がわからない場合、どこに問い合わせればいいですか？",
          "支払い方法は何がありますか？",
          "商品のサイズや仕様を教えてください",
          "故障した場合の対応を教えてください",
          "別の色やバリエーションはありますか？",
          "割引やクーポンはありますか？",
          "会員登録のメリットは何ですか？",
          "商品の素材や原材料は何ですか？",
          "注文後のキャンセルは可能ですか？",
          "海外への発送は対応していますか？",
          "法人での購入は可能ですか？",
          "定期購入プランはありますか？",
          "商品の使用上の注意点はありますか？",
          "アフターサービスはどのようなものがありますか？",
          "類似商品との違いは何ですか？",
          "ポイントの有効期限はありますか？"
        ];
        
        // 商品名に合わせて質問を微調整
        for (let i = 0; i < count; i++) {
          if (i < baseQuestions.length) {
            const question = baseQuestions[i].replace('商品', data.productName);
            
            // スタイルに応じて回答を変更
            let answer = '';
            const productName = data.productName;
            
            switch (baseQuestions[i]) {
              case "商品の価格はいくらですか？":
                answer = `${productName}の価格は税込5,980円です。定期購入の場合は初回20%オフの4,784円でご利用いただけます。`;
                break;
              case "配送にはどのくらい時間がかかりますか？":
                answer = `通常、ご注文確定後2〜3営業日以内に発送いたします。地域によって配送にかかる日数が異なりますが、最短で翌日、遅くとも1週間以内にお届けいたします。`;
                break;
              case "返品・交換は可能ですか？":
                answer = `商品到着後8日以内であれば、未使用・未開封の状態に限り返品・交換が可能です。返品・交換をご希望の場合は、カスタマーサポートまでご連絡ください。`;
                break;
              default:
                answer = `${productName}に関するご質問ありがとうございます。こちらについては、詳しくは商品説明ページをご確認いただくか、カスタマーサポートまでお問い合わせください。`;
            }
            
            // スタイルによる調整
            if (data.faqStyle === 'professional') {
              answer = answer.replace('ご注文', 'ご注文いただきました商品');
              answer = answer.replace('ありがとうございます', '誠にありがとうございます');
            } else if (data.faqStyle === 'simple') {
              answer = answer.split('。')[0] + '。';
            } else if (data.faqStyle === 'detailed') {
              answer += ` ${productName}に関する詳細情報は公式サイトのFAQページでもご確認いただけます。その他ご不明点がございましたら、お気軽にカスタマーサポート(support@example.com)までお問い合わせください。`;
            }
            
            mockFaqs.push({
              question: question,
              answer: answer
            });
          }
        }
        
        resolve({
          productName: data.productName,
          faqs: mockFaqs
        });
      }, 2000);
    });
  }
});
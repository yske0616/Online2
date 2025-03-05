// public/assets/js/persona-creation.js

document.addEventListener('DOMContentLoaded', function() {
  // フォーム要素の取得
  const form = {
    businessType: document.getElementById('business-type'),
    targetMarket: document.getElementById('target-market'),
    productDescription: document.getElementById('product-description'),
    painPoints: document.getElementById('pain-points'),
    benefits: document.getElementById('benefits'),
    keywords: document.getElementById('keywords'),
    generateButton: document.getElementById('generate-persona'),
    clearButton: document.getElementById('clear-form'),
    llmModel: document.getElementById('llm-model')
  };
  
  // 結果表示領域
  const resultElements = {
    content: document.getElementById('result-content'),
    copyButton: document.getElementById('copy-result'),
    saveButton: document.getElementById('save-template'),
    downloadButton: document.getElementById('download-pdf'),
    loadingIndicator: document.getElementById('loading-indicator')
  };
  
  // ペルソナ生成イベント
  form.generateButton.addEventListener('click', async function() {
    // 入力検証
    if (!validateForm()) {
      alert('必須項目を入力してください');
      return;
    }
    
    // ローディング表示
    resultElements.loadingIndicator.style.display = 'flex';
    resultElements.content.innerHTML = '';
    
    try {
      // AIモデルに送信するデータを準備
      const personaData = {
        businessType: form.businessType.value,
        targetMarket: form.targetMarket.value,
        productDescription: form.productDescription.value,
        painPoints: form.painPoints.value,
        benefits: form.benefits.value,
        keywords: form.keywords.value,
        model: form.llmModel.value
      };
      
      // API呼び出し (仮のモックデータを返す実装)
      // 実際の実装ではサーバーへのAPIリクエストを行います
      const persona = await mockGeneratePersona(personaData);
      
      // 結果表示
      displayPersona(persona);
    } catch (error) {
      console.error('ペルソナ生成エラー:', error);
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
        alert('結果をクリップボードにコピーしました');
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
  
  // PDFダウンロードイベント
  resultElements.downloadButton.addEventListener('click', function() {
    alert('PDF生成機能は準備中です。次回アップデートをお待ちください。');
    // 実際の実装ではPDF生成APIを呼び出します
  });
  
  // フォーム検証
  function validateForm() {
    return (
      form.businessType.value &&
      form.targetMarket.value &&
      form.productDescription.value
    );
  }
  
  // フォームクリア
  function clearForm() {
    form.businessType.value = '';
    form.targetMarket.value = '';
    form.productDescription.value = '';
    form.painPoints.value = '';
    form.benefits.value = '';
    form.keywords.value = '';
  }
  
  // ペルソナ表示
  function displayPersona(persona) {
    resultElements.content.innerHTML = `
      <div class="persona-card">
        <div class="persona-header">
          <div class="persona-avatar">👤</div>
          <div class="persona-name-container">
            <h3>${persona.name}</h3>
            <div class="persona-tagline">${persona.tagline}</div>
          </div>
        </div>
        
        <div class="persona-section">
          <h4>基本情報</h4>
          <p><strong>年齢:</strong> ${persona.age}</p>
          <p><strong>性別:</strong> ${persona.gender}</p>
          <p><strong>職業:</strong> ${persona.occupation}</p>
          <p><strong>年収:</strong> ${persona.income}</p>
          <p><strong>家族構成:</strong> ${persona.family}</p>
          <p><strong>居住地:</strong> ${persona.location}</p>
        </div>
        
        <div class="persona-section">
          <h4>性格と特徴</h4>
          <p>${persona.personality}</p>
        </div>
        
        <div class="persona-section">
          <h4>目標と課題</h4>
          <p><strong>目標:</strong> ${persona.goals}</p>
          <p><strong>課題:</strong> ${persona.challenges}</p>
        </div>
        
        <div class="persona-section">
          <h4>購買行動</h4>
          <p><strong>情報収集方法:</strong> ${persona.informationSources}</p>
          <p><strong>意思決定要因:</strong> ${persona.decisionFactors}</p>
        </div>
        
        <div class="persona-section">
          <h4>マーケティングアプローチ</h4>
          <p>${persona.marketingApproach}</p>
        </div>
      </div>
    `;
  }
  
  // モックAPIレスポンス (開発用)
  async function mockGeneratePersona(data) {
    // 実際のAPIリクエストの代わりに使用する仮実装
    return new Promise((resolve) => {
      // 処理時間をシミュレート
      setTimeout(() => {
        // ビジネスタイプに基づいてペルソナを生成
        let persona;
        
        switch(data.businessType) {
          case 'coaching':
            persona = {
              name: '山田 健太',
              tagline: '成長志向の30代中間管理職',
              age: '35歳',
              gender: '男性',
              occupation: '中小企業の営業マネージャー',
              income: '700万円〜800万円',
              family: '既婚、子供1人',
              location: '東京都内',
              personality: '几帳面で計画的、目標達成意欲が高い。新しい知識やスキルの習得に積極的。自己啓発書を読むことが好きで、常に自分を向上させる方法を探している。',
              goals: 'キャリアアップして部長職に昇進すること。部下のマネジメントスキルを向上させ、チームの成果を最大化したい。ワークライフバランスも重視している。',
              challenges: '業務が多忙で自己成長の時間が取れない。部下の育成方法に悩んでいる。リモートワーク環境でのチームマネジメントに課題を感じている。',
              informationSources: 'ビジネス系SNS、Podcast、業界セミナー、経営者コミュニティ',
              decisionFactors: '実績のある講師、具体的な成功事例、すぐに実践できる内容、時間効率の良さ',
              marketingApproach: '「限られた時間で最大の成果を出す」という価値提案が効果的。成功事例を具体的に示し、実践的なステップを提供する。忙しい日常の中でも取り入れやすい短時間のコーチングセッションをアピールする。メールマガジンやビジネスSNSでの情報発信が有効。'
            };
            break;
            
          case 'online-course':
            persona = {
              name: '佐藤 美咲',
              tagline: 'キャリアチェンジを目指す20代後半女性',
              age: '28歳',
              gender: '女性',
              occupation: '事務職',
              income: '400万円〜500万円',
              family: '未婚',
              location: '大阪府',
              personality: '好奇心旺盛で新しいことに挑戦する意欲がある。計画的に物事を進める傾向があり、目標に向かって着実に進むタイプ。SNSでの情報収集が得意。',
              goals: 'IT業界へのキャリアチェンジ。将来的にはフリーランスとして働くことを視野に入れている。場所や時間に縛られない働き方を実現したい。',
              challenges: '専門的なスキルがなく、どこから始めれば良いか分からない。独学では挫折しがち。仕事をしながらの学習時間の確保が難しい。',
              informationSources: 'Instagram、YouTube、オンラインコミュニティ、勉強会',
              decisionFactors: '分かりやすさ、段階的な学習ステップ、実践的な内容、コミュニティサポート、価格',
              marketingApproach: '「未経験からでも始められる」というメッセージが響く。実際にキャリアチェンジに成功した人の事例紹介が効果的。InstagramやYouTubeでのビジュアルコンテンツでアプローチし、無料のお試しレッスンで信頼を構築する。'
            };
            break;
            
          default:
            persona = {
              name: '鈴木 誠一',
              tagline: '効率化を求める40代経営者',
              age: '45歳',
              gender: '男性',
              occupation: '中小企業経営者（従業員20名程度）',
              income: '1,200万円〜',
              family: '既婚、子供2人',
              location: '神奈川県',
              personality: '決断力があり、合理的思考。数字やデータに基づいた判断を好む。時間の価値を重視し、効率的なビジネス運営を常に追求している。新しいテクノロジーの活用に前向き。',
              goals: '事業の安定的な成長と拡大。業務効率化による利益率の向上。従業員の定着と優秀な人材の確保。長期的には事業承継の準備も視野に入れている。',
              challenges: '人材採用と育成の難しさ。デジタル化の遅れによる業務非効率。資金繰りの安定化。競合との差別化。',
              informationSources: '経営者コミュニティ、ビジネス専門誌、業界セミナー、顧問税理士や専門家からのアドバイス',
              decisionFactors: 'ROI（投資対効果）、実績、導入の容易さ、サポート体制、他の経営者からの評判',
              marketingApproach: '具体的な数字で効果を示すことが重要。「○○の導入で売上○%アップ」など、明確なメリットを提示する。他の経営者の成功事例や推薦の声が信頼性を高める。無駄のない簡潔な情報提供と、初期投資を抑えた導入方法を提案する。'
            };
        }
        
        resolve(persona);
      }, 2000); // 2秒の遅延をシミュレート
    });
  }
});
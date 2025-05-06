document.addEventListener('DOMContentLoaded', function() {
    // 測驗題目
    const quizQuestions = [
        {
            question: "日月光的教育訓練理念之一為「直屬主管成為教導者」，所以G6員工在晉升主管的第一關須通過以下哪項課程?",
            options: [
                "主任管理基準",
                "內部講師培訓",
                "英語簡報",
                "經副理管理基準"
            ],
            correctAnswer: 1,
            explanation: "日月光的教育訓練理念強調直屬主管成為教導者，因此G6員工晉升主管的第一關需通過「內部講師培訓」課程。"
        },
        {
            question: "同一份TECN最多可使用幾次？",
            options: [
                "一次",
                "二次",
                "三次",
                "無限延用"
            ],
            correctAnswer: 2,
            explanation: "根據規定，同一份TECN最多可使用三次。"
        },
        {
            question: "品質手冊為哪一個Level的文件？",
            options: [
                "Level 1",
                "Level 2",
                "Level 3",
                "Level 4"
            ],
            correctAnswer: 0,
            explanation: "品質手冊屬於Level 1的文件。"
        },
        {
            question: "烏龜圖中烏龜的身體(殼)，代表以下何者？",
            options: [
                "Input輸入",
                "Output輸出",
                "Customer satisfaction客戶滿意",
                "Process過程"
            ],
            correctAnswer: 3,
            explanation: "在烏龜圖中，烏龜的身體(殼)代表Process過程。"
        },
        {
            question: "發現問題時，應該優先改善哪一種問題?",
            options: [
                "提升製程水準",
                "降低異常",
                "以上皆是",
                "以上皆非"
            ],
            correctAnswer: 1,
            explanation: "發現問題時，應該優先改善「降低異常」的問題。"
        },
        {
            question: "G8D中D0為徵兆/什麼？",
            options: [
                "成立改善小組",
                "描述問題",
                "原因分析及証實",
                "緊急反應措施"
            ],
            correctAnswer: 3,
            explanation: "在G8D方法中，D0代表徵兆/緊急反應措施。"
        },
        {
            question: "Minor等級的變更不是屬於何種Class Level的變更？",
            options: [
                "Class 2",
                "Class 3",
                "Class 4",
                "Class 5"
            ],
            correctAnswer: 0,
            explanation: "Minor等級的變更不屬於Class 2的變更。"
        },
        {
            question: "下列何者不是直方圖的用途？",
            options: [
                "明瞭數據整體概況",
                "可利用層別法比較數據差異",
                "監控品質特性",
                "發現數據異常"
            ],
            correctAnswer: 2,
            explanation: "監控品質特性不是直方圖的主要用途。"
        },
        {
            question: "今某量產品發生問題，如分別以方法、機器、操作者、時間等加以觀察，此時可運用QC七大手法中何種方法收集可能的要因？",
            options: [
                "散佈圖",
                "柏拉圖",
                "特性要因圖",
                "層別法"
            ],
            correctAnswer: 3,
            explanation: "當需要以方法、機器、操作者、時間等加以觀察時，應使用層別法來收集可能的要因。"
        },
        {
            question: "平均值與全距管制圖(X-R Chart)，屬於哪種管制圖？",
            options: [
                "計量值管制圖",
                "計數值管制圖",
                "缺點數管制圖",
                "不良率管制圖"
            ],
            correctAnswer: 0,
            explanation: "平均值與全距管制圖(X-R Chart)屬於計量值管制圖。"
        }
    ];

    // 生成測驗題目
    function generateQuiz() {
        const questionsContainer = document.querySelector('.questions-container');

        quizQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.id = `question-${index}`;

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `${index + 1}. ${q.question}`;

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';

            q.options.forEach((option, optionIndex) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question-${index}`;
                radioInput.id = `q${index}-option${optionIndex}`;
                radioInput.value = optionIndex;

                const label = document.createElement('label');
                label.htmlFor = `q${index}-option${optionIndex}`;
                label.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;

                optionDiv.appendChild(radioInput);
                optionDiv.appendChild(label);
                optionsDiv.appendChild(optionDiv);
            });

            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'feedback hidden';
            feedbackDiv.id = `feedback-${index}`;

            questionDiv.appendChild(questionTitle);
            questionDiv.appendChild(optionsDiv);
            questionDiv.appendChild(feedbackDiv);
            questionsContainer.appendChild(questionDiv);
        });
    }

    // 計算分數並顯示結果
    function calculateScore(event) {
        event.preventDefault();

        let score = 0;
        const wrongAnswers = [];

        quizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            const feedbackDiv = document.getElementById(`feedback-${index}`);

            if (!selectedOption) {
                // 未選擇答案
                feedbackDiv.innerHTML = `<p>您未回答此題</p>
                                        <p>正確答案: ${String.fromCharCode(65 + q.correctAnswer)}. ${q.options[q.correctAnswer]}</p>
                                        <p class="explanation">${q.explanation}</p>`;
                feedbackDiv.className = 'feedback incorrect';
                wrongAnswers.push({
                    questionNumber: index + 1,
                    reason: "未作答"
                });
            } else if (parseInt(selectedOption.value) === q.correctAnswer) {
                // 答案正確
                score++;
                feedbackDiv.innerHTML = `<p>正確! 👍</p>
                                        <p class="explanation">${q.explanation}</p>`;
                feedbackDiv.className = 'feedback correct';
            } else {
                // 答案錯誤
                feedbackDiv.innerHTML = `<p>錯誤 ❌</p>
                                        <p>您選擇了: ${String.fromCharCode(65 + parseInt(selectedOption.value))}. ${q.options[parseInt(selectedOption.value)]}</p>
                                        <p>正確答案: ${String.fromCharCode(65 + q.correctAnswer)}. ${q.options[q.correctAnswer]}</p>
                                        <p class="explanation">${q.explanation}</p>`;
                feedbackDiv.className = 'feedback incorrect';
                wrongAnswers.push({
                    questionNumber: index + 1,
                    reason: "答錯",
                    selectedAnswer: q.options[parseInt(selectedOption.value)],
                    correctAnswer: q.options[q.correctAnswer]
                });
            }

            feedbackDiv.classList.remove('hidden');
        });

        // 顯示分數和分析
        document.getElementById('final-score').textContent = score;
        document.getElementById('score-container').classList.remove('hidden');

        // 生成錯題分析
        const analysisDiv = document.getElementById('score-analysis');
        if (wrongAnswers.length > 0) {
            let analysisHTML = '<h3>錯題分析:</h3><ul>';
            wrongAnswers.forEach(wrong => {
                analysisHTML += `<li>第 ${wrong.questionNumber} 題: ${wrong.reason}</li>`;
            });
            analysisHTML += '</ul>';

            // 加入學習建議
            if (wrongAnswers.length > 5) {
                analysisHTML += '<p>建議: 您需要加強對日月光基本流程和概念的理解。</p>';
            } else if (wrongAnswers.length > 2) {
                analysisHTML += '<p>建議: 您對大部分概念有基本了解，但需要加強特定領域的知識。</p>';
            } else {
                analysisHTML += '<p>建議: 您的表現很好，只需要複習少數幾個概念。</p>';
            }

            analysisDiv.innerHTML = analysisHTML;
        } else {
            analysisDiv.innerHTML = '<p>恭喜! 您全部答對了! 👏</p>';
        }

        // 滾動到頁面頂部查看結果
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 初始化測驗
    generateQuiz();

    // 提交表單事件監聽
    document.getElementById('quiz-form').addEventListener('submit', calculateScore);
});

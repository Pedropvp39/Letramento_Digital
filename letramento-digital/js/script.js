document.addEventListener('DOMContentLoaded', () => {
  /* ============================================================
     1. NAVEGAÇÃO SUAVE (Scroll até o Topo e Seções)
     ============================================================ */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  /* ============================================================
     2. LÓGICA DO CARROSSEL SIMULADOR
     ============================================================ */
  const track = document.querySelector('.carousel__track');
  const slides = document.querySelectorAll('.carousel__slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && slides.length > 0 && dotsContainer) {
    let currentIndex = 0;

    dotsContainer.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      });
    }
  }

  /* ============================================================
     3. LÓGICA DO QUIZ INTERATIVO (10 Questões)
     ============================================================ */
  const quizData = [
    {
      question: "1. Você recebe uma mensagem no WhatsApp dizendo 'Cura do câncer descoberta, repasse urgente!'. Qual a atitude correta?",
      options: [
        "Repassar imediatamente para avisar os amigos e a família.",
        "Pesquisar em portais de notícias confiáveis e órgãos de saúde antes de repassar.",
        "Acreditar, pois se foi enviado no grupo da família é verdade.",
        "Comentar com amigos sobre a descoberta sem checar a fonte."
      ],
      correct: 1,
      explanation: "Notícias sobre descobertas científicas de grande impacto sempre são publicadas por veículos de imprensa confiáveis e órgãos formais de saúde."
    },
    {
      question: "2. O que caracteriza uma tentativa de Phishing (golpe do clique)?",
      options: [
        "Um artigo de jornal bem escrito com dados da OMS.",
        "Mensagens alarmistas com links suspeitos prometendo prêmios, Pix ou benefícios urgentes.",
        "Um vídeo educativo do canal oficial do Ministério da Educação.",
        "Uma postagem de um amigo mostrando fotos das férias dele."
      ],
      correct: 1,
      explanation: "Phishing utiliza iscas de urgência ou benefícios financeiros para induzir a vítima a clicar em links clonados e entregar senhas."
    },
    {
      question: "3. O que é uma 'Deepfake'?",
      options: [
        "Uma página de notícias que cobra assinatura mensal.",
        "Um erro de digitação comum em postagens de redes sociais.",
        "Vídeo ou áudio manipulado por inteligência artificial para simular a fala/rosto de alguém de forma realista.",
        "Um vírus que apaga arquivos do seu computador."
      ],
      correct: 2,
      explanation: "Deepfakes usam modelos avançados de IA para sintetizar voz e imagem de pessoas reais para criar falsas declarações."
    },
    {
      question: "4. Qual destes detalhes costuma entregar uma imagem gerada ou alterada por IA?",
      options: [
        "Boa iluminação e alta definição de cores.",
        "Logotipo da emissora de TV no canto superior da imagem.",
        "Mãos distorcidas, contornos desfocados e dentes/acessórios desalinhados.",
        "O fato da foto ter sido tirada ao ar livre."
      ],
      correct: 2,
      explanation: "Algoritmos de geração de imagem ainda encontram desafios na renderização de detalhes complexos como simetria de mãos, olhos e dentes."
    },
    {
      question: "5. Por que é arriscado compartilhar notícias lendo apenas o título/manchete?",
      options: [
        "Manchetes apelativas (clickbait) frequentemente distorcem o conteúdo para gerar visualizações.",
        "Não há risco, pois os títulos sempre resumem com precisão a notícia inteira.",
        "Porque os títulos são protegidos por direitos autorais.",
        "Porque o algoritmo bloqueia mensagens que só contêm títulos."
      ],
      correct: 0,
      explanation: "O 'clickbait' usa frases de efeito sensacionalistas que nem sempre correspondem ao que está verificado no corpo do texto."
    },
    {
      question: "6. Qual destas é uma Agência de Checagem (Fact-Checking) reconhecida no Brasil?",
      options: [
        "Agência Lupa",
        "Rede Social News",
        "Fatos Desconhecidos Blog",
        "Gossip WhatsApp Group"
      ],
      correct: 0,
      explanation: "A Agência Lupa é uma das pioneiras e referências em checagem jornalística independente no país."
    },
    {
      question: "7. Ao receber um link com domínio '.gov-resgate.online', você deve:",
      options: [
        "Preencher seus dados, pois termina em 'gov'.",
        "Desconfiar, pois domínios governamentais oficiais no Brasil terminam obrigatoriamente em '.gov.br'.",
        "Compartilhar com quem precisa de dinheiro extra.",
        "Enviar uma mensagem de texto para o suporte do site."
      ],
      correct: 1,
      explanation: "Golpistas usam termos como 'gov' ou 'br' em domínios genéricos para enganar os usuários. O domínio oficial e seguro é sempre '.gov.br'."
    },
    {
      question: "8. Como a desinformação afeta a saúde pública?",
      options: [
        "Não afeta, pois as pessoas só acreditam no que o médico diz.",
        "Pode desencorajar a vacinação e promover o uso indevido de substâncias perigosas.",
        "Gera apenas conversas descontraídas nos grupos de mensagens.",
        "Melhora o acesso a tratamentos caseiros rápidos."
      ],
      correct: 1,
      explanation: "Boatos anti-vacina e promessas de curas milagrosas levam ao retorno de doenças controláveis e abandono de tratamentos reais."
    },
    {
      question: "9. O que fazer se você compartilhou sem querer uma informação falsa?",
      options: [
        "Apagar a mensagem e fingir que nada aconteceu.",
        "Mudar de assunto e enviar um meme no grupo.",
        "Corrigir publicamente a informação e enviar a checagem real nos mesmos grupos onde espalhou o boato.",
        "Bloquear as pessoas que criticarem a postagem."
      ],
      correct: 2,
      explanation: "Corrigir a informação ajuda a interromper a cadeia de desinformação e reconstrói a confiança na comunidade digital."
    },
    {
      question: "10. Qual é a regra essencial de ouro do Letramento Digital?",
      options: [
        "Compartilhe tudo primeiro para perguntar depois.",
        "Se a notícia confirma o que você pensa, ela é verdadeira.",
        "Pense, desconfie da emoção inicial e cheque a fonte antes de clicar em compartilhar.",
        "Confie apenas em informações de fontes anônimas."
      ],
      correct: 2,
      explanation: "A desinformação apela para emoções fortes (raiva, medo, esperança). Fazer uma pausa e checar impede que você seja manipulado."
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  const quizApp = document.getElementById('quizApp');
  const quizCounter = document.getElementById('quizCounter');
  const quizScoreDisplay = document.getElementById('quizScoreDisplay');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const resetQuizBtn = document.getElementById('resetQuizBtn');

  function renderQuestion() {
    if (!quizApp) return;

    answered = false;
    const q = quizData[currentQuestion];

    if (quizCounter) quizCounter.textContent = `Progresso: ${currentQuestion + 1} / ${quizData.length}`;
    if (quizScoreDisplay) quizScoreDisplay.textContent = `Pontuação: ${score}`;
    if (quizProgressBar) quizProgressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

    quizApp.innerHTML = `
      <div class="quiz-card">
        <h3 class="quiz-card__question">${q.question}</h3>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      </div>
    `;

    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', handleOptionClick);
    });
  }

  function handleOptionClick(e) {
    if (answered) return;
    answered = true;

    const selectedBtn = e.currentTarget;
    const selectedIndex = parseInt(selectedBtn.dataset.index, 10);
    const q = quizData[currentQuestion];
    const feedbackEl = document.getElementById('quizFeedback');

    const options = document.querySelectorAll('.quiz-option');
    options.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
      selectedBtn.classList.add('correct');
      score += 10;
      if (quizScoreDisplay) quizScoreDisplay.textContent = `Pontuação: ${score}`;
      if (feedbackEl) feedbackEl.innerHTML = `<strong>✔ Correto!</strong> ${q.explanation}`;
    } else {
      selectedBtn.classList.add('incorrect');
      if (options[q.correct]) options[q.correct].classList.add('correct');
      if (feedbackEl) feedbackEl.innerHTML = `<strong>✖ Incorreto.</strong> ${q.explanation}`;
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        renderResults();
      }
    }, 3200);
  }

  function renderResults() {
    if (!quizApp) return;

    if (quizProgressBar) quizProgressBar.style.width = `100%`;
    if (quizCounter) quizCounter.textContent = `Finalizado!`;

    let resultMsg = "";
    if (score >= 80) {
      resultMsg = "🏆 Excelente! Você demonstra alto nível de letramento digital e está imune às Fake News.";
    } else if (score >= 50) {
      resultMsg = "⚠️ Bom trabalho, mas fique atento às notícias emocionais e domínios duvidosos.";
    } else {
      resultMsg = "🚨 Cuidado! Você está vulnerável a golpes e boatos virtuais. Revise o nosso Guia de Checagem.";
    }

    quizApp.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <h3>Quiz Concluído!</h3>
        <p style="font-size: 1.5rem; color: var(--accent-yellow); margin: 12px 0; font-weight: bold;">
          Sua Pontuação Final: ${score} / 100
        </p>
        <p style="color: var(--text-muted); font-size: 0.95rem;">${resultMsg}</p>
      </div>
    `;
  }

  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
    });
  }

  if (quizApp) {
    renderQuestion();
  }
});
/* ============================================================
   SISTEMA DE INTERAÇÕES E LÓGICA DO PROJETO (2026)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initQuiz();
  generateQRCode();
});

/* ------------------------------------------------------------
   1. CARROSSEL INTERATIVO DO HERO
   ------------------------------------------------------------ */
function initCarousel() {
  const track = document.querySelector('.carousel__track');
  const slides = document.querySelectorAll('.carousel__slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  // Renderizar indicadores
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  });

  // Autoplay
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }, 6000);
}

/* ------------------------------------------------------------
   2. QUIZ INTERATIVO (10 QUESTÕES COMPLETA)
   ------------------------------------------------------------ */
const quizData = [
  {
    q: "1. Ao receber uma mensagem no WhatsApp exigindo repasse imediato em caixa alta, qual deve ser sua atitude?",
    options: [
      "A) Encaminhar rapidamente para os grupos da família por precaução.",
      "B) Desconfiar na hora; sensacionalismo e urgência são características marcantes de boatos.",
      "C) Postar nas redes sociais perguntando se alguém sabe se é verdade."
    ],
    answer: 1,
    exp: "Ameças alarmistas são desenhadas para provocar pânico e engajamento emocional imediato."
  },
  {
    q: "2. Como proceder para verificar a autenticidade de uma foto suspeita?",
    options: [
      "A) Contar o número de curtidas e comentários na postagem.",
      "B) Fazer uma pesquisa reversa de imagem no Google Lens ou Tineye.",
      "C) Enviar a foto para um grupo de amigos e aguardar a opinião deles."
    ],
    answer: 1,
    exp: "A busca reversa identifica de onde a imagem surgiu originalmente e se foi descontextualizada."
  },
  {
    q: "3. O que caracteriza o fenômeno de 'Bolha de Informação' ou 'Câmara de Eco'?",
    options: [
      "A) Uma falha na conexão de internet da escola.",
      "B) O filtro algorítmico que exibe apenas visões de mundo semelhantes às suas, isolando contrapontos.",
      "C) Um vírus digital que altera os títulos de notícias."
    ],
    answer: 1,
    exp: "Algoritmos priorizam o que você tende a concordar, reduzindo sua exposição à pluralidade de fatos."
  },
  {
    q: "4. Qual é a estratégia recomendada ao se deparar com uma manchete polêmica?",
    options: [
      "A) Comentar com indignação imediatamente.",
      "B) Ler o texto na íntegra para ver se o corpo da matéria confirma o título.",
      "C) Compartilhar o link usando apenas a manchete como base."
    ],
    answer: 1,
    exp: "Muitos artigos utilizam títulos clickbait que contrastam ou até desmentem o próprio corpo do texto."
  },
  {
    q: "5. Por que domínios fraudulentos tentam imitar URLs de portais de notícias famosos?",
    options: [
      "A) Por mero descuido de digitação do desenvolvedor.",
      "B) Para induzir o leitor ao erro de percepção por meio da familiaridade da marca.",
      "C) Porque é a forma padrão e gratuita de hospedar um site."
    ],
    answer: 1,
    exp: "Conhecido como spoofing ou clonagem, o método visa transmitir uma falsa impressão de credibilidade."
  },
  {
    q: "6. (IA) Quais detalhes físicos são comuns em imagens geradas por Inteligência Artificial?",
    options: [
      "A) Presença exclusiva de tons em preto e branco.",
      "B) Inconsistências como dedos extras, acessórios assimétricos e textos ilegíveis ao fundo.",
      "C) Imagens com resolução perfeita sem nenhuma imperfeição técnica."
    ],
    answer: 1,
    exp: "Apesar de avançadas, geradores de IA ainda falham em anatomia fina, textos secundários e simetria."
  },
  {
    q: "7. (Segurança) Recebeu um áudio com a voz de um parente pedindo transferência via Pix. Como agir?",
    options: [
      "A) Efetuar a transferência imediatamente para sanar a emergência.",
      "B) Fazer uma ligação direta para o número oficial da pessoa e checar sua identidade.",
      "C) Responder por mensagem de texto pedindo mais detalhes bancários."
    ],
    answer: 1,
    exp: "A clonagem de voz por inteligência artificial é uma modalidade comum de golpe. Confirme por outra via."
  },
  {
    q: "8. (Checagem) Notícias de saúde sobre tratamentos milagrosos sem registro sanitário devem ser:",
    options: [
      "A) Testadas em casa antes de qualquer julgamento.",
      "B) Confrontadas com canais oficiais da Anvisa ou Ministério da Saúde.",
      "C) Repassadas com a legenda 'não sei se funciona, mas achei interessante'."
    ],
    answer: 1,
    exp: "Desinformação sobre medicina é perigosa. Valide sempre em fontes científicas e oficiais."
  },
  {
    q: "9. O que significa o termo 'Deepfake'?",
    options: [
      "A) Uma senha de alta segurança usada por agências de checagem.",
      "B) Vídeos ou áudios sintetizados por IA que trocam o rosto ou a voz de pessoas reais com alta precisão.",
      "C) Um tipo de documento em PDF criptografado."
    ],
    answer: 1,
    exp: "Deepfakes sobrepõem rostos e vozes sintéticas sobre gravações originais simulando falas não ditas."
  },
  {
    q: "10. Qual a utilidade de consultar uma agência de fact-checking independente?",
    options: [
      "A) Contratar pessoas para apagar dados da internet.",
      "B) Ler relatórios pautados em metodologias jornalísticas rigorosas de verificação de fatos.",
      "C) Solicitar suporte técnico para computadores com vírus."
    ],
    answer: 1,
    exp: "Agências especializadas usam métodos científicos e jornalísticos para atestar a veracidade das pautas."
  }
];

function initQuiz() {
  const quizApp = document.getElementById('quizApp');
  const quizCounter = document.getElementById('quizCounter');
  const quizScoreDisplay = document.getElementById('quizScoreDisplay');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const resetBtn = document.getElementById('resetQuizBtn');

  if (!quizApp) return;

  let currentScore = 0;
  let answeredCount = 0;

  function renderQuiz() {
    quizApp.innerHTML = '';
    currentScore = 0;
    answeredCount = 0;
    updateStatus();

    quizData.forEach((data, qIndex) => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.innerHTML = `
        <p class="quiz-card__question"><strong>${data.q}</strong></p>
        <div class="quiz-options">
          ${data.options.map((opt, optIndex) => `
            <button class="quiz-option" data-q="${qIndex}" data-opt="${optIndex}">${opt}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="feedback-${qIndex}"></div>
      `;
      quizApp.appendChild(card);
    });

    // Event Delegation para cliques nas opções
    quizApp.querySelectorAll('.quiz-option').forEach(button => {
      button.addEventListener('click', handleOptionClick);
    });
  }

  function handleOptionClick(e) {
    const btn = e.currentTarget;
    const qIndex = parseInt(btn.getAttribute('data-q'));
    const optIndex = parseInt(btn.getAttribute('data-opt'));
    const question = quizData[qIndex];
    const parentContainer = btn.parentElement;
    const feedbackEl = document.getElementById(`feedback-${qIndex}`);

    // Desabilitar botões da questão atual
    parentContainer.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

    if (optIndex === question.answer) {
      btn.classList.add('correct');
      currentScore++;
    } else {
      btn.classList.add('incorrect');
      // Destacar a opção correta
      const correctBtn = parentContainer.querySelector(`[data-opt="${question.answer}"]`);
      if (correctBtn) correctBtn.classList.add('correct');
    }

    feedbackEl.innerHTML = `💡 <strong>Explicação:</strong> ${question.exp}`;
    answeredCount++;
    updateStatus();
  }

  function updateStatus() {
    if (quizCounter) quizCounter.textContent = `Progresso: ${answeredCount} / ${quizData.length}`;
    if (quizScoreDisplay) quizScoreDisplay.textContent = `Pontuação: ${currentScore}`;
    if (quizProgressBar) {
      const pct = (answeredCount / quizData.length) * 100;
      quizProgressBar.style.width = `${pct}%`;
    }
  }

  resetBtn?.addEventListener('click', renderQuiz);

  renderQuiz();
}

/* ------------------------------------------------------------
   3. GERADOR DINÂMICO DE QR CODE NO FOOTER
   ------------------------------------------------------------ */
function generateQRCode() {
  const qrImg = document.getElementById('qrCodeImg');
  if (!qrImg) return;
  const currentURL = encodeURIComponent(window.location.href);
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${currentURL}`;
}
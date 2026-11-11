// Adicione isso no início do seu script.js
const i18nextConfig = {
  lng: 'pt', // idioma padrão
  fallbackLng: 'pt',
  debug: false,
};

async function loadTranslations() {
  try {
    const [ptResp, enResp] = await Promise.all([
      fetch('locales/pt/translation.json'),
      fetch('locales/en/translation.json'),
    ]);
    const pt = await ptResp.json();
    const en = await enResp.json();

    i18nextConfig.resources = { pt: { translation: pt }, en: { translation: en } };

    i18next
      .use(i18nextBrowserLanguageDetector)
      .init(i18nextConfig, function(err, t) {
        if (err) return console.error('i18next init error:', err);
        updateContent();
        updatePlaceholders();
        document.documentElement.lang = i18next.language || 'pt';
      });
  } catch (err) {
    console.error('Erro ao carregar traduções:', err);
    i18next
      .use(i18nextBrowserLanguageDetector)
      .init(i18nextConfig, function(err, t) {
        if (err) return console.error('i18next init error:', err);
        updateContent();
        updatePlaceholders();
        document.documentElement.lang = i18next.language || 'pt';
      });
  }
}

loadTranslations();


// Função para atualizar todo o conteúdo com as traduções
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });

  // Atualiza os atributos com tradução
  document.querySelectorAll('[data-pt], [data-en]').forEach(element => {
    if (element.hasAttribute('data-pt') && element.hasAttribute('data-en')) {
      element.textContent = i18next.language === 'pt' 
        ? element.getAttribute('data-pt') 
        : element.getAttribute('data-en');
    }
  });

  // Atualiza o texto do botão de tradução
  const translateText = document.querySelector('.translate-text');
  if (translateText) {
    translateText.textContent = i18next.language === 'pt' ? 'EN' : 'PT';
  }
}

function updatePlaceholders() {
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = i18next.t(key);
    });
}

// Adicione um evento de clique para o botão de tradução
document.querySelector('.translate-toggle').addEventListener('click', () => {
  const newLang = i18next.language === 'pt' ? 'en' : 'pt';
  i18next.changeLanguage(newLang, (err, t) => {
    if (err) return console.error('something went wrong loading', err);
    updateContent();
    updatePlaceholders();
    document.documentElement.lang = newLang;
  });
});



document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const balaoContato = document.querySelector('.balao-contato');
    
    // Verifica o tema salvo ou usa 'light' como padrão
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateToggle(savedTheme);
    
    // Alternar tema
    toggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggle(newTheme);
    });
    
    function updateToggle(theme) {
        const icon = document.querySelector('.toggle-icon');
        const text = document.querySelector('.toggle-text');
        
        if (theme === 'dark') {
            icon.textContent = '🌙';
            text.textContent = 'dark';
        } else {
            icon.textContent = '☀️';
            text.textContent = 'light';
        }
    }

    // Navegação entre seções
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class de todos os links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // Adiciona active no link clicado
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const allSections = document.querySelectorAll('section');
            
            // Esconde todas as seções
            allSections.forEach(section => {
                section.classList.add('esconder');
                section.classList.remove('mostrar');
            });
            
            // Mostra apenas a seção alvo
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                targetSection.classList.add('mostrar');
                targetSection.classList.remove('esconder');
                
                // Scroll suave apenas para ajuste de posição
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    

    // Garanta que a seção inicial esteja visível ao carregar
    document.querySelector('#inicio').classList.add('mostrar');

    if (balaoContato) {
        balaoContato.addEventListener('click', function (e) {
            e.stopPropagation();
            balaoContato.classList.toggle('aberto');
        });

        document.addEventListener('click', function (e) {
            if (!balaoContato.contains(e.target)) {
                balaoContato.classList.remove('aberto');
            }
        });
    }
});

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Função modificada para trabalhar com múltiplos carrosséis
function initCarrossel(carrosselContainer) {
    const carrossel = carrosselContainer.querySelector('.carrossel');
    const slides = carrosselContainer.querySelectorAll('.carrossel-slide');
    const btnAnterior = carrosselContainer.querySelector('.anterior');
    const btnProximo = carrosselContainer.querySelector('.proximo');
    const indicadores = carrosselContainer.querySelectorAll('.indicador');
    let currentIndex = 0;
    
    function updateCarrossel() {
        carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualiza indicadores
        indicadores.forEach((ind, index) => {
            ind.classList.toggle('ativo', index === currentIndex);
        });
    }
    
    btnProximo.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarrossel();
    });
    
    btnAnterior.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarrossel();
    });
    
    
// Navegação por indicadores
indicadores.forEach((ind, index) => {
    ind.addEventListener('click', () => {
        currentIndex = index;
        updateCarrossel();
    });
});
}

// Inicializa todos os carrosséis na página
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.carrossel-container').forEach(container => {
        initCarrossel(container);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const buscaInput = document.getElementById('busca-projetos');
    const btnBuscar = document.getElementById('btn-buscar');
    const sugestoesTags = document.querySelectorAll('.sugestao-tag');
    
    // Função principal de filtro
    function filtrarProjetos() {
        const termo = buscaInput.value.trim().toLowerCase();
        const projetos = document.querySelectorAll('.projeto-card');
        
        if (termo === '') {
            // Mostra todos os projetos se a busca estiver vazia
            projetos.forEach(projeto => {
                projeto.style.display = 'block';
            });
            return;
        }
        
        projetos.forEach(projeto => {
            const titulo = projeto.querySelector('.projeto-header h3').textContent.toLowerCase();
            const descricao = projeto.querySelector('.projeto-descricao')?.textContent.toLowerCase() || '';
            const tecnologias = Array.from(projeto.querySelectorAll('.tech-badge'))
                                   .map(tech => tech.textContent.toLowerCase())
                                   .join(' ');
            
            // Verifica se o termo existe em qualquer campo
            const corresponde = 
                titulo.includes(termo) || 
                descricao.includes(termo) || 
                tecnologias.includes(termo);
            
            projeto.style.display = corresponde ? 'block' : 'none';
        });
    }
    
    // Event Listeners
    buscaInput.addEventListener('input', filtrarProjetos);
    btnBuscar.addEventListener('click', filtrarProjetos);
    
    // Tecla ESC para limpar
    buscaInput.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filtrarProjetos();
            this.focus();
        }
    });
    
    // Evento para as tags de sugestão (versão simplificada)
    sugestoesTags.forEach(tag => {
        tag.addEventListener('click', function() {
            buscaInput.value = this.textContent;
            filtrarProjetos();
            buscaInput.focus();
        });
    });
    
    // Mantém o foco apenas após interação do usuário.
});



    
// Função para tela cheia
function setupFullscreen() {
    const carrosselSlides = document.querySelectorAll('.carrossel-slide');
    
    carrosselSlides.forEach(slide => {
        const media = slide.querySelector('img, video');
        if (!media) return;
        
        media.style.cursor = 'zoom-in';
        media.addEventListener('click', (e) => {
            e.stopPropagation();
            openFullscreen(media);
        });
    });
}

function openFullscreen(media) {
    // Cria overlay
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    
    // Clonagem do elemento de mídia
    const mediaClone = media.cloneNode(true);
    mediaClone.className = media.tagName === 'IMG' ? 'fullscreen-image' : 'fullscreen-video';
    mediaClone.controls = true; // Para vídeos
    
    // Botão de fechar
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-fullscreen';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    // Monta a estrutura
    overlay.appendChild(mediaClone);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    
    // Fecha ao clicar fora
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    // Fecha com ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    setupFullscreen();
});

    





// ========== CHATBOT PORTFÓLIO - ESTEVÃO M. JUNIOR ==========

// ================= BASE DE CONHECIMENTO =================
const knowledge = {
  pt: {
    nome:        "Meu nome é Estevão M. Junior, tenho 25 anos e sou de Guaiúba, Ceará.",
    idade:       "Tenho 25 anos.",
    localizacao: "Sou de Guaiúba, Ceará — Brasil.",
    profissao:   "Sou Engenheiro de Computação (em formação) e Desenvolvedor Full-Stack, com foco em IoT e sistemas embarcados.",
    formacao:    "Curso Engenharia de Computação na UNILAB desde 2023.",
    experiencia: [
      "Atuo como freelancer desde 2022, com clientes no Brasil e nos EUA. Tenho experiência em e-commerce, automação de vídeos com IA, IoT e sistemas web completos.",
      "Desde 2022 trabalho como freelancer. Já desenvolvi projetos para o mercado brasileiro e americano — o mais recente foi a automação de vídeos para a LongLifeNutri (EUA).",
      "Comecei como freelancer em 2022 e desde então entrego projetos em áreas como IoT, e-commerce, automação e desenvolvimento web full-stack."
    ],
    diferencial: [
      "Meu diferencial é unir hardware (IoT, sistemas embarcados) com software (Full-Stack). Também tenho experiência em iniciação científica, inglês técnico avançado e facilidade para aprender novas tecnologias.",
      "Poucos desenvolvedores dominam hardware e software ao mesmo tempo. Essa é minha vantagem: posso ir do sensor físico até a interface web no mesmo projeto.",
      "Combino IoT com Full-Stack, tenho base em pesquisa científica na UNILAB e me comunico bem em inglês técnico — o que me permite atender clientes internacionais."
    ],
    idiomas:     "Falo português nativo e tenho inglês técnico avançado para documentações e comunicação com clientes internacionais.",
    disponivel:  "Sim, estou disponível para projetos freelance! Entre em contato pelo e-mail j.estevao.m.junior@gmail.com ou WhatsApp (85) 99206-9495.",
    contato:     "Você pode me contatar pelo e-mail j.estevao.m.junior@gmail.com, WhatsApp (85) 99206-9495, LinkedIn ou GitHub — os links estão no rodapé da página.",
    curriculo:   "Meu currículo em português e inglês está disponível para download no topo da página.",
    certificados:"Na seção 'Formação' você encontra certificados de: Computação em Nuvem (AWS), Negociação, Redes Neurais Profundas e Flutter — todos pela UNILAB. Basta clicar em 'Visualizar Certificado'.",
    tecnologias: "Minhas tecnologias por área:\n• Front-end: HTML5, CSS3, JavaScript, TypeScript (básico), Flutter\n• Back-end: PHP, Python, C\n• Banco de dados: MySQL, PostgreSQL, SQLite\n• IoT / Hardware: Arduino, C para microcontroladores, sensores de vazão\n• Ferramentas: Git, GitHub, APIs REST, integração WhatsApp e PIX",
    frontend:    "No front-end domino HTML5, CSS3 e JavaScript (intermediário). Também trabalho com Flutter para apps multiplataforma e tenho conhecimento básico de TypeScript.",
    backend:     "No back-end trabalho com PHP (avançado), Python (intermediário) e C. Já construí sistemas com autenticação, painéis administrativos e integrações com APIs externas.",
    banco:       "Trabalho com MySQL e PostgreSQL para bancos relacionais, e SQLite em projetos menores ou embarcados.",
    iot:         "Em IoT uso Arduino com C, sensores de vazão e outros periféricos. O HydroGuard é meu principal projeto nessa área — monitoramento de água em tempo real.",
    hydroguard:  "🏆 HydroGuard — Monitoramento de Vazão de Água (IoT)\nMeu projeto mais premiado. Monitora em tempo real o consumo de água usando Arduino UNO e sensor de vazão, reduzindo o desperdício em até 40%. Foi premiado como Melhor Projeto de Sustentabilidade em Hardware.\nÉ de baixo custo e pode ser instalado em qualquer ponto da rede hidráulica residencial.\nTecnologias: Arduino, C, sensor de vazão, IoT.",
    dicazo: "🛒 Dicazo — E-commerce de Roupas Infantis\nE-commerce completo desenvolvido do zero. Possui painel administrativo, gestão de produtos, controle de estoque por tamanhos, upload de imagens, exportação CSV e proteção contra SQL Injection e XSS.\nTecnologias: PHP, MySQL, HTML5, CSS3, JavaScript.",
    fileorganizer:"📁 FileOrganizer — Organizador Automático de Arquivos\nFerramenta desktop em Python que organiza arquivos por categoria (imagens, documentos, vídeos etc.). O usuário seleciona a pasta e o sistema cria as subpastas automaticamente. Versão .exe disponível no GitHub.\nTecnologias: Python, Tkinter.",
    calculadora3d:"📐 Calculadora 3D — Precificação para Impressão 3D\nCalcula o preço de impressões 3D considerando tempo, custo do material por kg, hora técnica e margem de lucro. Mantém histórico de cálculos.\nTecnologias: HTML5, CSS3, JavaScript.",
    longlifenutr: "🎬 LongLifeNutri — Automação de Vídeos com IA (EUA)\nProjeto freelance para empresa americana (nov/2025–mar/2026). Sistema Python que cria vídeos automaticamente a partir de textos: busca clipes, edita timeline, adiciona legendas e narração por TTS.\nTecnologias: Python, TTS, automação de vídeo, IA.",
    conversormoeda:"💱 Conversor de Moedas — Cotações em Tempo Real\nConversor web com ExchangeRate-API para cotações de mais de 20 moedas. Tem autocompletar, validação e design responsivo.\nTecnologias: HTML5, CSS3, JavaScript, ExchangeRate-API.",
    projetos:    "Meus principais projetos:\n🏆 HydroGuard — IoT premiado de monitoramento de água\n🛒 Dicazo — E-commerce de academia completo\n🎬 LongLifeNutri — Automação de vídeos com IA (EUA)\n📁 FileOrganizer — Organizador de arquivos em Python\n📐 Calculadora 3D — Precificação para impressão 3D\n💱 Conversor de Moedas — Cotações em tempo real\n\nPergunte \"me faz um resumo do [nome]\" para saber mais!",
  },
  en: {
    nome:        "My name is Estevão M. Junior, I'm 25 years old, from Guaiúba, Ceará, Brazil.",
    idade:       "I'm 25 years old.",
    localizacao: "I'm from Guaiúba, Ceará — Brazil.",
    profissao:   "I'm a Computer Engineering student and Full-Stack Developer focused on IoT and embedded systems.",
    formacao:    "I've been studying Computer Engineering at UNILAB since 2023.",
    experiencia: [
      "I've been freelancing since 2022, with clients in Brazil and the USA. Experience in e-commerce, AI video automation, IoT and full web systems.",
      "Since 2022 I've worked as a freelancer delivering projects for Brazilian and American markets — the most recent was video automation for LongLifeNutri (USA).",
    ],
    diferencial: [
      "My edge is combining hardware (IoT, embedded systems) with software (Full-Stack). I also have scientific research experience, advanced technical English and fast learning skills.",
      "Few developers master both hardware and software. That's my advantage: I can go from a physical sensor all the way to a web interface in the same project.",
    ],
    idiomas:     "I speak native Portuguese and have advanced technical English for documentation and international client communication.",
    disponivel:  "Yes, I'm available for freelance work! Contact me at j.estevao.m.junior@gmail.com or WhatsApp +55 85 99206-9495.",
    contato:     "You can reach me via email j.estevao.m.junior@gmail.com, WhatsApp, LinkedIn or GitHub — links are in the footer.",
    curriculo:   "My resume (PT and EN) is available for download at the top of the page.",
    certificados:"In the 'Education' section you'll find certificates for Cloud Computing (AWS), Negotiation, Deep Neural Networks and Flutter — all from UNILAB.",
    tecnologias: "My technologies by area:\n• Front-end: HTML5, CSS3, JavaScript, TypeScript (basic), Flutter\n• Back-end: PHP, Python, C\n• Databases: MySQL, PostgreSQL, SQLite\n• IoT / Hardware: Arduino, C for microcontrollers, flow sensors\n• Tools: Git, GitHub, REST APIs, WhatsApp and PIX integrations",
    frontend:    "On the front-end I work with HTML5, CSS3 and JavaScript (intermediate). Also Flutter for cross-platform apps and basic TypeScript.",
    backend:     "On the back-end I use PHP (advanced), Python (intermediate) and C. I've built complete systems with auth, admin panels and API integrations.",
    banco:       "I work with MySQL and PostgreSQL for relational databases, and SQLite for smaller or embedded projects.",
    iot:         "In IoT I use Arduino with C, flow sensors and other peripherals. HydroGuard is my main project — real-time water monitoring.",
    hydroguard:  "🏆 HydroGuard — Water Flow Monitoring (IoT)\nMy most awarded project. Monitors water consumption in real time using Arduino UNO and a flow sensor, reducing waste by up to 40%. Won Best Sustainability Hardware award. Low-cost and installable at any residential water point.\nTech: Arduino, C, flow sensor, IoT.",
    dicazo: "🛒 Dicazo — Children's Clothing E-commerce\nFull e-commerce built from scratch. Features admin panel, product management, size-based stock, image upload, CSV export, SQL Injection and XSS protection.\nTech: PHP, MySQL, HTML5, CSS3, JavaScript.",
    fileorganizer:"📁 FileOrganizer — Automatic File Organizer\nPython desktop tool that sorts files into categories automatically. User picks a folder, system creates subfolders. Executable (.exe) on GitHub.\nTech: Python, Tkinter.",
    calculadora3d:"📐 3D Calculator — 3D Print Pricing Tool\nCalculates 3D print prices using print time, material cost/kg, hourly rate and profit margin. Keeps calculation history.\nTech: HTML5, CSS3, JavaScript.",
    longlifenutr: "🎬 LongLifeNutri — AI Video Automation (USA)\nFreelance project for a US company (Nov/2025–Mar/2026). Python system that auto-creates videos from text: searches clips, edits timeline, adds synced captions and TTS narration.\nTech: Python, TTS, video automation, AI.",
    conversormoeda:"💱 Currency Converter — Real-Time Rates\nWeb converter using ExchangeRate-API for 20+ currencies. Features autocomplete, validation and responsive design.\nTech: HTML5, CSS3, JavaScript, ExchangeRate-API.",
    projetos:    "My main projects:\n🏆 HydroGuard — Award-winning IoT water monitoring\n🛒 Dicazo — Full fitness e-commerce\n🎬 LongLifeNutri — AI video automation (US client)\n📁 FileOrganizer — Automatic file organizer in Python\n📐 3D Calculator — 3D print pricing tool\n💱 Currency Converter — Real-time exchange rates\n\nAsk \"tell me about [name]\" to learn more!",
  }
};

// ================= SUGESTÕES CLICÁVEIS =================
const suggestions = {
  pt: [
    { label: "📁 Meus projetos",  query: "quais são seus projetos?" },
    { label: "🛠️ Tecnologias",   query: "quais tecnologias você usa?" },
    { label: "🏆 HydroGuard",    query: "me faz um resumo do HydroGuard" },
    { label: "🛒 Dicazo",        query: "me faz um resumo do Dicazo" },
    { label: "📞 Contato",       query: "como entrar em contato?" },
    { label: "💼 Disponível?",   query: "você está disponível para freelas?" },
  ],
  en: [
    { label: "📁 Projects",      query: "what are your projects?" },
    { label: "🛠️ Tech stack",    query: "what technologies do you use?" },
    { label: "🏆 HydroGuard",   query: "tell me about HydroGuard" },
    { label: "🛒 Dicazo",       query: "tell me about Dicazo" },
    { label: "📞 Contact",      query: "how can I contact you?" },
    { label: "💼 Available?",   query: "are you available for freelance?" },
  ]
};

// ================= PERGUNTAS RELACIONADAS =================
const related = {
  pt: {
    hydroguard:    [{ label: "🛒 Ver Dicazo",         query: "me faz um resumo do Dicazo" },        { label: "⚡ IoT / Arduino",     query: "me fala sobre IoT e Arduino" }],
    dicazo:        [{ label: "🛠️ Back-end usado",    query: "me conta sobre seu back-end" },        { label: "📁 Ver projetos",      query: "quais são seus projetos?" }],
    fileorganizer: [{ label: "🎬 LongLifeNutri",      query: "me faz um resumo do LongLifeNutri" }, { label: "🐍 Python / Back-end", query: "me conta sobre seu back-end" }],
    calculadora3d: [{ label: "💱 Conversor de Moedas",query: "me faz um resumo do Conversor" },     { label: "📁 Ver projetos",      query: "quais são seus projetos?" }],
    longlifenutr:  [{ label: "🐍 Python",             query: "me conta sobre seu back-end" },       { label: "📁 Ver projetos",      query: "quais são seus projetos?" }],
    conversormoeda:[{ label: "📐 Calculadora 3D",     query: "me faz um resumo da Calculadora 3D"}, { label: "📁 Ver projetos",      query: "quais são seus projetos?" }],
    tecnologias:   [{ label: "⚡ IoT / Arduino",      query: "me fala sobre IoT e Arduino" },       { label: "🛠️ Front-end",         query: "me fala sobre seu front-end" }],
    projetos:      [{ label: "🏆 HydroGuard",         query: "me faz um resumo do HydroGuard" },    { label: "🛒 Dicazo",            query: "me faz um resumo do Dicazo" }],
    contato:       [{ label: "💼 Disponível?",        query: "você está disponível para freelas?" }, { label: "📄 Currículo",         query: "onde está seu currículo?" }],
    iot:           [{ label: "🏆 Ver HydroGuard",     query: "me faz um resumo do HydroGuard" },    { label: "📁 Ver projetos",      query: "quais são seus projetos?" }],
    backend:       [{ label: "🛠️ Front-end",          query: "me fala sobre seu front-end" },       { label: "🗄️ Banco de dados",    query: "quais bancos de dados você usa?" }],
    frontend:      [{ label: "🛠️ Back-end",           query: "me conta sobre seu back-end" },       { label: "🏆 HydroGuard",        query: "me faz um resumo do HydroGuard" }],
  },
  en: {
    hydroguard:    [{ label: "🛒 See Dicazo",         query: "tell me about Dicazo" },              { label: "⚡ IoT / Arduino",     query: "tell me about IoT and Arduino" }],
    dicazo:        [{ label: "🛠️ Back-end",          query: "tell me about your back-end" },        { label: "📁 Projects",          query: "what are your projects?" }],
    fileorganizer: [{ label: "🎬 LongLifeNutri",      query: "tell me about LongLifeNutri" },       { label: "🐍 Python / Back-end", query: "tell me about your back-end" }],
    calculadora3d: [{ label: "💱 Currency Converter", query: "tell me about the currency converter"},{ label: "📁 Projects",         query: "what are your projects?" }],
    longlifenutr:  [{ label: "🐍 Python",             query: "tell me about your back-end" },       { label: "📁 Projects",          query: "what are your projects?" }],
    conversormoeda:[{ label: "📐 3D Calculator",      query: "tell me about the 3D calculator" },   { label: "📁 Projects",          query: "what are your projects?" }],
    tecnologias:   [{ label: "⚡ IoT / Arduino",      query: "tell me about IoT and Arduino" },     { label: "🛠️ Front-end",         query: "tell me about your front-end" }],
    projetos:      [{ label: "🏆 HydroGuard",         query: "tell me about HydroGuard" },          { label: "🛒 Dicazo",            query: "tell me about Dicazo" }],
    contato:       [{ label: "💼 Available?",         query: "are you available for freelance?" },   { label: "📄 Resume",            query: "where is your resume?" }],
    iot:           [{ label: "🏆 See HydroGuard",     query: "tell me about HydroGuard" },          { label: "📁 Projects",          query: "what are your projects?" }],
    backend:       [{ label: "🛠️ Front-end",          query: "tell me about your front-end" },      { label: "🗄️ Databases",         query: "what databases do you use?" }],
    frontend:      [{ label: "🛠️ Back-end",           query: "tell me about your back-end" },       { label: "🏆 HydroGuard",        query: "tell me about HydroGuard" }],
  }
};

// ================= KEYWORDS =================
const keywordsMap = [
  { key: "nome",         words: [{ w: "nome", p: 2 }, { w: "chama", p: 2 }, { w: "quem e voce", p: 3 }, { w: "quem eh voce", p: 3 }, { w: "name", p: 2 }, { w: "who are you", p: 3 }] },
  { key: "idade",        words: [{ w: "idade", p: 2 }, { w: "quantos anos", p: 3 }, { w: "age", p: 2 }, { w: "how old", p: 3 }] },
  { key: "localizacao",  words: [{ w: "onde mora", p: 3 }, { w: "cidade", p: 2 }, { w: "ceara", p: 3 }, { w: "guaiuba", p: 3 }, { w: "location", p: 2 }, { w: "where are you", p: 3 }] },
  { key: "profissao",    words: [{ w: "profissao", p: 2 }, { w: "o que faz", p: 2 }, { w: "trabalha com", p: 2 }, { w: "area", p: 1 }, { w: "job", p: 2 }, { w: "what do you do", p: 3 }] },
  { key: "formacao",     words: [{ w: "formacao", p: 2 }, { w: "faculdade", p: 2 }, { w: "universidade", p: 2 }, { w: "unilab", p: 3 }, { w: "engenharia", p: 2 }, { w: "education", p: 2 }, { w: "university", p: 2 }, { w: "degree", p: 2 }] },
  { key: "experiencia",  words: [{ w: "experiencia", p: 2 }, { w: "desde quando", p: 2 }, { w: "tempo de", p: 1 }, { w: "freelance", p: 2 }, { w: "experience", p: 2 }, { w: "how long", p: 1 }, { w: "ja trabalhou", p: 2 }, { w: "worked with", p: 2 }] },
  { key: "diferencial",  words: [{ w: "diferencial", p: 3 }, { w: "ponto forte", p: 2 }, { w: "destaque", p: 2 }, { w: "what makes you", p: 3 }, { w: "stand out", p: 3 }, { w: "highlight", p: 2 }] },
  { key: "idiomas",      words: [{ w: "idioma", p: 2 }, { w: "ingles", p: 3 }, { w: "fala ingles", p: 3 }, { w: "english", p: 3 }, { w: "language", p: 2 }, { w: "speak english", p: 3 }] },
  { key: "disponivel",   words: [{ w: "disponivel", p: 3 }, { w: "aceita freela", p: 3 }, { w: "novo projeto", p: 2 }, { w: "contratar", p: 3 }, { w: "hire", p: 3 }, { w: "available", p: 3 }, { w: "freelance work", p: 3 }] },
  { key: "contato",      words: [{ w: "contato", p: 2 }, { w: "email", p: 2 }, { w: "whatsapp", p: 2 }, { w: "falar com", p: 2 }, { w: "contact", p: 2 }, { w: "reach you", p: 3 }, { w: "get in touch", p: 3 }] },
  { key: "curriculo",    words: [{ w: "curriculo", p: 2 }, { w: "resume", p: 2 }, { w: "cv", p: 2 }, { w: "baixar", p: 1 }, { w: "download", p: 1 }] },
  { key: "certificados", words: [{ w: "certificado", p: 3 }, { w: "certificacao", p: 3 }, { w: "certificate", p: 3 }, { w: "curso", p: 1 }] },
  { key: "tecnologias",  words: [{ w: "tecnologia", p: 2 }, { w: "stack", p: 2 }, { w: "todas", p: 1 }, { w: "quais linguagem", p: 3 }, { w: "quais tecnologia", p: 3 }, { w: "tools", p: 1 }, { w: "languages", p: 2 }, { w: "tech stack", p: 3 }] },
  { key: "frontend",     words: [{ w: "front", p: 2 }, { w: "frontend", p: 3 }, { w: "html", p: 2 }, { w: "css", p: 2 }, { w: "interface", p: 1 }, { w: "javascript", p: 1 }] },
  { key: "backend",      words: [{ w: "back", p: 2 }, { w: "backend", p: 3 }, { w: "servidor", p: 2 }, { w: "php", p: 2 }, { w: "python", p: 2 }, { w: "server", p: 2 }] },
  { key: "banco",        words: [{ w: "banco de dados", p: 3 }, { w: "database", p: 3 }, { w: "mysql", p: 3 }, { w: "sql", p: 2 }, { w: "postgres", p: 3 }] },
  { key: "iot",          words: [{ w: "iot", p: 3 }, { w: "arduino", p: 3 }, { w: "embarcado", p: 3 }, { w: "hardware", p: 2 }, { w: "sensor", p: 2 }, { w: "microcontrolador", p: 3 }] },
  { key: "hydroguard",   words: [{ w: "hydroguard", p: 3 }, { w: "vazao", p: 3 }, { w: "hydro", p: 2 }, { w: "water monitoring", p: 3 }, { w: "sustentabilidade", p: 2 }, { w: "premiado", p: 1 }] },
  { key: "dicazo",       words: [{ w: "dicazo", p: 3 }, { w: "ecommerce", p: 2 }, { w: "loja", p: 2 }, { w: "shop", p: 1 }] },
  { key: "fileorganizer",words: [{ w: "fileorganizer", p: 3 }, { w: "file organizer", p: 3 }, { w: "organizar arquivo", p: 3 }, { w: "organizador", p: 2 }] },
  { key: "calculadora3d",words: [{ w: "calculadora 3d", p: 3 }, { w: "3d", p: 2 }, { w: "impressao 3d", p: 3 }, { w: "precificacao", p: 2 }, { w: "3d print", p: 3 }] },
  { key: "longlifenutr", words: [{ w: "longlifenutr", p: 3 }, { w: "longlife", p: 3 }, { w: "automacao de video", p: 3 }, { w: "video automation", p: 3 }, { w: "tts", p: 2 }] },
  { key: "conversormoeda",words:[{ w: "conversor", p: 3 }, { w: "moeda", p: 3 }, { w: "cambio", p: 3 }, { w: "currency", p: 3 }, { w: "exchange", p: 2 }, { w: "cotacao", p: 2 }] },
  { key: "projetos",     words: [{ w: "projeto", p: 1 }, { w: "portfolio", p: 2 }, { w: "todos", p: 1 }, { w: "projects", p: 2 }, { w: "listar", p: 2 }, { w: "quais sao", p: 2 }] },
];

// ================= ALIASES DE PROJETO =================
const projectAliases = {
  "hydroguard": "hydroguard", "hydro guard": "hydroguard", "hydro": "hydroguard",
  "dicazo": "dicazo", "e-commerce": "dicazo", "ecommerce": "dicazo",
  "fileorganizer": "fileorganizer", "file organizer": "fileorganizer", "organizador": "fileorganizer",
  "calculadora 3d": "calculadora3d", "calculadora": "calculadora3d", "3d calculator": "calculadora3d",
  "longlife": "longlifenutr", "longlifenutr": "longlifenutr", "long life nutri": "longlifenutr",
  "conversor": "conversormoeda", "moeda": "conversormoeda", "currency converter": "conversormoeda",
};

const resumePatterns = [
  /(?:faz?|faca|da|me conta|me fale|me fala|conte|explique|explica|quero saber|me diz|o que [eé]|what is|tell me about|give me a summary of|summary of|describe|explain)\s+(?:um resumo d[oae]|sobre [oae]|the|about the|[oae])?\s*(.+)/i,
  /(?:resumo|summary)\s+(?:d[oae]|of|the)?\s*(.+)/i,
  /(?:o que [eé]|what is|what's)\s+(?:[oae]|the)?\s*(.+)/i,
];

// ================= CONTEXTO =================
let lastKey = null;

const contextTriggers = ["ele", "ela", "esse", "isso", "nele", "sobre ele", "quais tecnologias ele usa", "quais tecnologias usa", "ta online", "esta online", "tem demo", "link", "it", "that", "that one", "this project", "is it live", "demo"];

function isContextQuery(text) {
  const t = clean(text);
  return contextTriggers.some(tr => new RegExp(`\\b${normalize(tr).replace(/\s+/g, "\\s+")}\\b`, "i").test(t));
}

// ================= UTIL =================
function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function clean(text) {
  return normalize(text).replace(/[^\w\s]/g, "").replace(/\s+/g, " ");
}
function detectLang(text) {
  const enWords = ["what", "who", "how", "name", "age", "job", "project", "tell", "about", "your", "tech", "can", "you", "speak", "available", "resume", "certificate", "contact", "where", "work", "experience", "skills", "language", "currency", "stack", "is", "are", "does", "do"];
  const t = clean(text);
  const score = enWords.reduce((a, w) => a + (new RegExp(`\\b${w}\\b`).test(t) ? 1 : 0), 0);
  return score >= 2 ? "en" : "pt";
}
function pickVariant(val) {
  if (Array.isArray(val)) return val[Math.floor(Math.random() * val.length)];
  return val;
}

// ================= DETECÇÃO DE PROJETO =================
function detectProjectQuery(text) {
  const t = normalize(text).replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  for (const pattern of resumePatterns) {
    const match = t.match(pattern);
    if (match) {
      const candidate = normalize(match[match.length - 1]).replace(/[^\w\s]/g, "").trim();
      for (const [alias, key] of Object.entries(projectAliases)) {
        if (candidate.includes(alias) || alias.includes(candidate)) return key;
      }
    }
  }
  for (const [alias, key] of Object.entries(projectAliases)) {
    if (t.includes(alias)) return key;
  }
  return null;
}

// ================= SCORE =================
function getBestMatch(text) {
  const t = clean(text);
  let bestKey = null, bestScore = 0;
  for (const { key, words } of keywordsMap) {
    let score = 0;
    for (const { w, p } of words) {
      if (new RegExp(`\\b${normalize(w).replace(/\s+/g, "\\s+")}\\b`, "i").test(t)) score += p;
    }
    if (score > bestScore) { bestScore = score; bestKey = key; }
  }
  return { bestKey, bestScore };
}

// ================= SAUDAÇÕES =================
const greetingWords = ["oi", "ola", "olá", "hey", "opa", "bom dia", "boa tarde", "boa noite", "tudo bem", "tudo bom", "hi", "hello", "good morning", "good afternoon", "good evening", "how are you"];
function isGreeting(text) {
  const t = clean(text);
  return greetingWords.some(g => new RegExp(`^${normalize(g)}[!?. ]*$`).test(t));
}

// ================= RESPOSTA PRINCIPAL =================
function getBotReply(question) {
  const lang = detectLang(question);
  const faq  = knowledge[lang];

  if (isGreeting(question)) {
    lastKey = null;
    return lang === "pt"
      ? "Olá! Sou o assistente virtual do Estevão 👋\nPode me perguntar sobre projetos, tecnologias, experiência, formação ou contato. Como posso ajudar?"
      : "Hello! I'm Estevão's virtual assistant 👋\nYou can ask about projects, technologies, experience, education or contact. How can I help?";
  }

  if (lastKey && isContextQuery(question) && faq[lastKey]) {
    return pickVariant(faq[lastKey]);
  }

  const projectKey = detectProjectQuery(question);
  if (projectKey && faq[projectKey]) {
    lastKey = projectKey;
    return pickVariant(faq[projectKey]);
  }

  const { bestKey, bestScore } = getBestMatch(question);
  if (bestScore >= 1 && faq[bestKey]) {
    lastKey = bestKey;
    return pickVariant(faq[bestKey]);
  }

  lastKey = null;
  return lang === "pt"
    ? "Hmm, não entendi muito bem 😅\n\nVocê pode perguntar:\n• \"Me faz um resumo do HydroGuard\"\n• \"Quais são seus projetos?\"\n• \"Quais tecnologias você usa?\"\n• \"Como entrar em contato?\"\n• \"Você está disponível para freelas?\"\n\nTente reformular!"
    : "Hmm, I didn't quite get that 😅\n\nYou can ask:\n• \"Tell me about HydroGuard\"\n• \"What are your projects?\"\n• \"What technologies do you use?\"\n• \"How can I contact you?\"\n• \"Are you available for freelance?\"\n\nTry rephrasing!";
}

// ================= CSS INJETADO =================
function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .chat-suggestions{display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px 4px;border-top:1px solid rgba(0,0,0,0.07)}
    .chat-chip{background:transparent;border:1px solid rgba(0,0,0,0.18);border-radius:999px;padding:4px 11px;font-size:12px;cursor:pointer;transition:background .15s,color .15s;color:inherit;white-space:nowrap}
    .chat-chip:hover{background:rgba(0,0,0,0.07)}
    .typing-dots{display:flex;align-items:center;gap:4px;padding:4px 0}
    .typing-dots span{width:7px;height:7px;border-radius:50%;background:currentColor;opacity:0.4;animation:chatBounce 1.2s infinite ease-in-out}
    .typing-dots span:nth-child(2){animation-delay:.2s}
    .typing-dots span:nth-child(3){animation-delay:.4s}
    @keyframes chatBounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}
    .chat-related{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
    .chat-related-chip{background:transparent;border:1px solid rgba(0,0,0,0.2);border-radius:999px;padding:3px 10px;font-size:11px;cursor:pointer;transition:background .15s;color:inherit;white-space:nowrap}
    .chat-related-chip:hover{background:rgba(0,0,0,0.07)}
  `;
  document.head.appendChild(style);
}

// ================= UI =================
function initChatbot() {
  const widget    = document.getElementById("chatbot-widget");
  const toggleBtn = document.getElementById("chat-toggle");
  const closeBtn  = document.querySelector(".chat-close");
  const sendBtn   = document.getElementById("chat-send");
  const input     = document.getElementById("chat-input");
  const messages  = document.querySelector(".chat-messages");

  if (!widget) return;
  injectStyles();

  // Sugestões clicáveis
  const suggestionsEl = document.createElement("div");
  suggestionsEl.className = "chat-suggestions";
  suggestionsEl.id = "chat-suggestions";
  widget.insertBefore(suggestionsEl, widget.querySelector(".chat-input-area"));

  function renderSuggestions(lang) {
    suggestionsEl.innerHTML = "";
    (suggestions[lang] || suggestions["pt"]).forEach(({ label, query }) => {
      const btn = document.createElement("button");
      btn.className = "chat-chip";
      btn.textContent = label;
      btn.onclick = () => send(query);
      suggestionsEl.appendChild(btn);
    });
  }

  // Histórico sessionStorage
  function saveHistory() {
    try {
      const msgs = [...messages.querySelectorAll(".bot-msg:not(.typing-indicator), .user-msg")].map(el => ({
        cls: el.className, html: el.innerHTML
      }));
      sessionStorage.setItem("chatHistory", JSON.stringify(msgs));
    } catch (e) {}
  }

  function loadHistory() {
    try {
      const saved = sessionStorage.getItem("chatHistory");
      if (!saved) return false;
      const msgs = JSON.parse(saved);
      if (!msgs.length) return false;
      msgs.forEach(({ cls, html }) => {
        const div = document.createElement("div");
        div.className = cls;
        div.style.whiteSpace = "pre-line";
        div.innerHTML = html;
        messages.appendChild(div);
      });
      messages.scrollTop = messages.scrollHeight;
      return true;
    } catch (e) { return false; }
  }

  // Adicionar mensagem
  function addMessage(text, isUser = false, relatedItems = null) {
    const wrap = document.createElement("div");
    wrap.className = isUser ? "user-msg" : "bot-msg";
    wrap.style.whiteSpace = "pre-line";
    wrap.textContent = text;

    if (!isUser && relatedItems && relatedItems.length) {
      const relDiv = document.createElement("div");
      relDiv.className = "chat-related";
      relatedItems.forEach(({ label, query }) => {
        const btn = document.createElement("button");
        btn.className = "chat-related-chip";
        btn.textContent = label;
        btn.onclick = () => send(query);
        relDiv.appendChild(btn);
      });
      wrap.appendChild(relDiv);
    }

    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    saveHistory();
  }

  // Animação de digitação (3 bolinhas)
  function addTyping() {
    const div = document.createElement("div");
    div.className = "bot-msg typing-indicator";
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  // Envio
  function send(forceText) {
    const text = (forceText !== undefined ? forceText : input.value).trim();
    if (!text) return;

    const lang = detectLang(text);
    renderSuggestions(lang);
    suggestionsEl.style.display = "none";

    addMessage(text, true);
    if (forceText === undefined) input.value = "";

    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      const reply = getBotReply(text);
      const relMap = related[lang] || related["pt"];
      const relItems = lastKey && relMap[lastKey] ? relMap[lastKey] : null;
      addMessage(reply, false, relItems);
    }, 450);
  }

  sendBtn.onclick = () => send();
  input.addEventListener("keypress", e => { if (e.key === "Enter") send(); });

  toggleBtn.onclick = () => {
    widget.style.display = "block";
    suggestionsEl.style.display = "flex";
    const browserLang = (navigator.language || "pt").startsWith("en") ? "en" : "pt";
    renderSuggestions(browserLang);
    input.focus();
  };

  closeBtn.onclick = () => (widget.style.display = "none");

  // Carrega histórico da sessão
  if (loadHistory()) {
    suggestionsEl.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", initChatbot);
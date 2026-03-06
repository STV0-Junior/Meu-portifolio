// Adicione isso no início do seu script.js
const i18nextConfig = {
  lng: 'pt', // idioma padrão
  fallbackLng: 'pt',
  debug: false,
  resources: {
    pt: {
        translation: {
            // Seção Início
            "ola_eu_sou": "OLÁ, EU SOU ESTEVÃO JUNIOR",
            "desenvolvedor_full_stack": "Desenvolvedor Full-Stack",
            "descricao_sobre_mim": "Desenvolvedor Full Stack com projeto premiado em tecnologia embarcada. Especializado em conectar o mundo físico ao digital através de sistemas embarcados e desenvolvimento web full-stack. Sempre em busca de novos desafios e oportunidades para criar soluções inovadoras. Além de desenvolver automações em python para preenchimento de planilhas.",
            
            // Seção Diferencial
            "meu_diferencial": "Meu diferencial:",
            "texto_diferencial": "Ponte entre Hardware e Software com visão integrada de sistemas. Combino expertise em tecnologia embarcada (com projeto premiado em IoT) com desenvolvimento full-stack para criar soluções completas. Com foco em otimização de performance desde o circuito até a interface do usuário, com foco em sustentabilidade e escalabilidade. Além de alto conhecimento em Hardware.",
            
            // Seção Habilidades
            "minhas_tecnologias": "Minhas tecnologias:",
            "front_end": "Front-end",
            "back_end": "Back-end",
            "banco_dados": "Banco de Dados",
            
            // Descrições de tecnologias
            "html_desc": "",
            "css_desc": "(Flexbox, Grid, Animations)",
            "js_desc": "(React/Vue)",
            "python_desc": "(Para automações)",
            "php_desc": "",
            "sql_desc": "(MySQL, PostgreSQL)",

            //projetos

            // Cabeçalho e busca
            "meus_projetos": "MEUS PROJETOS",
            "buscar_projetos": "Buscar projetos...",
            "sugestoes": "Sugestões:",

            // Títulos e seções comuns
            "funcionalidades_principais": "⚡ Funcionalidades Principais",
            "features_principais": "📋 Features Principais",
            "tecnologias": "🛠️ Tecnologias",
            "impacto": "📈 Impacto",
            "mecanismos_seguranca": "🔒 Mecanismos de Segurança",

            // HydroGuard
            "monitoramento_tempo_real": "Monitoramento em tempo real de vazão e consumo",
            "detecao_vazamentos": "Detecção proativa de vazamentos (95% precisão)",
            "dualidade_interfaces": "Dualidade de interfaces: LCD + Serial",
            "simulacao_cenarios": "Simulação adaptável de cenários (12h/24h)",
            "reducao_agua": "Redução de 40% no desperdício de água",
            "adaptavel_cenarios": "Adaptável para múltiplos cenários",
            "autonomia_bateria": "Autonomia de 72h em bateria 9V",

            // E-commerce
            "gerenciamento_produtos": "Gerenciamento de produtos com categorização",
            "upload_imagens": "Upload de imagens via drag-and-drop",
            "controle_estoque": "Controle de estoque por tamanhos",
            "painel_admin": "Painel administrativo intuitivo",
            "exportacao_dados": "Exportação de dados para CSV",
            "autenticacao_criptografada": "Autenticação com sessões criptografadas",
            "protecao_injection": "Proteção contra SQL injection/XSS",
            "sanitizacao_inputs": "Sanitização de inputs em tempo real",
            "painel_admin_completo": "Painel de administrador (adição, exclusão e modificação de produtos)",

            //formação

            // Cabeçalho
            "minha_formacao": "MINHA FORMAÇÃO",
            
            // Termos gerais
            "hardware": "Hardware",
            "programacao": "Programação",
            "sistemas_embarcados": "Sistemas Embarcados",
            "analises_quimicas": "Análises Químicas",
            "controle_qualidade": "Controle de Qualidade",
            "estagio_nutec": "Estágio no Nutec/UFC",
            "estagio": "Estágio:",
            "cursos_complementares": "Cursos Complementares",

            //contato

            "contato_titulo": "ENTRE EM CONTATO",
            "contato_texto": "Estou aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato através dos canais abaixo:"
        }
    },
    en: {
        translation: {


            // Seção Início
            "ola_eu_sou": "HELLO, I'M ESTEVÃO JUNIOR",
            "desenvolvedor_full_stack": "Full-Stack Developer",
            "descricao_sobre_mim": "Full Stack Developer with an award-winning embedded technology project. Specialized in connecting the physical and digital worlds through embedded systems and full-stack web development. Always looking for new challenges and opportunities to create innovative solutions. Also develops Python automations for spreadsheet filling.",
            
            // Seção Diferencial
            "meu_diferencial": "My differential:",
            "texto_diferencial": "Bridge between Hardware and Software with an integrated systems vision. I combine expertise in embedded technology (with an award-winning IoT project) with full-stack development to create complete solutions. Focused on performance optimization from the circuit to the user interface, with an emphasis on sustainability and scalability. Plus deep hardware knowledge.",
            
            // Seção Habilidades
            "minhas_tecnologias": "My technologies:",
            "front_end": "Front-end",
            "back_end": "Back-end",
            "banco_dados": "Database",
            
            // Descrições de tecnologias
            "html_desc": "",
            "css_desc": "(Flexbox, Grid, Animations)",
            "js_desc": "(React/Vue)",
            "python_desc": "(For automations)",
            "php_desc": "",
            "sql_desc": "(MySQL, PostgreSQL)",

            //projetos

            // Cabeçalho e busca
            "meus_projetos": "MY PROJECTS",
            "buscar_projetos": "Search projects...",
            "sugestoes": "Suggestions:",

            // Títulos e seções comuns
            "funcionalidades_principais": "⚡ Main Features",
            "features_principais": "📋 Key Features",
            "tecnologias": "🛠️ Technologies",
            "impacto": "📈 Impact",
            "mecanismos_seguranca": "🔒 Security Mechanisms",

            // HydroGuard
            "monitoramento_tempo_real": "Real-time flow and consumption monitoring",
            "detecao_vazamentos": "Proactive leak detection (95% accuracy)",
            "dualidade_interfaces": "Dual interfaces: LCD + Serial",
            "simulacao_cenarios": "Adaptable scenario simulation (12h/24h)",
            "reducao_agua": "40% reduction in water waste",
            "adaptavel_cenarios": "Adaptable to multiple scenarios",
            "autonomia_bateria": "72h autonomy on 9V battery",

            // E-commerce
            "gerenciamento_produtos": "Product management with categorization",
            "upload_imagens": "Image upload via drag-and-drop",
            "controle_estoque": "Inventory control by sizes",
            "painel_admin": "Intuitive admin panel",
            "exportacao_dados": "Data export to CSV",
            "autenticacao_criptografada": "Encrypted session authentication",
            "protecao_injection": "Protection against SQL injection/XSS",
            "sanitizacao_inputs": "Real-time input sanitization",
            "painel_admin_completo": "Admin panel (add, delete and modify products)",

            //formação

            // Cabeçalho
            "minha_formacao": "MY EDUCATION",
            
            // Termos gerais
            "hardware": "Hardware",
            "programacao": "Programming",
            "sistemas_embarcados": "Embedded Systems",
            "analises_quimicas": "Chemical Analysis",
            "controle_qualidade": "Quality Control",
            "estagio_nutec": "Internship at Nutec/UFC",
            "estagio": "Internship:",
            "cursos_complementares": "Additional Courses",

            // Dentro do objeto de tradução en
            "contato_titulo": "CONTACT ME",
            "contato_texto": "I'm open to new opportunities and collaborations. Feel free to contact me through the channels below:"
        }
    }
}
};

// Inicialize o i18next
i18next
  .use(i18nextBrowserLanguageDetector)
  .init(i18nextConfig, function(err, t) {
    // Inicialização concluída, agora podemos usar a tradução
    updateContent();
    updatePlaceholders();
    document.documentElement.lang = i18next.language || 'pt';
  });

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

    


//animação

document.addEventListener('DOMContentLoaded', () => {
    const balao = document.querySelector('.balao-contato');
    
    function animateEmoji() {
        // Adiciona classe com a animação
        balao.classList.add('emoji-shaking');
        
        setTimeout(() => {
            // Remove a animação após 2s
            balao.classList.remove('emoji-shaking');
            
            // Espera 8s e repete
            setTimeout(animateEmoji, 8000);
        }, 5000);
    }
    
    // Inicia após 1s (opcional)
    setTimeout(animateEmoji, 1000);
});




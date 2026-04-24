// ===================== DICA DO EASTER EGG NO RODAPÉ =====================
function adicionarDicaEasterEgg() {
    const copyrightParagrafo = document.querySelector('.footer-copyright p');
    if (!copyrightParagrafo) return;
    
    // Verifica se o span já foi adicionado (para não duplicar)
    if (document.querySelector('.easter-egg-hint')) return;
    
    // Cria o span com a dica
    const hintSpan = document.createElement('span');
    hintSpan.className = 'easter-egg-hint';
    hintSpan.textContent = ' (tente ↑ ↑ ↓ ↓ , se gostar de jogos clássicos)';
    hintSpan.style.display = 'inline';
    hintSpan.style.opacity = '0';
    hintSpan.style.transition = 'opacity 0.5s ease';
    hintSpan.style.fontSize = '0.9rem';
    hintSpan.style.color = 'var(--accent-color, #ff9800)';
    copyrightParagrafo.appendChild(hintSpan);
    
    let dicaMostrada = false;
    
    function mostrarDica() {
        if (dicaMostrada) return;
        // Verifica se o rodapé está visível
        const footer = document.querySelector('footer');
        if (!footer) return;
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Se o topo do footer estiver dentro da viewport ou próximo
        if (footerRect.top <= windowHeight - 100) {
            dicaMostrada = true;
            hintSpan.style.opacity = '1';
            // Após 4 segundos, some
            setTimeout(() => {
                hintSpan.style.opacity = '0';
                // Opcional: remover o span após sumir (ou manter invisível)
                setTimeout(() => {
                    if (hintSpan.parentNode) hintSpan.remove();
                }, 500);
            }, 3000);
            // Remove o listener de scroll após mostrar
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        }
    }
    
    function checkScroll() {
        // Pequeno delay para performance
        if (!dicaMostrada) requestAnimationFrame(mostrarDica);
    }
    
    // Adiciona eventos
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    // Também chama uma vez caso o usuário já esteja no final
    setTimeout(checkScroll, 500);
}

// Executar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', adicionarDicaEasterEgg);



// ===================== EASTER EGG: ASTEROIDS COM ISOLAMENTO DE TECLADO =====================
let jogoAberto = false;  // Impede o Konami de ser ativado de novo enquanto jogo roda

// Konami code listener principal (agora respeita a flag)
const konamiAsteroids = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
let konamiPosAsteroids = 0;

document.addEventListener('keydown', (e) => {
    if (jogoAberto) return;  // Se o jogo estiver aberto, o easter egg não faz nada
    const key = e.key;
    if (key === konamiAsteroids[konamiPosAsteroids]) {
        konamiPosAsteroids++;
        if (konamiPosAsteroids === konamiAsteroids.length) {
            iniciarAsteroids();
            konamiPosAsteroids = 0;
        }
    } else {
        konamiPosAsteroids = 0;
    }
});

function iniciarAsteroids() {
    jogoAberto = true;  // Marca que o jogo está aberto

    // Cria o modal
    const overlay = document.createElement('div');
    overlay.id = 'asteroids-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(2px);
    `;

    const gameContainer = document.createElement('div');
    gameContainer.style.cssText = `
        background: #000;
        border-radius: 16px;
        padding: 10px;
        box-shadow: 0 0 30px rgba(0,255,255,0.3);
    `;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = '2px solid cyan';
    canvas.style.borderRadius = '8px';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖ Fechar Jogo';
    closeBtn.style.cssText = `
        display: block;
        margin: 12px auto 0;
        background: #f44336;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 24px;
        cursor: pointer;
        font-family: monospace;
        font-weight: bold;
    `;
    
    gameContainer.appendChild(canvas);
    gameContainer.appendChild(closeBtn);
    overlay.appendChild(gameContainer);
    document.body.appendChild(overlay);

    // --- JOGO ASTEROIDS (mesma lógica de antes) ---
    const ctx = canvas.getContext('2d');
    
    let ship = {
        x: canvas.width/2,
        y: canvas.height/2,
        angle: 0,
        rotation: 0,
        thrust: false,
        velocity: { x: 0, y: 0 },
        radius: 12,
        active: true,
        invincibleTimer: 0
    };
    
    let asteroids = [];
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let bullets = [];
    const BULLET_SPEED = 7;
    const BULLET_COOLDOWN_MAX = 10;
    let bulletCooldown = 0;
    
    const keys = {
        ArrowLeft: false, ArrowRight: false,
        ArrowUp: false, Space: false
    };
    
    function createAsteroid(x, y, radius) {
        return {
            x: x || Math.random() * canvas.width,
            y: y || Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: radius || 20 + Math.random() * 15,
            angle: Math.random() * Math.PI * 2
        };
    }
    
    for (let i = 0; i < 5; i++) {
        asteroids.push(createAsteroid());
    }
    
    function wrapAround(obj) {
        if (obj.x < 0) obj.x = canvas.width;
        if (obj.x > canvas.width) obj.x = 0;
        if (obj.y < 0) obj.y = canvas.height;
        if (obj.y > canvas.height) obj.y = 0;
    }
    
    function shoot() {
        if (bulletCooldown > 0) return;
        bullets.push({
            x: ship.x + Math.cos(ship.angle) * ship.radius,
            y: ship.y + Math.sin(ship.angle) * ship.radius,
            vx: Math.cos(ship.angle) * BULLET_SPEED + ship.velocity.x,
            vy: Math.sin(ship.angle) * BULLET_SPEED + ship.velocity.y,
            life: 120
        });
        bulletCooldown = BULLET_COOLDOWN_MAX;
    }
    
    function update() {
        if (gameOver) return;
        
        if (keys.ArrowLeft) ship.rotation = -0.1;
        else if (keys.ArrowRight) ship.rotation = 0.1;
        else ship.rotation = 0;
        ship.angle += ship.rotation;
        
        if (keys.ArrowUp) {
            ship.thrust = true;
            ship.velocity.x += Math.cos(ship.angle) * 0.2;
            ship.velocity.y += Math.sin(ship.angle) * 0.2;
            let maxSpeed = 6;
            if (Math.abs(ship.velocity.x) > maxSpeed) ship.velocity.x = ship.velocity.x > 0 ? maxSpeed : -maxSpeed;
            if (Math.abs(ship.velocity.y) > maxSpeed) ship.velocity.y = ship.velocity.y > 0 ? maxSpeed : -maxSpeed;
        } else {
            ship.thrust = false;
        }
        
        if (keys.Space && !gameOver) shoot();
        if (bulletCooldown > 0) bulletCooldown--;
        
        ship.velocity.x *= 0.99;
        ship.velocity.y *= 0.99;
        ship.x += ship.velocity.x;
        ship.y += ship.velocity.y;
        wrapAround(ship);
        
        if (ship.invincibleTimer > 0) ship.invincibleTimer--;
        
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].x += bullets[i].vx;
            bullets[i].y += bullets[i].vy;
            bullets[i].life--;
            wrapAround(bullets[i]);
            if (bullets[i].life <= 0) {
                bullets.splice(i,1);
                i--;
            }
        }
        
        for (let a of asteroids) {
            a.x += a.vx;
            a.y += a.vy;
            wrapAround(a);
        }
        
        // Colisões tiros
        for (let i = 0; i < bullets.length; i++) {
            const b = bullets[i];
            let hit = false;
            for (let j = 0; j < asteroids.length; j++) {
                const a = asteroids[j];
                if (Math.hypot(b.x - a.x, b.y - a.y) < a.radius) {
                    hit = true;
                    if (a.radius > 15) {
                        asteroids.push(createAsteroid(a.x, a.y, a.radius * 0.6));
                        asteroids.push(createAsteroid(a.x, a.y, a.radius * 0.6));
                    }
                    asteroids.splice(j,1);
                    score += 10;
                    break;
                }
            }
            if (hit) {
                bullets.splice(i,1);
                i--;
            }
        }
        
        // Colisão nave
        if (ship.active && ship.invincibleTimer <= 0) {
            for (let i = 0; i < asteroids.length; i++) {
                const a = asteroids[i];
                if (Math.hypot(ship.x - a.x, ship.y - a.y) < ship.radius + a.radius) {
                    lives--;
                    if (lives <= 0) {
                        gameOver = true;
                    } else {
                        ship.x = canvas.width/2;
                        ship.y = canvas.height/2;
                        ship.velocity = { x: 0, y: 0 };
                        ship.angle = 0;
                        ship.invincibleTimer = 60;
                        bullets = [];
                        for (let a2 of asteroids) {
                            a2.x = Math.random() * canvas.width;
                            a2.y = Math.random() * canvas.height;
                        }
                    }
                    break;
                }
            }
        }
        
        if (asteroids.length === 0 && !gameOver) {
            for (let i = 0; i < 5 + Math.floor(score / 100); i++) {
                asteroids.push(createAsteroid());
            }
        }
    }
    
    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let a of asteroids) {
            ctx.beginPath();
            ctx.arc(a.x, a.y, a.radius, 0, Math.PI*2);
            ctx.fillStyle = '#5a5a5a';
            ctx.fill();
            ctx.strokeStyle = '#aaa';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        for (let b of bullets) {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(b.x-2, b.y-2, 4, 4);
        }
        
        if (ship.active) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(ship.angle);
            ctx.beginPath();
            ctx.moveTo(12, 0);
            ctx.lineTo(-8, -6);
            ctx.lineTo(-8, 6);
            ctx.closePath();
            ctx.fillStyle = ship.invincibleTimer > 0 && (Math.floor(Date.now()/100) % 2) ? 'gray' : 'cyan';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            if (ship.thrust) {
                ctx.beginPath();
                ctx.moveTo(-8, -3);
                ctx.lineTo(-14, 0);
                ctx.lineTo(-8, 3);
                ctx.fillStyle = 'orange';
                ctx.fill();
            }
            ctx.restore();
        }
        
        ctx.font = '20px monospace';
        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${score}`, 20, 30);
        ctx.fillText(`Lives: ${lives}`, 20, 60);
        if (gameOver) {
            ctx.font = '30px monospace';
            ctx.fillStyle = 'red';
            ctx.fillText('GAME OVER', canvas.width/2-100, canvas.height/2);
            ctx.font = '16px monospace';
            ctx.fillStyle = 'yellow';
            ctx.fillText('Feche e abra o jogo novamente', canvas.width/2-180, canvas.height/2+50);
        }
        ctx.font = '12px monospace';
        ctx.fillStyle = '#ccc';
        ctx.fillText('← → girar | ↑ acelerar | Espaço atirar', 10, canvas.height-10);
    }
    
    // --- NOVOS LISTENERS COM BLOQUEIO DE PROPAGAÇÃO ---
    function gameKeyDown(e) {
        // Impede que as teclas do jogo rolem a página ou ativem atalhos
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.key === 'ArrowLeft') keys.ArrowLeft = true;
        if (e.key === 'ArrowRight') keys.ArrowRight = true;
        if (e.key === 'ArrowUp') keys.ArrowUp = true;
        if (e.key === ' ') {
            keys.Space = true;
        }
    }
    
    function gameKeyUp(e) {
        if (e.key === 'ArrowLeft') keys.ArrowLeft = false;
        if (e.key === 'ArrowRight') keys.ArrowRight = false;
        if (e.key === 'ArrowUp') keys.ArrowUp = false;
        if (e.key === ' ') {
            keys.Space = false;
        }
    }
    
    // Adiciona os listeners ao window (capturando apenas durante o jogo)
    window.addEventListener('keydown', gameKeyDown);
    window.addEventListener('keyup', gameKeyUp);
    
    // Fechar modal e limpar tudo
    function fecharJogo() {
        window.removeEventListener('keydown', gameKeyDown);
        window.removeEventListener('keyup', gameKeyUp);
        overlay.remove();
        jogoAberto = false;  // Libera o easter egg novamente
    }
    
    closeBtn.addEventListener('click', fecharJogo);
    
    // Game loop
    function gameLoop() {
        if (!overlay.parentNode) return;
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}
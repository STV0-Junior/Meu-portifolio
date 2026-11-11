// ========== CONTADOR DE VISITAS COM JSONBIN.IO ==========
// ⚠️  CONFIGURE SUAS CREDENCIAIS ANTES DE USAR EM PRODUÇÃO ⚠️
// Copie este arquivo para `contador_de_visitas.config.js` e preencha os valores,
// ou defina as variáveis de ambiente JSONBIN_BIN_ID e JSONBIN_API_KEY.
const BIN_ID  = (typeof JSONBIN_BIN_ID  !== 'undefined' ? JSONBIN_BIN_ID  : 'SEU_BIN_ID_AQUI');
const API_KEY = (typeof JSONBIN_API_KEY !== 'undefined' ? JSONBIN_API_KEY : 'SUA_MASTER_KEY_AQUI');

async function updateVisitCounter() {
  const hasVisited = sessionStorage.getItem('hasVisited');
  
  try {
    // Busca o valor atual
    const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });
    const data = await getResponse.json();
    let currentVisits = data.record.visits || 0;
    
    if (!hasVisited) {
      // Incrementa apenas se não visitou nesta sessão
      currentVisits++;
      
      // Atualiza no servidor
      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify({ visits: currentVisits })
      });
      
      sessionStorage.setItem('hasVisited', 'true');
    }
    
    // Exibe o contador
    const counterElement = document.getElementById('visit-counter');
    if (counterElement) counterElement.textContent = currentVisits;
    
  } catch (error) {
    console.error('Erro no contador de visitas:', error);
    // Fallback: mostra um placeholder
    const counterElement = document.getElementById('visit-counter');
    if (counterElement) counterElement.textContent = '?';
  }
}

// Inicializa o contador quando a página carregar
document.addEventListener('DOMContentLoaded', updateVisitCounter);
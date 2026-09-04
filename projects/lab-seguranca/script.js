const $ = (selector) => document.querySelector(selector);
$('#analyze').addEventListener('click', () => {
  const result = $('#url-result');
  try {
    const url = new URL($('#url').value);
    const checks = [
      ['Protocolo seguro', url.protocol === 'https:' ? 'Sim' : 'Não'],
      ['Domínio', url.hostname],
      ['Porta explícita', url.port || 'Padrão'],
      ['Credenciais na URL', url.username || url.password ? 'Encontradas' : 'Não encontradas'],
    ];
    result.innerHTML = checks.map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join('');
  } catch { result.innerHTML = '<li><strong>Insere uma URL válida, por exemplo https://exemplo.com</strong></li>'; }
});
$('#hash').addEventListener('click', async () => {
  const data = new TextEncoder().encode($('#hash-input').value);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  $('#hash-output').textContent = Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
});
$('#encode').addEventListener('click', () => { $('#base-output').textContent = btoa(unescape(encodeURIComponent($('#base-input').value))); });
$('#decode').addEventListener('click', () => { try { $('#base-output').textContent = decodeURIComponent(escape(atob($('#base-input').value))); } catch { $('#base-output').textContent = 'Base64 inválido.'; } });

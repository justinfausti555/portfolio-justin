# Justin:F05 WebSnapshot

Ferramenta educativa em Python para capturar imagens PNG de páginas web que o utilizador está autorizado a consultar. Usa [Playwright](https://playwright.dev/python/) para automatizar um navegador local e guardar uma imagem da página.

## O que faz

- Abre uma URL `http` ou `https` no Chromium local.
- Captura uma imagem PNG da página visível ou da página inteira.
- Guarda a captura com domínio e data no nome do ficheiro.
- Permite capturar apenas a área visível ou a página inteira.
- Não cria links de controlo, não acede a dispositivos e não funciona como ferramenta de vigilância.

## Instalação

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
```

## Utilização autorizada

```bash
python app.py https://example.com
python app.py https://example.com --pagina-inteira --output capturas
```

Usa apenas URLs próprias ou páginas para as quais tens autorização. A ferramenta captura a página web indicada, não imagens privadas de um telemóvel ou computador.

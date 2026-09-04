"""Justin:F05 WebSnapshot: captura imagens de páginas web autorizadas."""

import argparse
import re
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

def validar_url(valor: str) -> str:
    url = valor.strip()
    partes = urlparse(url)
    if partes.scheme not in {"http", "https"} or not partes.netloc:
        raise argparse.ArgumentTypeError("indica uma URL http:// ou https:// válida")
    return url


def nome_seguro(url: str) -> str:
    dominio = re.sub(r"[^a-zA-Z0-9.-]", "-", urlparse(url).netloc).strip("-")
    data = datetime.now().strftime("%Y%m%d-%H%M%S")
    return f"{dominio or 'pagina'}-{data}.png"


def capturar(url: str, pasta: Path, pagina_inteira: bool) -> Path:
    from playwright.sync_api import sync_playwright

    pasta.mkdir(parents=True, exist_ok=True)
    destino = pasta / nome_seguro(url)
    with sync_playwright() as playwright:
        navegador = playwright.chromium.launch(headless=True)
        pagina = navegador.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        pagina.goto(url, wait_until="networkidle", timeout=30_000)
        pagina.screenshot(path=str(destino), full_page=pagina_inteira)
        navegador.close()
    return destino


def main() -> int:
    parser = argparse.ArgumentParser(description="Captura uma imagem PNG de uma página web autorizada.")
    parser.add_argument("url", type=validar_url, help="URL da página que tens autorização para capturar")
    parser.add_argument("-o", "--output", default="capturas", help="Pasta onde a imagem será guardada")
    parser.add_argument("--pagina-inteira", action="store_true", help="Captura toda a página, não apenas a área visível")
    argumentos = parser.parse_args()
    try:
        destino = capturar(argumentos.url, Path(argumentos.output), argumentos.pagina_inteira)
    except ModuleNotFoundError as erro:
        parser.error("Playwright não está instalado; executa pip install -r requirements.txt")
    except Exception as erro:
        parser.error(f"não foi possível abrir a página: {erro}")
    print(f"Captura guardada em: {destino}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

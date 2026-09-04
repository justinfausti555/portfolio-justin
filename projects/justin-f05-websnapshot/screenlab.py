"""Justin:F05 ScreenLab: captura educativa e consentida do ecrã local."""

import argparse
from datetime import datetime
from pathlib import Path

def capturar_ecra(pasta: Path) -> Path:
    from PIL import ImageGrab

    pasta.mkdir(parents=True, exist_ok=True)
    nome = datetime.now().strftime("ecra-%Y%m%d-%H%M%S.png")
    destino = pasta / nome
    imagem = ImageGrab.grab()
    imagem.save(destino, "PNG")
    return destino


def main() -> int:
    parser = argparse.ArgumentParser(description="Captura educativa do ecrã local com confirmação.")
    parser.add_argument("-o", "--output", default="capturas", help="Pasta onde a imagem será guardada")
    argumentos = parser.parse_args()

    print("Esta ferramenta captura o ecrã deste computador e guarda a imagem localmente.")
    print("Usa-a apenas no teu próprio dispositivo ou com autorização explícita.")
    resposta = input("Escreve CAPTURAR para continuar: ").strip()
    if resposta != "CAPTURAR":
        print("Captura cancelada: confirmação não fornecida.")
        return 0

    try:
        destino = capturar_ecra(Path(argumentos.output))
    except OSError as erro:
        parser.error(f"não foi possível capturar o ecrã neste sistema: {erro}")
    print(f"Imagem guardada em: {destino}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

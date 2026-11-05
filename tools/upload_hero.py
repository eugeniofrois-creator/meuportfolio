#!/usr/bin/env python3
"""Publica imagem de fundo no GitHub via API Contents, sem dependências externas.
Uso: GITHUB_TOKEN=... python tools/upload_hero.py /caminho/ec-background.jpg
O token nunca deve ser salvo no código ou no repositório.
"""
import base64
import json
import os
import pathlib
import sys
import urllib.error
import urllib.request

REPO = "eugeniofrois-creator/meuportfolio"
DEST = "assets/ec-background.jpg"
API = f"https://api.github.com/repos/{REPO}/contents/{DEST}"

def request(method, token, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(
        API, data=data, method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")
        raise RuntimeError(f"GitHub HTTP {exc.code}: {detail[:500]}") from exc

def main():
    if len(sys.argv) != 2:
        raise SystemExit("Uso: python tools/upload_hero.py caminho/ec-background.jpg")
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise SystemExit("Defina GITHUB_TOKEN no ambiente (nunca no arquivo).")
    path = pathlib.Path(sys.argv[1])
    if not path.is_file():
        raise SystemExit(f"Arquivo não encontrado: {path}")
    raw = path.read_bytes()
    if not raw.startswith(bytes.fromhex("ffd8ff")):
        raise SystemExit("Arquivo precisa ser JPEG válido.")
    try:
        existing = request("GET", token)
        sha = existing.get("sha")
    except RuntimeError as exc:
        if "HTTP 404" not in str(exc):
            raise
        sha = None
    payload = {
        "message": "Publica fotografia real do hero do portfolio",
        "content": base64.b64encode(raw).decode("ascii"),
        "branch": "main",
    }
    if sha:
        payload["sha"] = sha
    result = request("PUT", token, payload)
    print("Imagem publicada:", result["content"]["html_url"])
    print("Site:", "https://eugeniofrois-creator.github.io/meuportfolio/")

if __name__ == "__main__":
    main()

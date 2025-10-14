#!/bin/bash
set -euo pipefail

# Setup script for Python dependencies

echo "Setting up Python virtual environment..."

# Navigate to scripts directory
cd "$(dirname "$0")"

# Choose Python (prefer Homebrew 3.13 absolute path, then fall back)
PYTHON_BIN="${PYTHON_BIN:-/opt/homebrew/opt/python@3.13/bin/python3.13}"
if [ ! -x "$PYTHON_BIN" ]; then
  PYTHON_BIN="$(command -v /opt/homebrew/opt/python@3.13/libexec/bin/python3 || true)"
fi
if [ -z "${PYTHON_BIN}" ]; then
  PYTHON_BIN="$(command -v python3)"
fi

echo "Using Python: $($PYTHON_BIN -V)"

# Recreate venv if missing or not on Python 3.13
if [ -d "venv" ] && [ -x "venv/bin/python" ]; then
  VENV_VER="$(venv/bin/python -c 'import sys; print(".".join(map(str, sys.version_info[:2])))' || true)"
else
  VENV_VER=""
fi

if [ ! -d "venv" ] || [ "$VENV_VER" != "3.13" ]; then
  if [ -d "venv" ]; then
    echo "Existing venv uses Python ${VENV_VER:-unknown}; recreating with Python 3.13..."
    rm -rf venv
  else
    echo "Creating virtual environment..."
  fi
  "$PYTHON_BIN" -m venv venv
else
  echo "Virtual environment already exists with Python 3.13"
fi

# Activate virtual environment
# shellcheck disable=SC1091
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install requirements
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Install Playwright browsers for Python (idempotent)
echo "Installing Playwright browsers for Python..."
python -m playwright install

# Trust direnv and ensure shell hook (zsh) for this repo, if available
REPO_ROOT="$(cd .. && pwd)"
if command -v direnv >/dev/null 2>&1 && [ -f "$REPO_ROOT/.envrc" ]; then
  # Add zsh hook once
  if ! grep -q "direnv hook zsh" "$HOME/.zshrc" 2>/dev/null; then
    echo 'eval "$(direnv hook zsh)"' >> "$HOME/.zshrc"
  fi
  # Trust this repo
  (cd "$REPO_ROOT" && direnv allow . || true)
fi

# Ensure docs.local host mapping (macOS)
echo "Ensuring docs.local host entry..."
if ! grep -E '^[^#]*\b127\.0\.0\.1\b.*\bdocs\.local\b' /etc/hosts >/dev/null 2>&1; then
  if sudo -n true 2>/dev/null; then
    echo "Adding docs.local to /etc/hosts (sudo)..."
    printf "\n127.0.0.1 docs.local\n" | sudo tee -a /etc/hosts >/dev/null || true
  else
    echo "Could not add docs.local without sudo. To add manually, run:"
    echo "  echo '127.0.0.1 docs.local' | sudo tee -a /etc/hosts"
  fi
else
  echo "docs.local already present in /etc/hosts"
fi
# Optionally add IPv6 localhost mapping
if ! grep -E '^[^#]*\b::1\b.*\bdocs\.local\b' /etc/hosts >/dev/null 2>&1; then
  if sudo -n true 2>/dev/null; then
    printf "::1 docs.local\n" | sudo tee -a /etc/hosts >/dev/null || true
  fi
fi

echo "Setup complete!"
echo ""
echo "To activate the virtual environment manually, run:"
echo "  source $(pwd)/venv/bin/activate"

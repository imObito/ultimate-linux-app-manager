#!/usr/bin/env bash
# Launch XENO Uninstaller (Native Linux Desktop Application)
set -e
cd "$(dirname "$0")"
python3 main.py "$@"

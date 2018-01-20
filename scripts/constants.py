#!/usr/bin/env python

import os

__file_dir = os.path.dirname(os.path.realpath(__file__))

DEVELOPMENT = 'development'
PRODUCTION = 'production'

PROJECT_ROOT = os.path.realpath(os.path.join(__file_dir, '../'))
DIST_DIR = os.path.join(PROJECT_ROOT, 'dist')
HTML_DIR = os.path.join(PROJECT_ROOT, 'html')
IMAGES_DIR = os.path.join(PROJECT_ROOT, 'images')
SCRIPTS_DIR = os.path.join(PROJECT_ROOT, 'scripts')

PACKAGE_FILE = os.path.join(PROJECT_ROOT, 'package.json')

NODE_MODULES_BIN = os.path.join(PROJECT_ROOT, 'node_modules', '.bin')
WEBPACK_BIN = os.path.join(NODE_MODULES_BIN, 'webpack')

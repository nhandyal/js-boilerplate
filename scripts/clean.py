#!/usr/bin/env python

import os
import shutil

from constants import DIST_DIR


def main():
    shutil.rmtree(DIST_DIR, ignore_errors=True)

if __name__ == '__main__':
    main()

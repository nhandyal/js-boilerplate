#!/usr/bin/env python

import os
import shutil

from constants import DIST_DIR, HTML_DIR, IMAGES_DIR


def main():
    directories = [
        {
            'src': HTML_DIR,
            'target': os.path.join(DIST_DIR, 'html')
        },
        {
            'src': IMAGES_DIR,
            'target': os.path.join(DIST_DIR, 'images')
        }
    ]
    

    for d in directories:
        shutil.rmtree(d['target'], ignore_errors=True)
        shutil.copytree(d['src'], d['target'])

if __name__ == '__main__':
    main()

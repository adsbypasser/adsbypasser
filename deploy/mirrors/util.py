import os
import json


def to_abs_path(relative_path):
    abs_path = os.path.abspath(__file__)
    csd = os.path.dirname(abs_path)
    path = os.path.join(csd, relative_path)
    return path


def read_config():
    path = to_abs_path('../../.deploy.json')
    with open(path, 'r') as fin:
        data = json.load(fin)
    return data

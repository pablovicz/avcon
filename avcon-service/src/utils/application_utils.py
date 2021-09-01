import os
from pathlib import Path


def get_ffmpeg_path():
    ffmpeg = find_ffmpeg_in_system("ffmpeg")
    if ffmpeg is None:
        ffmpeg = get_ffmpeg_local_path()
    return ffmpeg

def find_ffmpeg_in_system(program):
    if os.name == "nt" and not program.endswith(".exe"):
        program += ".exe"
    envdir_list = [os.curdir] + os.environ["PATH"].split(os.pathsep)
    for envdir in envdir_list:
        program_path = os.path.join(envdir, program)
        if os.path.isfile(program_path) and os.access(program_path, os.X_OK):
            return program_path

def get_file_path(filename):
    return str(Path(__file__).parents[2].joinpath('temp').joinpath(filename))


def get_temp_path():
    return str(Path(__file__).parents[2].joinpath('temp'))


def get_ffmpeg_local_path():
    return str(Path(__file__).parents[2].joinpath('ffmpeg').joinpath('ffmpeg.exe'))

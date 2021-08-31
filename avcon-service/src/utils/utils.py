import os
from pathlib import Path


def get_ffmpeg_path():
    ffmpeg = which("ffmpeg")
    if ffmpeg is None:
        #raise Exception("Ffmpeg is not installed! Please install it and set its directory in Path variable.")
        ffmpeg = get_ffmpeg_local_path()
    return ffmpeg


def which(program):
    """
    Mimics behavior of UNIX which command.
    """
    # Add .exe program extension for windows support
    if os.name == "nt" and not program.endswith(".exe"):
        program += ".exe"

    envdir_list = [os.curdir] + os.environ["PATH"].split(os.pathsep)

    for envdir in envdir_list:
        program_path = os.path.join(envdir, program)
        if os.path.isfile(program_path) and os.access(program_path, os.X_OK):
            return program_path


def get_file_path(filename):
    return str(Path(__file__).parents[2].joinpath('temp').joinpath(filename))


def get_ffmpeg_local_path():
    return str(Path(__file__).parents[2].joinpath('ffmpeg').joinpath('ffmpeg.exe'))



if __name__ == '__main__':
    teste = get_ffmpeg_path()
    print(teste)



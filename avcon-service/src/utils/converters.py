import src.utils.application_utils as ut
from src.utils.ffmpeg_utils import FfmpegCommandBuilder

from pydub import AudioSegment
import os
import time


class AudioMediaConverter:

    def __init__(self, source, target):
        ffmpeg_dir = ut.get_ffmpeg_path()
        AudioSegment.converter = ffmpeg_dir
        AudioSegment.ffmpeg = ffmpeg_dir
        AudioSegment.ffprobe = ffmpeg_dir
        self.__source_ext = source.lower()
        self.__target_ext = target.lower()
        self.__source_full_path = ut.get_file_path(f'source.{self.__source_ext}')
        self.__target_full_path = ut.get_file_path(f'converted.{self.__target_ext}')
        self.__source_is_supported = self.__source_ext.upper() in list(ut.ALLOWED_EXTENSIONS)
        self.__target_is_supported = self.__target_ext.upper() in ["MP3", "WAV", "OGG", "FLAC", "AC3"]

    def convert(self):
        if self.__source_is_supported and self.__target_is_supported:
            print(f'FROM: {self.__source_ext.upper()} | TO: {self.__target_ext}')
            song = AudioSegment.from_file(file=self.__source_full_path, format=self.__source_ext)
            song.export(self.__target_full_path, format=self.__target_ext)
            while not os.path.exists(self.__target_full_path):
                time.sleep(0.5)
            return self.__target_full_path
        else:
            message = ("Target Extension Not Supported"
                       if self.__source_is_supported else "Source Extension Not Supported")
            raise Exception(message)


class VideoMediaConverter:

    def __init__(self, source, target):
        self.__source_ext = source.lower()
        self.__target_ext = target.lower()
        self.__source_full_path = ut.get_file_path(f'source.{self.__source_ext}')
        self.__target_full_path = ut.get_file_path(f'converted.{self.__target_ext}')
        self.__supported_extensions = ["MP4", "AVI", "WMV",  "MOV", "MKV"]
        self.__source_is_supported = self.__source_ext.upper() in self.__supported_extensions
        self.__target_is_supported = self.__target_ext.upper() in self.__supported_extensions

    def convert(self):
        if self.__source_is_supported and self.__target_is_supported:
            command = FfmpegCommandBuilder(self.__source_ext, self.__target_ext).build()
            os.system(command)
            while not os.path.exists(self.__target_full_path):
                time.sleep(0.5)
            return self.__target_full_path
        else:
            message = ("Target Extension Not Supported"
                       if self.__source_is_supported else "Source Extension Not Supported")
            raise Exception(message)

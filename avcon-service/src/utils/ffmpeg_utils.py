import src.utils.application_utils as ut


class FfmpegCommandBuilder:

    def __init__(self, source, target):
        self.__source = source.lower()
        self.__target = target.lower()
        self.__source_full_path = f"""{ut.get_file_path('source')}.{self.__source}"""
        self.__target_full_path = f"""{ut.get_file_path('converted')}.{self.__target}"""

        self.__ffmpeg_cmd = ut.get_ffmpeg_path()
        self.__codec_video = '-c:v libx264'
        self.__crf = '-crf 19'
        self.__preset = '-preset fast'
        self.__codec_audio = '-c:a aac'
        self.__bitrate_audio = '-b:a 320k'
        self.__debug = ''

    def codec_video(self, codec):
        self.__codec_video = f'-c:v {str(codec).lower()}'
        return self

    def codec_audio(self, codec):
        self.__codec_audio = f'-c:a {str(codec).lower()}'
        return self

    def crf(self, crf):
        self.__crf = f'-crf {str(crf)}'
        return self

    def preset(self, preset):
        self.__preset = f'-preset {str(preset).lower()}'
        return self

    def audio_bit_rate(self, bit_rate):
        self.__bitrate_audio = f'-b:a {str(bit_rate)}k'
        return self

    def build(self):
        return f'{self.__ffmpeg_cmd} -i "{self.__source_full_path}" {self.__codec_video} {self.__crf} {self.__preset} ' \
               f'{self.__codec_audio} {self.__bitrate_audio} {self.__debug} "{self.__target_full_path}"'

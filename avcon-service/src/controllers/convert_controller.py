from src.utils.converters import AudioMediaConverter, VideoMediaConverter
import src.utils.application_utils as ut

from flask import make_response
from werkzeug.utils import secure_filename
import base64
import shutil
import time
import os


class ConvertController:

    def __init__(self, request):
        self.__media_type = request.form.get("media_type")
        self.__source = request.form.get("source")
        self.__target = request.form.get("target")

        self.__file = request.files['file']
        self.__original_filename = request.form.get("filename")
        self.__filename = secure_filename(self.__original_filename)
        self.__source_full_path = f'{ut.get_file_path("source")}.{self.__source}'
        self.__converted_full_path = f'{ut.get_file_path("converted")}.{self.__target}'
        self.__create_temp_path()

    def execute(self):
        self.__download_request_file()
        self.__convert()

    def __convert(self):
        if self.__media_type == 'audio':
            AudioMediaConverter(self.__source, self.__target).convert()
        if self.__media_type == 'video' and self.__target.upper() in ["MP3", "WAV", "OGG", "FLAC", "AC3"]:
            AudioMediaConverter(self.__source, self.__target).convert()
        if self.__media_type == 'video' and self.__target.upper() in ["MP4", "MPEG", "FLV", "AVI", "MOV", "MKV"]:
            VideoMediaConverter(self.__source, self.__target).convert()

    def get_response(self):
        response = None
        if os.path.exists(self.__converted_full_path):
            response = make_response()
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.set('Content-Type', f'application/octet-stream')
            response.headers['filename'] = f'{self.__filename.split(".")[0]}.{self.__target}'
            response.data = self.__codec_file()
        self.__clean_temp_path()
        return response

    def __download_request_file(self):
        if self.__file and self.__allowed_file(self.__original_filename):
            self.__file.save(self.__source_full_path)
            while not os.path.exists(self.__source_full_path):
                time.sleep(0.5)

    def __codec_file(self):
        with open(self.__converted_full_path, 'rb') as fh:
            return base64.b64encode(fh.read())

    @staticmethod
    def __create_temp_path():
        if not os.path.exists(ut.get_temp_path()):
            os.system(f'mkdir {ut.get_temp_path()}')

    @staticmethod
    def __clean_temp_path():
        shutil.rmtree(ut.get_temp_path())

    @staticmethod
    def __allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].upper() in ut.ALLOWED_EXTENSIONS

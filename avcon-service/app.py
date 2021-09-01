from src.controllers.convert_controller import ConvertController
import src.utils.application_utils as ut

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, support_credentials=True)
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = ut.get_temp_path()
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000


@app.route('/convert', methods=['POST'])
def convert():
    if request.method == 'POST':
        cc = ConvertController(request)
        cc.execute()
        return cc.get_response()


app.run()

import json

class ResponseParser:

    @staticmethod
    def parse(response : str):
        return json.loads(response)
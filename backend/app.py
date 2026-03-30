from flask import Flask,request,jsonify
from flask_cors import CORS

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
app = Flask(__name__)
CORS(app)
@app.route("/analyze",methods=["POST"])
def analyze():

    try:

        data=request.json

        key=data["key"]

        endpoint=data["endpoint"]

        review=data["review"]

        client=TextAnalyticsClient(

        endpoint=endpoint,

        credential=AzureKeyCredential(key)

        )

        sentiment=client.analyze_sentiment([review])[0]

        phrases=client.extract_key_phrases([review])[0]

        return jsonify({

        "sentiment":sentiment.sentiment,

        "positive":
        round(sentiment.confidence_scores.positive*100,2),

        "neutral":
        round(sentiment.confidence_scores.neutral*100,2),

        "negative":
        round(sentiment.confidence_scores.negative*100,2),

        "phrases":
        phrases.key_phrases

        })

    except Exception as e:

        return jsonify({

        "error":str(e)

        })

if __name__=="__main__":

    app.run()
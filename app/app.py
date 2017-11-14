from flask import Flask, render_template, url_for, request, jsonify
import requests

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():

	if request.method == 'POST':
		# Grabbing user input
		language = str(request.form.get('first'))
		location = str(request.form.get('second'))

		# Making API call
		url = "https://api.github.com/search/users?q=location:{}+language:{}".format(location, language)
		try:
			response_dictionary = requests.get(url).json() 
			return jsonify(response_dictionary)
		except:
			return jsonify({"error", "Couldnt find a match for your query!!"}), 500
	return render_template('index.html')



if __name__ == '__main__':
	app.run(debug=True)
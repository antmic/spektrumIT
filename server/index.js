const cors = require('cors');
const express = require('express');
const app = express();
const router = express.Router();
app.use(cors());
const port = process.env.PORT || 3002;

//--------------------------------------------------------------------------------------
//MONGO

const { MongoClient, ObjectId } = require('mongodb');

// uri string is MongoDB deployment's connection string.
const uri = 'mongodb+srv://User:UserPassword@cluster0.xaouujf.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function addToDB(data) {
	try {
		console.log('data is ', data);
		await client.connect();
		const collection = client.db('testDB').collection('SpektrumIT');
		await collection.insertOne({
			form: {
				login: data.form.login,
				password: data.form.password,
				email: data.form.email,
				phone: data.form.phone,
				accept: data.form.accept,
			},
			star_wars_data: data.sw,
		});
	} finally {
		client.close();
	}
}

//--------------------------------------------------------------------------------------
//POST request

app.use(express.json());

app.post('/register', (req, res) => {
	async function postConfirm() {
		const confirmMessage = { message: 'data received' };
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.json(confirmMessage);
	}
	postConfirm();
	if (req.body.length != 0) {
		addToDB(req.body);
	}
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});

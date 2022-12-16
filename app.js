import express from 'express'
import bodyParser from 'body-parser'
import { deleteMood, getMoods, updateMood, seedDatabase, insertMood } from './database.js'

const app = express();

app.use(express.static('dist')) // a request that comes in to /
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/** ROUTES */
app.get("/", async (req, res) => {
	res.send(`index`)
})

// call this route to seed the database
app.put("/api/seed", (req, res) => {
	try {
		seedDatabase()
		res.send('database seeded')
	} catch (err) { 
		console.error(err)
	}
})


// returns all moods
app.get("/api/moods", async (req, res) => {
	try {
		const moods = await getMoods();

		if (moods.length == 0 && Array.isArray(moods)) {
			res.status(404).send({ error: "there are no moods to get" })
			return;
		}

		res.send(moods);
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: `cannot get all moods` });
	}
})


// creates a new mood
app.post("/api/moods", async (req, res) => {
	// id notes rating created
	try {
		const { notes, rating } = req.body; 
		await insertMood(notes, rating);
		res.status(200).send({success: true, message: "mood created successfully" });

	} catch(error) {
		console.error(error);
		res.status(500).send({ error: `cannot post new mood` });
	}
})


// updates a mood
app.put("/api/moods/:id", async (req, res) => {
	const id = req.params.id;
	const { notes, rating } = req.body;

	try {
		await updateMood(notes, rating, id);
		res.status(200).send({ message: "mood updated successfully" });
	} catch(error) {
		console.error(error);
		res.status(500).send({ error: `cannot update mood` });
	}
})


// deletes a mood
app.delete("/api/moods/:id", async (req, res) => {
	try {
		await deleteMood(req.params.id);
		res.status(200).send({success: true});

	} catch (error) {
		console.error(error);
		res.status(500).send({ error: 'cannot delete the mood' });
		return
	}
})


// General error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('something broke');
})



app.listen(8080, () => {
	console.log(`server is running on http://localhost:8080`);
})
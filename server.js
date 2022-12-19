import app from './app.js';

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`server is running: http://localhost:${port}`);
})

import app from '@src/app';
// Take a port 3000 for running server.
const port: string | number = process.env.PORT || 3000;
// Server setup
app.listen(port, (): void => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});

const bootstrap = async () => {
  await import("./server.js");
};

bootstrap().catch((error) => {
  // logger.error(error);
  console.error(error);
  process.exit(1);
});

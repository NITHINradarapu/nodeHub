const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const stagedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitID = uuidv4();
    const commitDir = path.join(commitPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    const files = await fs.readdir(stagedPath);
    for (const file of files) {
      const srcPath = path.join(stagedPath, file);
      const destPath = path.join(commitDir, file);
      await fs.copyFile(srcPath, destPath);
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitID} created with message ${message}`);
  } catch (err) {
    console.error("Error committing file: ", err);
  }
}

module.exports = { commitRepo };

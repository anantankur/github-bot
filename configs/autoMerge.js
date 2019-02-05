

  module.exports = shouldMerge = async (context, app) => {
    const files = await context.github.pullRequests.listFiles(context.issue())
    const data = files.data[0]
    console.log(data.filename, data.status, data.additions, data.deletions, data.changes)
  
    if(data.filename === "readme.md") mergePull(context, app)
    if(data.filename === "contributors.md" && data.additions < 5 && data.deletions < 3) mergePull(context, app)
  
    const issueComment = context.issue({ body: 'Thanks for opening this pull request!' });
    return context.github.issues.createComment(issueComment);
  }

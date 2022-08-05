console.log(process.argv)
const { program } = require('commander');
const { Octokit } = require('octokit')

const octokit = new Octokit({auth: ProcessingInstruction.env.GitHuc_Access_PToken})

program
  .command('me')
  .description('Check my Profile')
  .action(async () => {
    const {
      data: { login }
    } = await octokit.rest.users.getAuthenticated()
    console.log(`${login}`)
  })


program
  .command('list-bugs')
  .description('List issuses with bug label')
  .action(async () => {

    const result = await octokit.rest.issues.listForRepo({
      owner: 'inho9377',
      repo: 'reponame'
    })

    console.log(`List bugs! ${result}`)
  })

program
  .command('check-prs')
  .description('Check pull')
  .action(async () => {
    console.log('check prs')
  })

program.parseAsync();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
import { argv } from 'node:process'

function main() {
    if (argv.length < 3) {
        console.log("not enough args")
    }
    if (argv.length > 3) {
        console.log("too many args")
    }
    const baseURL = argv[2]

    console.log(`starting crawl of: ${baseURL}...`)
}

main()

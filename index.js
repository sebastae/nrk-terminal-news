const EventSource = require("eventsource")

const es = new EventSource("https://nrkno-ssenotifier.nrk.no/sse/newsfeed")
let lastID = 0

const MAX_LEAD_LENGTH = process.env.NEWS_MAX_LEAD || 100;
const FIRST_LINE = process.env.NEWS_STOP_ON_NEWLINE || false;

function trim(str){
    if(MAX_LEAD_LENGTH != -1){
        if(FIRST_LINE){
            const index = str.indexOf("\n");
            return (index != -1 && index < MAX_LEAD_LENGTH) ? str.substring(0,index) : str.length > MAX_LEAD_LENGTH ? str.substring(0, MAX_LEAD_LENGTH)  + "..." : str
        } else {
            return str.length > MAX_LEAD_LENGTH ? str.substring(0, MAX_LEAD_LENGTH) + "..." : str
        }
    }
    return str
}

function receive(message){
    if(message.type == "message"){
        const data = JSON.parse(message.data);
        const messages = data.messages.reverse();
        messages.forEach(msg => {
            if(Number(msg.id.split(".")[1]) > lastID){
                lastID = msg.id.split(".")[1]
                const lead = trim(msg.lead)
                if(msg.emphasis){
                    console.log(`\x1b[31m${msg.time} - ${msg.title} - ${lead}\x1b[0m`)
                } else {
                    console.log(`${msg.time} - ${msg.title} - ${lead}`)
                }
            }
        }) 
    }
}

es.onmessage = receive




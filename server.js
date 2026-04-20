 import "dotenv/config"
import app from "./src/app.js";
import connectBD from './src/common/config/db.js'
const PORT =process.env.PORT || 5000
function main(){
    connectBD()
    const start=async()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    })
}

start().catch((error)=>{
    console.error(`server is not running beacause of ${error.message}`)
})
}
main() 
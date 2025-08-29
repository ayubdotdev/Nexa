import express from 'express'
import { ENV } from './config/env.js'
import { connectDB } from './config/db.js'
import { clerkMiddleware } from "@clerk/express"
import { functions, inngest } from './config/index.js'
import { serve } from "inngest/express";

const app = express()

app.use(express.json()) //req.body will availabl;e
app.use(clerkMiddleware()) // req.auth will available by this 

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
    res.send("Hello World 123!")
})

//deplowying api
const startServer = async () => {
    //only in devment
    try {
        await connectDB()
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log("Server running on :", ENV.PORT)
            })
        }
    } catch (error) {
        console.error("Error starting server", error)
        process.exit(1)
    }
}
startServer()

export default app
const express = require("express");
const cors = require("cors");

const { analyzeCode } = require("../analyzer/analyzer");
const { getAIAnalysis } = require("../analyzer/ai");

const app = express();


// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());

app.use(express.json());


// ============================================
// ANALYZE CODE
// ============================================

app.post("/analyze", async (req, res) => {

    try {

        const { code } = req.body;


        console.log("");
        console.log("==============================");
        console.log("🌱 SYNTAXX CODE ANALYSIS");
        console.log("==============================");


        // Check code

        if (!code || !code.trim()) {

            return res.status(400).json({
                error: "No code provided",
            });

        }


        console.log("🔍 Code received:");
        console.log(code);


        // ============================================
        // RUN YOUR REAL ANALYZER
        // ============================================

        const analysis =
            analyzeCode(code);


        console.log("");
        console.log("📊 Analyzer result:");
        console.log(analysis);


        let aiResult = null;


        // ============================================
        // CALL GEMINI ONLY IF INEFFICIENCY FOUND
        // ============================================

        if (analysis.nestedLoops > 0) {

            console.log("");
            console.log(
                "🤖 Sending code to Gemini..."
            );


            aiResult =
                await getAIAnalysis(code);


            console.log(
                "🤖 Gemini response received!"
            );

        }


        // ============================================
        // SEND RESULT TO FRONTEND
        // ============================================

        res.json({

            analysis: analysis,

            aiResult: aiResult,

        });


    } catch (error) {

        console.error("");
        console.error(
            "❌ SyntaxX Error:"
        );

        console.error(error);


        res.status(500).json({

            error:
                error.message ||
                "Something went wrong",

        });

    }

});


// ============================================
// TEST ROUTE
// ============================================

app.get("/", (req, res) => {

    res.send(
        "🌱 SyntaxX backend is running!"
    );

});


// ============================================
// START SERVER
// ============================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `🌱 SyntaxX backend running on http://localhost:${PORT}`
    );

});
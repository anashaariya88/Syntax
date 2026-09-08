const { analyzeCode } = require("./analyzer");
const { getAIAnalysis } = require("./ai");

async function runSyntaxX() {

    const code = `
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        console.log(i + j);
    }
}
`;

    console.log("\n🌱 =============================");
    console.log("       SYNTAXX GREEN CODING");
    console.log("=============================\n");

    console.log("🔍 Analyzing code...");

    const analysis = analyzeCode(code);

    console.log("\n" + analysis.message);

    if (analysis.nestedLoops > 0) {

        console.log("\n🤖 Asking SyntaxX AI...\n");

        const aiResult = await getAIAnalysis(code);

        console.log(aiResult);

        console.log("\n🌍 ECO POINTS: +50");
        console.log("🌳 Earth Level: Growing");
        console.log("\n✅ Optimization accepted!");
    }
}

runSyntaxX().catch(error => {
    console.error("❌ SyntaxX Error:", error.message);
});
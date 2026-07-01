const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const recruitHtmlPath = path.join(rootDir, "pages", "recruit.html");
const recruitDataPath = path.join(rootDir, "js", "data", "recruit-page.js");

const recruitHtml = fs.readFileSync(recruitHtmlPath, "utf8");

assert(
    recruitHtml.includes('<script src="../js/setsidemenu.js"></script>'),
    "recruit.html should use the shared side menu behavior"
);
assert(
    recruitHtml.includes('<script src="../js/data/recruit-page.js"></script>'),
    "recruit.html should load recruit-page.js"
);
assert(
    recruitHtml.includes('id="recruit-position-menu"'),
    "recruit.html should provide a position menu render target"
);
assert(
    recruitHtml.includes('id="recruit-position-detail"'),
    "recruit.html should provide a position detail render target"
);

const recruitData = fs.readFileSync(recruitDataPath, "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(recruitData, sandbox);

assert(Array.isArray(sandbox.recruitPositions), "recruitPositions should be an array");
assert.strictEqual(sandbox.recruitPositions.length, 3, "recruitPositions should contain three active positions");

["C#开发工程师", "Android开发工程师", "Web开发工程师"].forEach(function(title) {
    assert(
        sandbox.recruitPositions.some(function(position) {
            return position.title === title;
        }),
        "recruitPositions should include " + title
    );
});

sandbox.recruitPositions.forEach(function(position) {
    assert(position.location, position.title + " should have a location");
    assert(position.department, position.title + " should have a department");
    assert(position.headcount, position.title + " should have a headcount");
    assert(Array.isArray(position.description), position.title + " should have description items");
    assert(Array.isArray(position.requirements), position.title + " should have requirement items");
});

assert.strictEqual(typeof sandbox.renderRecruitPage, "function", "renderRecruitPage should be defined");

console.log("recruit page checks passed");

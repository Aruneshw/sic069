var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
var supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}
var WOM_INSIGHTS_DB = [
    {
        locationName: "Kodaikanal",
        type: "BEST_TIME", title: "Go before 8 AM for mist-free views",
        content: "The famous viewpoints are completely fogged over between 8:30-10:30 AM most mornings. Either go at dawn or wait until late afternoon when the mist lifts.",
        confidenceScore: 94, source: "VERIFIED_LOCAL",
    },
    {
        locationName: "Kodaikanal",
        type: "TOURIST_MISTAKE", title: "Don't try all 6 viewpoints in one day",
        content: "Many first-time visitors try to cover all viewpoints in one afternoon. Pick 2 viewpoints + 1 local experience instead. You'll enjoy it much more.",
        confidenceScore: 89, source: "TRAVELER_EXPERIENCE",
    },
    {
        locationName: "Kodaikanal",
        type: "COST_REALITY", title: "Budget ₹800-1200 extra beyond package",
        content: "Entry fees, local transport between viewpoints, and snacks add up. Carry ₹800-1200 extra cash. Most small shops don't accept UPI.",
        confidenceScore: 91, source: "TOUR_OPERATOR",
    },
    {
        locationName: "Kodaikanal",
        type: "LOCAL_FOOD", title: "Skip Coaker's Walk restaurants",
        content: "The restaurants on Coaker's Walk are overpriced and mediocre. Walk 10 minutes to PT Road for authentic local meals at half the price.",
        confidenceScore: 92, source: "VERIFIED_LOCAL",
    },
    {
        locationName: "Wayanad",
        type: "BEST_TIME", title: "Edakkal Caves: Start at 8:30 AM sharp",
        content: "The 300-step climb gets brutally hot after 10 AM. Start at 8:30 AM opening time. You'll finish the climb in cool shade and avoid the tourist bus crowds.",
        confidenceScore: 95, source: "OFFICIAL_SOURCE",
    },
    {
        locationName: "Wayanad",
        type: "HIDDEN_GEM", title: "Phantom Rock at golden hour",
        content: "Most tourists miss Phantom Rock entirely. It's a 15-minute detour off the main road. Visit at 4:30 PM for spectacular golden-hour lighting.",
        confidenceScore: 86, source: "TRAVELER_EXPERIENCE",
    },
    {
        locationName: "Ooty",
        type: "CROWD", title: "Botanical Garden: Avoid weekends entirely",
        content: "Weekend crowds at the Botanical Garden make it nearly impossible to enjoy. Weekday mornings are 70% quieter. If you must go on weekends, arrive at 7 AM.",
        confidenceScore: 93, source: "COMMUNITY_OBSERVATION",
    },
    {
        locationName: "Ooty",
        type: "BETTER_ALTERNATIVE", title: "Skip Rose Garden → Go to Tea Museum",
        content: "The Rose Garden is underwhelming for the entry price. The Tea Museum is cheaper, less crowded, and includes a free tasting. Much better use of 2 hours.",
        confidenceScore: 88, source: "TRAVELER_EXPERIENCE",
    },
    {
        locationName: "Varkala",
        type: "SAFETY_NOTE", title: "Strong undercurrents south of cliff",
        content: "The beaches south of the main cliff have deceptively strong undercurrents. Swim only in the flagged zones near the lifeguard station. Multiple incidents reported annually.",
        confidenceScore: 97, source: "OFFICIAL_SOURCE",
    },
    {
        locationName: "Varkala",
        type: "LOCAL_EXPERIENCE", title: "Papanasam temple ritual at sunrise",
        content: "Join the morning ritual bath at Papanasam Beach temple at 6 AM. It's a deeply authentic cultural experience that most tourists miss entirely.",
        confidenceScore: 85, source: "VERIFIED_LOCAL",
    },
    {
        locationName: "Munnar",
        type: "WEATHER_CONTEXT", title: "Fog makes driving dangerous after 4 PM",
        content: "Munnar's mountain roads get extremely foggy after 4 PM. Plan your return drives to finish before 3:30 PM. Visibility drops to under 10 meters on hairpin bends.",
        confidenceScore: 96, source: "TOUR_OPERATOR",
    },
    {
        locationName: "Munnar",
        type: "VALUE_FOR_MONEY", title: "Tea plantation visit is genuinely worth it",
        content: "Unlike many tourist traps, the Kolukkumalai tea estate visit (₹300) is genuinely worth every rupee. The jeep ride, sunrise view, and factory tour are authentic.",
        confidenceScore: 94, source: "TRAVELER_EXPERIENCE",
    }
];
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, WOM_INSIGHTS_DB_1, insight, res, errorText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Seeding WoM insights into Supabase...");
                    _i = 0, WOM_INSIGHTS_DB_1 = WOM_INSIGHTS_DB;
                    _a.label = 1;
                case 1:
                    if (!(_i < WOM_INSIGHTS_DB_1.length)) return [3 /*break*/, 6];
                    insight = WOM_INSIGHTS_DB_1[_i];
                    return [4 /*yield*/, fetch("".concat(supabaseUrl, "/rest/v1/LocalInsight"), {
                            method: 'POST',
                            headers: {
                                'apikey': supabaseKey,
                                'Authorization': "Bearer ".concat(supabaseKey),
                                'Content-Type': 'application/json',
                                'Prefer': 'return=representation'
                            },
                            body: JSON.stringify(insight)
                        })];
                case 2:
                    res = _a.sent();
                    if (!!res.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, res.text()];
                case 3:
                    errorText = _a.sent();
                    console.error("Error inserting ".concat(insight.title, ":"), errorText);
                    return [3 /*break*/, 5];
                case 4:
                    console.log("Inserted: ".concat(insight.title));
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log("Done seeding.");
                    return [2 /*return*/];
            }
        });
    });
}
seed();

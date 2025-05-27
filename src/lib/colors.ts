// Bricklink color 
interface BrickColor {  
    bricklinkColorName: string;
    hexCode: string;
    bricklinkColorId: number;
    semanticThemes: string[];
}

const colors: BrickColor[] = [
    {
        bricklinkColorName: "White",
        hexCode: "#FFFFFF",
        bricklinkColorId: 1,
        semanticThemes: ["Pure", "Clean", "Snow", "Cloud", "Minimal", "Modern", "Light", "Bright", "Basic"]
    },
    {
        bricklinkColorName: "Very Light Gray",
        hexCode: "#E0E0E0",
        bricklinkColorId: 49,
        semanticThemes: ["Light", "Neutral", "Stone", "Cloud", "Minimal", "Modern", "Subtle", "Soft"]
    },
    {
        bricklinkColorName: "Very Light Bluish Gray",
        hexCode: "#E6E3E0",
        bricklinkColorId: 99,
        semanticThemes: ["Modern", "Clean", "Neutral", "Subtle", "Contemporary", "Architectural", "Light", "Cool"]
    },
    {
        bricklinkColorName: "Light Bluish Gray",
        hexCode: "#A0A5A9",
        bricklinkColorId: 86,
        semanticThemes: ["Industrial", "Modern", "Neutral", "Urban", "Tech", "Professional", "Balanced", "Cool"]
    },
    {
        bricklinkColorName: "Light Gray",
        hexCode: "#9BA19D",
        bricklinkColorId: 9,
        semanticThemes: ["Neutral", "Stone", "Concrete", "Modern", "Basic", "Clean", "Urban", "Balanced"]
    },
    {
        bricklinkColorName: "Dark Gray",
        hexCode: "#6C6E68",
        bricklinkColorId: 10,
        semanticThemes: ["Stone", "Industrial", "Urban", "Serious", "Strong", "Classic", "Solid", "Professional"]
    },
    {
        bricklinkColorName: "Dark Bluish Gray",
        hexCode: "#595761",
        bricklinkColorId: 85,
        semanticThemes: ["Industrial", "Modern", "Serious", "Urban", "Tech", "Professional", "Strong", "Deep"]
    },
    {
        bricklinkColorName: "Black",
        hexCode: "#1B2A34",
        bricklinkColorId: 11,
        semanticThemes: ["Classic", "Elegant", "Dark", "Sophisticated", "Strong", "Dramatic", "Basic", "Power"]
    },
    {
        bricklinkColorName: "Dark Red",
        hexCode: "#720E0F",
        bricklinkColorId: 59,
        semanticThemes: ["Blood", "Wine", "Rich", "Deep", "Intense", "Dramatic", "Royal", "Elegant", "Gothic"]
    },
    {
        bricklinkColorName: "Red",
        hexCode: "#C91A09",
        bricklinkColorId: 5,
        semanticThemes: ["Fire", "Energy", "Passion", "Bold", "Action", "Power", "Vibrant", "Classic"]
    },
    {
        bricklinkColorName: "Reddish Orange",
        hexCode: "#D86D2C",
        bricklinkColorId: 167,
        semanticThemes: ["Sunset", "Warm", "Vibrant", "Autumn", "Energy", "Bold", "Dynamic", "Rich"]
    },
    {
        bricklinkColorName: "Dark Salmon",
        hexCode: "#D86D2C",
        bricklinkColorId: 231,
        semanticThemes: ["Coral", "Warm", "Soft", "Natural", "Organic", "Muted", "Earthy", "Gentle"]
    },
    {
        bricklinkColorName: "Salmon",
        hexCode: "#F58624",
        bricklinkColorId: 25,
        semanticThemes: ["Peach", "Warm", "Soft", "Fresh", "Light", "Gentle", "Natural", "Bright"]
    },
    {
        bricklinkColorName: "Coral",
        hexCode: "#FF698F",
        bricklinkColorId: 220,
        semanticThemes: ["Tropical", "Vibrant", "Fresh", "Summer", "Bright", "Cheerful", "Warm", "Playful"]
    },
    {
        bricklinkColorName: "Light Salmon",
        hexCode: "#FFA070",
        bricklinkColorId: 26,
        semanticThemes: ["Pastel", "Soft", "Gentle", "Light", "Warm", "Delicate", "Fresh", "Sweet"]
    },
    {
        bricklinkColorName: "Sand Red",
        hexCode: "#D67572",
        bricklinkColorId: 58,
        semanticThemes: ["Desert", "Earthy", "Muted", "Natural", "Warm", "Dusty", "Subtle", "Organic"]
    },
    {
        bricklinkColorName: "Dark Brown",
        hexCode: "#352100",
        bricklinkColorId: 120,
        semanticThemes: ["Coffee", "Rich", "Deep", "Natural", "Earthy", "Traditional", "Warm", "Strong"]
    },
    {
        bricklinkColorName: "Umber",
        hexCode: "#4B2F2F",
        bricklinkColorId: 168,
        semanticThemes: ["Earth", "Natural", "Deep", "Rich", "Warm", "Organic", "Traditional", "Classic"]
    },
    {
        bricklinkColorName: "Brown",
        hexCode: "#583927",
        bricklinkColorId: 8,
        semanticThemes: ["Earth", "Wood", "Natural", "Rustic", "Classic", "Warm", "Traditional", "Organic"]
    },
    {
        bricklinkColorName: "Reddish Brown",
        hexCode: "#582A12",
        bricklinkColorId: 88,
        semanticThemes: ["Brick", "Rust", "Clay", "Autumn", "Earthy", "Rich", "Warm", "Natural"]
    },
    {
        bricklinkColorName: "Medium Brown",
        hexCode: "#7C503A",
        bricklinkColorId: 240,
        semanticThemes: ["Wood", "Natural", "Earthy", "Warm", "Organic", "Traditional", "Rustic", "Balanced"]
    },
    {
        bricklinkColorName: "Fabuland Brown",
        hexCode: "#B67B50",
        bricklinkColorId: 106,
        semanticThemes: ["Caramel", "Warm", "Playful", "Retro", "Vintage", "Friendly", "Light", "Whimsical"]
    },
    {
        bricklinkColorName: "Dark Tan",
        hexCode: "#958A73",
        bricklinkColorId: 69,
        semanticThemes: ["Sand", "Desert", "Earth", "Natural", "Neutral", "Muted", "Classic", "Weathered"]
    },
    {
        bricklinkColorName: "Tan",
        hexCode: "#E4CD9E",
        bricklinkColorId: 2,
        semanticThemes: ["Sand", "Beach", "Desert", "Natural", "Warm", "Light", "Neutral", "Classic"]
    },
    {
        bricklinkColorName: "Light Nougat",
        hexCode: "#F6D7B3",
        bricklinkColorId: 90,
        semanticThemes: ["Flesh", "Soft", "Warm", "Natural", "Light", "Gentle", "Delicate", "Subtle"]
    },
    {
        bricklinkColorName: "Medium Tan",
        hexCode: "#DCB48C",
        bricklinkColorId: 241,
        semanticThemes: ["Sand", "Earth", "Natural", "Warm", "Balanced", "Neutral", "Classic", "Organic"]
    },
    {
        bricklinkColorName: "Nougat",
        hexCode: "#D09168",
        bricklinkColorId: 28,
        semanticThemes: ["Flesh", "Natural", "Warm", "Organic", "Classic", "Balanced", "Traditional", "Rich"]
    },
    {
        bricklinkColorName: "Medium Nougat",
        hexCode: "#AA7D55",
        bricklinkColorId: 150,
        semanticThemes: ["Flesh", "Wood", "Natural", "Warm", "Earthy", "Rich", "Traditional", "Organic"]
    },
    {
        bricklinkColorName: "Dark Nougat",
        hexCode: "#AD6140",
        bricklinkColorId: 225,
        semanticThemes: ["Flesh", "Terracotta", "Deep", "Rich", "Warm", "Natural", "Earthy", "Strong"]
    },
    {
        bricklinkColorName: "Sienna",
        hexCode: "#8C4A2F",
        bricklinkColorId: 169,
        semanticThemes: ["Earth", "Clay", "Rich", "Deep", "Natural", "Warm", "Traditional", "Rustic"]
    },
    {
        bricklinkColorName: "Fabuland Orange",
        hexCode: "#FF8B14",
        bricklinkColorId: 160,
        semanticThemes: ["Playful", "Retro", "Bright", "Cheerful", "Vintage", "Fun", "Whimsical", "Warm"]
    },
    {
        bricklinkColorName: "Earth Orange",
        hexCode: "#FA9C1C",
        bricklinkColorId: 29,
        semanticThemes: ["Sunset", "Desert", "Warm", "Natural", "Earthy", "Rich", "Autumn", "Organic"]
    },
    {
        bricklinkColorName: "Dark Orange",
        hexCode: "#A95500",
        bricklinkColorId: 68,
        semanticThemes: ["Autumn", "Deep", "Rich", "Warm", "Intense", "Earthy", "Spice", "Bold"]
    },
    {
        bricklinkColorName: "Rust",
        hexCode: "#B31004",
        bricklinkColorId: 27,
        semanticThemes: ["Industrial", "Aged", "Weathered", "Vintage", "Urban", "Oxidized", "Worn", "Textured"]
    },
    {
        bricklinkColorName: "Neon Orange",
        hexCode: "#FF7F3F",
        bricklinkColorId: 165,
        semanticThemes: ["Electric", "Vibrant", "High-Visibility", "Energetic", "Bold", "Modern", "Dynamic", "Bright"]
    },
    {
        bricklinkColorName: "Orange",
        hexCode: "#FE8A18",
        bricklinkColorId: 4,
        semanticThemes: ["Classic", "Bright", "Warm", "Energetic", "Bold", "Cheerful", "Vibrant", "Fun"]
    },
    {
        bricklinkColorName: "Medium Orange",
        hexCode: "#FFA70B",
        bricklinkColorId: 31,
        semanticThemes: ["Warm", "Balanced", "Sunny", "Cheerful", "Bright", "Friendly", "Inviting", "Mellow"]
    },
    {
        bricklinkColorName: "Light Orange",
        hexCode: "#FFB625",
        bricklinkColorId: 32,
        semanticThemes: ["Soft", "Gentle", "Warm", "Light", "Subtle", "Pastel", "Delicate", "Fresh"]
    },
    {
        bricklinkColorName: "Bright Light Orange",
        hexCode: "#FFB74C",
        bricklinkColorId: 110,
        semanticThemes: ["Sunny", "Bright", "Cheerful", "Fresh", "Warm", "Vibrant", "Energetic", "Radiant"]
    },
    {
        bricklinkColorName: "Warm Yellowish Orange",
        hexCode: "#FFB74C",
        bricklinkColorId: 172,
        semanticThemes: ["Sunset", "Warm", "Glowing", "Rich", "Vibrant", "Energetic", "Bright", "Dynamic"]
    },
    {
        bricklinkColorName: "Very Light Orange",
        hexCode: "#FFC995",
        bricklinkColorId: 96,
        semanticThemes: ["Pastel", "Soft", "Light", "Gentle", "Warm", "Delicate", "Fresh", "Sweet"]
    },
    {
        bricklinkColorName: "Dark Yellow",
        hexCode: "#B88A00",
        bricklinkColorId: 161,
        semanticThemes: ["Gold", "Rich", "Warm", "Deep", "Earthy", "Intense", "Bold", "Autumn"]
    },
    {
        bricklinkColorName: "Yellow",
        hexCode: "#F2CD37",
        bricklinkColorId: 3,
        semanticThemes: ["Sun", "Bright", "Cheerful", "Classic", "Vibrant", "Warm", "Happy", "Bold"]
    },
    {
        bricklinkColorName: "Light Yellow",
        hexCode: "#FFF03A",
        bricklinkColorId: 33,
        semanticThemes: ["Pastel", "Soft", "Bright", "Fresh", "Spring", "Gentle", "Light", "Cheerful"]
    },
    {
        bricklinkColorName: "Bright Light Yellow",
        hexCode: "#FFF458",
        bricklinkColorId: 103,
        semanticThemes: ["Sunshine", "Bright", "Vibrant", "Fresh", "Cheerful", "Energetic", "Radiant", "Clear"]
    },
    {
        bricklinkColorName: "Neon Yellow",
        hexCode: "#FFF700",
        bricklinkColorId: 236,
        semanticThemes: ["Electric", "Fluorescent", "Vibrant", "High-Visibility", "Modern", "Energetic", "Bold"]
    },
    {
        bricklinkColorName: "Lemon",
        hexCode: "#FFE74C",
        bricklinkColorId: 171,
        semanticThemes: ["Citrus", "Fresh", "Food", "Nature", "Summer", "Bright", "Playful", "Cheerful"]
    },
    {
        bricklinkColorName: "Neon Green",
        hexCode: "#A4C374",
        bricklinkColorId: 166,
        semanticThemes: ["High-Visibility", "Modern", "Safety", "Urban", "Tech", "Electric", "Dynamic", "Bold"]
    },
    {
        bricklinkColorName: "Light Lime",
        hexCode: "#D9E4A7",
        bricklinkColorId: 35,
        semanticThemes: ["Spring", "Fresh", "Nature", "Pastel", "Gentle", "Young", "Soft", "Light"]
    },
    {
        bricklinkColorName: "Yellowish Green",
        hexCode: "#C2DA3A",
        bricklinkColorId: 158,
        semanticThemes: ["Nature", "Spring", "Fresh", "Grass", "Bright", "Lively", "Energetic", "Vibrant"]
    },
    {
        bricklinkColorName: "Medium Lime",
        hexCode: "#97BC0E",
        bricklinkColorId: 76,
        semanticThemes: ["Nature", "Fresh", "Grass", "Spring", "Balanced", "Lively", "Organic", "Bright"]
    },
    {
        bricklinkColorName: "Lime",
        hexCode: "#95B90B",
        bricklinkColorId: 34,
        semanticThemes: ["Citrus", "Fresh", "Zesty", "Tropical", "Bold", "Energetic", "Vibrant", "Modern"]
    },
    {
        bricklinkColorName: "Fabuland Lime",
        hexCode: "#78BE1E",
        bricklinkColorId: 248,
        semanticThemes: ["Playful", "Retro", "Cartoon", "Fun", "Whimsical", "Cheerful", "Vintage", "Bright"]
    },
    {
        bricklinkColorName: "Olive Green",
        hexCode: "#9B9A5A",
        bricklinkColorId: 155,
        semanticThemes: ["Military", "Camouflage", "Nature", "Earthy", "Classic", "Muted", "Traditional", "Organic"]
    },
    {
        bricklinkColorName: "Dark Olive Green",
        hexCode: "#7C7E37",
        bricklinkColorId: 242,
        semanticThemes: ["Military", "Tactical", "Camouflage", "Nature", "Deep", "Serious", "Professional", "Earthy"]
    },
    {
        bricklinkColorName: "Green",
        hexCode: "#00852B",
        bricklinkColorId: 6,
        semanticThemes: ["Nature", "Classic", "Trees", "Fresh", "Traditional", "Life", "Growth", "Basic"]
    },
    {
        bricklinkColorName: "Bright Green",
        hexCode: "#4B9F4A",
        bricklinkColorId: 36,
        semanticThemes: ["Spring", "Fresh", "Grass", "Vibrant", "Life", "Energy", "Modern", "Dynamic"]
    },
    {
        bricklinkColorName: "Medium Green",
        hexCode: "#73DCA1",
        bricklinkColorId: 37,
        semanticThemes: ["Fresh", "Spring", "Nature", "Balanced", "Modern", "Bright", "Clean", "Lively"]
    },
    {
        bricklinkColorName: "Light Green",
        hexCode: "#C2DAB8",
        bricklinkColorId: 38,
        semanticThemes: ["Pastel", "Soft", "Fresh", "Spring", "Gentle", "Natural", "Light", "Delicate"]
    },
    {
        bricklinkColorName: "Sand Green",
        hexCode: "#A0BCAC",
        bricklinkColorId: 48,
        semanticThemes: ["Beach", "Coastal", "Muted", "Natural", "Sage", "Subtle", "Earthy", "Calm"]
    },
    {
        bricklinkColorName: "Dark Turquoise",
        hexCode: "#008F9B",
        bricklinkColorId: 39,
        semanticThemes: ["Ocean", "Deep", "Marine", "Rich", "Cool", "Tropical", "Bold", "Water"]
    },
    {
        bricklinkColorName: "Light Turquoise",
        hexCode: "#56E646",
        bricklinkColorId: 40,
        semanticThemes: ["Sea", "Fresh", "Tropical", "Bright", "Cool", "Beach", "Aquatic", "Clear"]
    },
    {
        bricklinkColorName: "Aqua",
        hexCode: "#ADC3C0",
        bricklinkColorId: 41,
        semanticThemes: ["Water", "Ocean", "Cool", "Calm", "Serene", "Marine", "Coastal", "Peaceful"]
    },
    {
        bricklinkColorName: "Light Aqua",
        hexCode: "#CBE4E1",
        bricklinkColorId: 152,
        semanticThemes: ["Beach", "Soft", "Fresh", "Light", "Gentle", "Coastal", "Clean", "Airy"]
    },
    {
        bricklinkColorName: "Dark Blue",
        hexCode: "#0A3463",
        bricklinkColorId: 63,
        semanticThemes: ["Deep Sea", "Night", "Rich", "Professional", "Serious", "Strong", "Classic", "Formal"]
    },
    {
        bricklinkColorName: "Blue",
        hexCode: "#0055BF",
        bricklinkColorId: 7,
        semanticThemes: ["Ocean", "Sky", "Classic", "Deep", "Cool", "Calm", "Professional", "Traditional"]
    },
    {
        bricklinkColorName: "Dark Azure",
        hexCode: "#078BC9",
        bricklinkColorId: 153,
        semanticThemes: ["Ocean", "Bright", "Modern", "Fresh", "Cool", "Vibrant", "Dynamic", "Clear"]
    },
    {
        bricklinkColorName: "Little Robots Blue",
        hexCode: "#3E95B6",
        bricklinkColorId: 247,
        semanticThemes: ["Tech", "Modern", "Futuristic", "Cool", "Mechanical", "Robotic", "Sci-fi", "Clean"]
    },
    {
        bricklinkColorName: "Maersk Blue",
        hexCode: "#3592C3",
        bricklinkColorId: 72,
        semanticThemes: ["Corporate", "Professional", "Maritime", "Clean", "Modern", "Fresh", "Cool", "Industrial"]
    },
    {
        bricklinkColorName: "Medium Azure",
        hexCode: "#36AEBF",
        bricklinkColorId: 156,
        semanticThemes: ["Tropical", "Ocean", "Fresh", "Bright", "Modern", "Cool", "Vibrant", "Clear"]
    },
    {
        bricklinkColorName: "Sky Blue",
        hexCode: "#56BED6",
        bricklinkColorId: 87,
        semanticThemes: ["Daytime", "Air", "Fresh", "Light", "Peaceful", "Airy", "Bright", "Clean"]
    },
    {
        bricklinkColorName: "Medium Blue",
        hexCode: "#5A93DB",
        bricklinkColorId: 42,
        semanticThemes: ["Sky", "Water", "Professional", "Classic", "Clean", "Balanced", "Corporate", "Trustworthy"]
    },
    {
        bricklinkColorName: "Bright Light Blue",
        hexCode: "#9FC3E9",
        bricklinkColorId: 105,
        semanticThemes: ["Sky", "Fresh", "Modern", "Airy", "Clean", "Gentle", "Bright", "Peaceful"]
    },
    {
        bricklinkColorName: "Light Blue",
        hexCode: "#B4D2E3",
        bricklinkColorId: 62,
        semanticThemes: ["Baby", "Soft", "Gentle", "Cloud", "Pastel", "Light", "Delicate", "Calm"]
    },
    {
        bricklinkColorName: "Sand Blue",
        hexCode: "#6074A1",
        bricklinkColorId: 55,
        semanticThemes: ["Coastal", "Muted", "Professional", "Sophisticated", "Urban", "Modern", "Subtle", "Neutral"]
    },
    {
        bricklinkColorName: "Dark Blue-Violet",
        hexCode: "#2032B0",
        bricklinkColorId: 109,
        semanticThemes: ["Royal", "Deep", "Rich", "Dramatic", "Elegant", "Night", "Formal", "Intense"]
    },
    {
        bricklinkColorName: "Violet",
        hexCode: "#4C61DB",
        bricklinkColorId: 43,
        semanticThemes: ["Royal", "Mystical", "Rich", "Elegant", "Fantasy", "Noble", "Regal", "Luxurious"]
    },
    {
        bricklinkColorName: "Blue-Violet",
        hexCode: "#6874CA",
        bricklinkColorId: 97,
        semanticThemes: ["Twilight", "Mystical", "Dream", "Elegant", "Cool", "Sophisticated", "Balanced", "Serene"]
    },
    {
        bricklinkColorName: "Lilac",
        hexCode: "#8B4BA3",
        bricklinkColorId: 245,
        semanticThemes: ["Floral", "Spring", "Romantic", "Soft", "Feminine", "Gentle", "Sweet", "Delicate"]
    },
    {
        bricklinkColorName: "Medium Violet",
        hexCode: "#9391E4",
        bricklinkColorId: 73,
        semanticThemes: ["Lavender", "Floral", "Spring", "Fresh", "Bright", "Playful", "Light", "Sweet"]
    },
    {
        bricklinkColorName: "Light Lilac",
        hexCode: "#C1C3E8",
        bricklinkColorId: 246,
        semanticThemes: ["Pastel", "Soft", "Gentle", "Sweet", "Delicate", "Light", "Feminine", "Spring"]
    },
    {
        bricklinkColorName: "Light Violet",
        hexCode: "#C9CAE2",
        bricklinkColorId: 44,
        semanticThemes: ["Pastel", "Soft", "Gentle", "Sweet", "Delicate", "Light", "Airy", "Fresh"]
    },
    {
        bricklinkColorName: "Dark Purple",
        hexCode: "#3F3691",
        bricklinkColorId: 89,
        semanticThemes: ["Royal", "Mysterious", "Deep", "Rich", "Dramatic", "Elegant", "Noble", "Intense"]
    },
    {
        bricklinkColorName: "Purple",
        hexCode: "#81007B",
        bricklinkColorId: 24,
        semanticThemes: ["Royal", "Regal", "Rich", "Mystical", "Elegant", "Deep", "Dramatic", "Luxurious"]
    },
    {
        bricklinkColorName: "Light Purple",
        hexCode: "#A5A5CB",
        bricklinkColorId: 93,
        semanticThemes: ["Pastel", "Soft", "Gentle", "Sweet", "Delicate", "Light", "Feminine", "Fresh"]
    },
    {
        bricklinkColorName: "Medium Lavender",
        hexCode: "#AC78BA",
        bricklinkColorId: 157,
        semanticThemes: ["Floral", "Spring", "Romantic", "Elegant", "Sweet", "Gentle", "Feminine", "Dreamy"]
    },
    {
        bricklinkColorName: "Lavender",
        hexCode: "#E1D5ED",
        bricklinkColorId: 154,
        semanticThemes: ["Floral", "Soft", "Romantic", "Light", "Sweet", "Gentle", "Delicate", "Spring"]
    },
    {
        bricklinkColorName: "Clikits Lavender",
        hexCode: "#E1D5ED",
        bricklinkColorId: 227,
        semanticThemes: ["Playful", "Sweet", "Light", "Feminine", "Gentle", "Soft", "Decorative", "Fun"]
    },
    {
        bricklinkColorName: "Sand Purple",
        hexCode: "#845E84",
        bricklinkColorId: 54,
        semanticThemes: ["Muted", "Sophisticated", "Neutral", "Subtle", "Earthy", "Balanced", "Modern", "Mature"]
    },
    {
        bricklinkColorName: "Magenta",
        hexCode: "#C870A0",
        bricklinkColorId: 71,
        semanticThemes: ["Vibrant", "Bold", "Energetic", "Fashion", "Modern", "Dynamic", "Rich", "Striking"]
    },
    {
        bricklinkColorName: "Dark Pink",
        hexCode: "#C91E93",
        bricklinkColorId: 47,
        semanticThemes: ["Bold", "Rich", "Intense", "Dramatic", "Fashion", "Deep", "Vibrant", "Strong"]
    },
    {
        bricklinkColorName: "Medium Dark Pink",
        hexCode: "#E4ADC8",
        bricklinkColorId: 94,
        semanticThemes: ["Sweet", "Feminine", "Soft", "Balanced", "Gentle", "Romantic", "Warm", "Delicate"]
    },
    {
        bricklinkColorName: "Bright Pink",
        hexCode: "#FF9ECD",
        bricklinkColorId: 104,
        semanticThemes: ["Fun", "Playful", "Vibrant", "Sweet", "Cheerful", "Modern", "Energetic", "Fresh"]
    },
    {
        bricklinkColorName: "Pink",
        hexCode: "#E8BAC7",
        bricklinkColorId: 23,
        semanticThemes: ["Sweet", "Soft", "Gentle", "Classic", "Feminine", "Light", "Delicate", "Romantic"]
    },
    {
        bricklinkColorName: "Rose Pink",
        hexCode: "#FEBADD",
        bricklinkColorId: 56,
        semanticThemes: ["Floral", "Romantic", "Sweet", "Spring", "Fresh", "Gentle", "Feminine", "Delicate"]
    },
    {
        bricklinkColorName: "Trans-Clear",
        hexCode: "#FCFCFC",
        bricklinkColorId: 12,
        semanticThemes: ["Glass", "Crystal", "Ice", "Water", "Window", "Clean", "Modern", "Transparent", "Light"]
    },
    {
        bricklinkColorName: "Trans-Brown",
        hexCode: "#635F52",
        bricklinkColorId: 13,
        semanticThemes: ["Glass", "Amber", "Crystal", "Transparent", "Smoky", "Sophisticated", "Premium", "Special"]
    },
    {
        bricklinkColorName: "Trans-Black",
        hexCode: "#635F52",
        bricklinkColorId: 251,
        semanticThemes: ["Tinted", "Mysterious", "Dark", "Sleek", "Modern", "Dramatic", "Sophisticated", "Premium"]
    },
    {
        bricklinkColorName: "Trans-Red",
        hexCode: "#C91A09",
        bricklinkColorId: 17,
        semanticThemes: ["Crystal", "Gem", "Ruby", "Transparent", "Glowing", "Candy", "Light", "Bright"]
    },
    {
        bricklinkColorName: "Trans-Neon Orange",
        hexCode: "#FF800D",
        bricklinkColorId: 18,
        semanticThemes: ["Glowing", "Energy", "High-Visibility", "Dynamic", "Modern", "Vibrant", "Bold", "Safety"]
    },
    {
        bricklinkColorName: "Trans-Orange",
        hexCode: "#F08F1C",
        bricklinkColorId: 98,
        semanticThemes: ["Crystal", "Amber", "Warm", "Sunset", "Glowing", "Transparent", "Light", "Clear"]
    },
    {
        bricklinkColorName: "Trans-Light Orange",
        hexCode: "#FCB76D",
        bricklinkColorId: 164,
        semanticThemes: ["Crystal", "Soft", "Gentle", "Light", "Warm", "Delicate", "Clear", "Subtle"]
    },
    {
        bricklinkColorName: "Trans-Neon Yellow",
        hexCode: "#DAB000",
        bricklinkColorId: 121,
        semanticThemes: ["Glowing", "Electric", "High-Visibility", "Bright", "Modern", "Dynamic", "Safety", "Bold"]
    },
    {
        bricklinkColorName: "Trans-Yellow",
        hexCode: "#F5CD2F",
        bricklinkColorId: 19,
        semanticThemes: ["Crystal", "Sunny", "Light", "Clear", "Bright", "Transparent", "Fresh", "Clean"]
    },
    {
        bricklinkColorName: "Trans-Neon Green",
        hexCode: "#C0FF00",
        bricklinkColorId: 16,
        semanticThemes: ["Electric", "High-Visibility", "Toxic", "Sci-fi", "Modern", "Dynamic", "Safety", "Bold"]
    },
    {
        bricklinkColorName: "Trans-Bright Green",
        hexCode: "#D9E4A7",
        bricklinkColorId: 108,
        semanticThemes: ["Crystal", "Fresh", "Spring", "Light", "Clear", "Natural", "Bright", "Clean"]
    },
    {
        bricklinkColorName: "Trans-Light Bright Green",
        hexCode: "#C9E788",
        bricklinkColorId: 221,
        semanticThemes: ["Crystal", "Fresh", "Gentle", "Light", "Clear", "Natural", "Soft", "Delicate"]
    },
    {
        bricklinkColorName: "Trans-Green",
        hexCode: "#237841",
        bricklinkColorId: 20,
        semanticThemes: ["Crystal", "Emerald", "Jewel", "Rich", "Deep", "Premium", "Elegant", "Natural"]
    },
    {
        bricklinkColorName: "Trans-Dark Blue",
        hexCode: "#0020A0",
        bricklinkColorId: 14,
        semanticThemes: ["Crystal", "Sapphire", "Deep", "Rich", "Premium", "Elegant", "Jewel", "Night"]
    },
    {
        bricklinkColorName: "Trans-Medium Blue",
        hexCode: "#559AB7",
        bricklinkColorId: 74,
        semanticThemes: ["Ocean", "Water", "Clear", "Cool", "Fresh", "Clean", "Bright", "Aquatic"]
    },
    {
        bricklinkColorName: "Trans-Light Blue",
        hexCode: "#AEE9EF",
        bricklinkColorId: 15,
        semanticThemes: ["Ice", "Crystal", "Sky", "Fresh", "Clean", "Light", "Clear", "Delicate"]
    },
    {
        bricklinkColorName: "Trans-Aqua",
        hexCode: "#7FB5BC",
        bricklinkColorId: 113,
        semanticThemes: ["Water", "Ocean", "Marine", "Fresh", "Cool", "Clear", "Tropical", "Clean"]
    },
    {
        bricklinkColorName: "Trans-Light Purple",
        hexCode: "#96709F",
        bricklinkColorId: 114,
        semanticThemes: ["Crystal", "Amethyst", "Gentle", "Magical", "Light", "Delicate", "Mystical", "Soft"]
    },
    {
        bricklinkColorName: "Trans-Medium Purple",
        hexCode: "#A5A5CB",
        bricklinkColorId: 234,
        semanticThemes: ["Crystal", "Mystical", "Fantasy", "Elegant", "Magical", "Premium", "Royal", "Dream"]
    },
    {
        bricklinkColorName: "Trans-Purple",
        hexCode: "#8320A7",
        bricklinkColorId: 51,
        semanticThemes: ["Crystal", "Royal", "Rich", "Magical", "Deep", "Mystical", "Premium", "Dramatic"]
    },
    {
        bricklinkColorName: "Trans-Dark Pink",
        hexCode: "#DF6695",
        bricklinkColorId: 107,
        semanticThemes: ["Crystal", "Rose", "Sweet", "Romantic", "Bright", "Feminine", "Delicate", "Gem"]
    },
    {
        bricklinkColorName: "Chrome Gold",
        hexCode: "#BBA53D",
        bricklinkColorId: 21,
        semanticThemes: ["Metallic", "Luxury", "Rich", "Royal", "Precious", "Shiny", "Elegant", "Premium", "Decorative"]
    },
    {
        bricklinkColorName: "Chrome Silver",
        hexCode: "#E0E0E0",
        bricklinkColorId: 22,
        semanticThemes: ["Metallic", "Modern", "Tech", "Premium", "Sleek", "Industrial", "Futuristic", "Luxury"]
    },
    {
        bricklinkColorName: "Chrome Antique Brass",
        hexCode: "#645A4C",
        bricklinkColorId: 57,
        semanticThemes: ["Vintage", "Classic", "Antique", "Rich", "Traditional", "Elegant", "Premium", "Decorative"]
    },
    {
        bricklinkColorName: "Chrome Black",
        hexCode: "#1B2A34",
        bricklinkColorId: 122,
        semanticThemes: ["Sleek", "Modern", "Luxury", "Premium", "Tech", "Sophisticated", "Dramatic", "Bold"]
    },
    {
        bricklinkColorName: "Chrome Blue",
        hexCode: "#6C96BF",
        bricklinkColorId: 52,
        semanticThemes: ["Metallic", "Modern", "Tech", "Cool", "Premium", "Futuristic", "Sleek", "Dynamic"]
    },
    {
        bricklinkColorName: "Chrome Green",
        hexCode: "#3CB371",
        bricklinkColorId: 64,
        semanticThemes: ["Metallic", "Modern", "Premium", "Rich", "Futuristic", "Sleek", "Luxury", "Special"]
    },
    {
        bricklinkColorName: "Chrome Pink",
        hexCode: "#AA4D8E",
        bricklinkColorId: 82,
        semanticThemes: ["Metallic", "Fashion", "Modern", "Premium", "Glamorous", "Special", "Luxury", "Unique"]
    },
    {
        bricklinkColorName: "Pearl White",
        hexCode: "#F2F3F2",
        bricklinkColorId: 83,
        semanticThemes: ["Iridescent", "Luxury", "Clean", "Elegant", "Premium", "Wedding", "Glossy", "Shimmering", "Delicate"]
    },
    {
        bricklinkColorName: "Pearl Very Light Gray",
        hexCode: "#E6E3E0",
        bricklinkColorId: 119,
        semanticThemes: ["Iridescent", "Subtle", "Modern", "Premium", "Clean", "Sophisticated", "Elegant", "Light"]
    },
    {
        bricklinkColorName: "Pearl Light Gray",
        hexCode: "#9CA3A8",
        bricklinkColorId: 66,
        semanticThemes: ["Pearlescent", "Modern", "Sophisticated", "Premium", "Clean", "Professional", "Elegant", "Balanced"]
    },
    {
        bricklinkColorName: "Flat Silver",
        hexCode: "#898788",
        bricklinkColorId: 95,
        semanticThemes: ["Metallic", "Industrial", "Modern", "Tech", "Professional", "Clean", "Neutral", "Urban"]
    },
    {
        bricklinkColorName: "Bionicle Silver",
        hexCode: "#AEAAA3",
        bricklinkColorId: 239,
        semanticThemes: ["Robotic", "Tech", "Mechanical", "Sci-fi", "Modern", "Metallic", "Special", "Futuristic"]
    },
    {
        bricklinkColorName: "Pearl Dark Gray",
        hexCode: "#575857",
        bricklinkColorId: 77,
        semanticThemes: ["Pearlescent", "Rich", "Deep", "Premium", "Sophisticated", "Modern", "Elegant", "Strong"]
    },
    {
        bricklinkColorName: "Pearl Black",
        hexCode: "#1C2831",
        bricklinkColorId: 244,
        semanticThemes: ["Iridescent", "Luxury", "Deep", "Premium", "Sophisticated", "Dramatic", "Elegant", "Rich"]
    },
    {
        bricklinkColorName: "Pearl Light Gold",
        hexCode: "#DCBE61",
        bricklinkColorId: 61,
        semanticThemes: ["Precious", "Luxury", "Premium", "Elegant", "Rich", "Shimmering", "Special", "Delicate"]
    },
    {
        bricklinkColorName: "Pearl Gold",
        hexCode: "#AA7F2E",
        bricklinkColorId: 115,
        semanticThemes: ["Precious", "Royal", "Rich", "Premium", "Luxury", "Classic", "Elegant", "Noble"]
    },
    {
        bricklinkColorName: "Reddish Gold",
        hexCode: "#AC8247",
        bricklinkColorId: 235,
        semanticThemes: ["Antique", "Warm", "Rich", "Premium", "Classic", "Traditional", "Elegant", "Special"]
    },
    {
        bricklinkColorName: "Bionicle Gold",
        hexCode: "#C2A06B",
        bricklinkColorId: 238,
        semanticThemes: ["Robotic", "Tech", "Mechanical", "Premium", "Metallic", "Sci-fi", "Special", "Rich"]
    },
    {
        bricklinkColorName: "Flat Dark Gold",
        hexCode: "#B48A1C",
        bricklinkColorId: 81,
        semanticThemes: ["Antique", "Rich", "Muted", "Classic", "Premium", "Traditional", "Elegant", "Sophisticated"]
    },
    {
        bricklinkColorName: "Reddish Copper",
        hexCode: "#95532B",
        bricklinkColorId: 249,
        semanticThemes: ["Metallic", "Warm", "Rich", "Industrial", "Vintage", "Rustic", "Premium", "Aged"]
    },
    {
        bricklinkColorName: "Copper",
        hexCode: "#B46A3C",
        bricklinkColorId: 84,
        semanticThemes: ["Metallic", "Industrial", "Classic", "Warm", "Rich", "Traditional", "Premium", "Natural"]
    },
    {
        bricklinkColorName: "Bionicle Copper",
        hexCode: "#C58A48",
        bricklinkColorId: 237,
        semanticThemes: ["Robotic", "Tech", "Mechanical", "Metallic", "Sci-fi", "Special", "Premium", "Industrial"]
    },
    {
        bricklinkColorName: "Pearl Brown",
        hexCode: "#4B2C2C",
        bricklinkColorId: 255,
        semanticThemes: ["Pearlescent", "Rich", "Deep", "Premium", "Elegant", "Sophisticated", "Warm", "Special"]
    },
    {
        bricklinkColorName: "Pearl Red",
        hexCode: "#8E1D2C",
        bricklinkColorId: 252,
        semanticThemes: ["Pearlescent", "Rich", "Deep", "Premium", "Elegant", "Dramatic", "Special", "Luxurious"]
    },
    {
        bricklinkColorName: "Pearl Green",
        hexCode: "#008E3C",
        bricklinkColorId: 253,
        semanticThemes: ["Pearlescent", "Rich", "Natural", "Premium", "Elegant", "Special", "Luxurious", "Deep"]
    },
    {
        bricklinkColorName: "Pearl Blue",
        hexCode: "#0063B0",
        bricklinkColorId: 254,
        semanticThemes: ["Pearlescent", "Deep", "Cool", "Premium", "Elegant", "Special", "Luxurious", "Rich"]
    },
    {
        bricklinkColorName: "Pearl Sand Blue",
        hexCode: "#5A7184",
        bricklinkColorId: 78,
        semanticThemes: ["Pearlescent", "Coastal", "Muted", "Sophisticated", "Premium", "Modern", "Special", "Subtle"]
    },
    {
        bricklinkColorName: "Satin Trans-Clear",
        hexCode: "#FFFFFF",
        bricklinkColorId: 228,
        semanticThemes: ["Silky", "Smooth", "Elegant", "Premium", "Refined", "Delicate", "Sophisticated", "Luxurious"]
    },
    {
        bricklinkColorName: "Satin Trans-Brown",
        hexCode: "#635F52",
        bricklinkColorId: 229,
        semanticThemes: ["Silky", "Smoky", "Sophisticated", "Premium", "Rich", "Elegant", "Refined", "Special"]
    },
    {
        bricklinkColorName: "Satin Trans-Yellow",
        hexCode: "#F5CD2F",
        bricklinkColorId: 170,
        semanticThemes: ["Silky", "Bright", "Elegant", "Premium", "Light", "Refined", "Luxurious", "Special"]
    },
    {
        bricklinkColorName: "Satin Trans-Bright Green",
        hexCode: "#84B68D",
        bricklinkColorId: 233,
        semanticThemes: ["Silky", "Fresh", "Natural", "Premium", "Elegant", "Refined", "Special", "Sophisticated"]
    },
    {
        bricklinkColorName: "Satin Trans-Light Blue",
        hexCode: "#AEDEE4",
        bricklinkColorId: 223,
        semanticThemes: ["Silky", "Cool", "Fresh", "Premium", "Delicate", "Refined", "Elegant", "Clean"]
    },
    {
        bricklinkColorName: "Satin Trans-Dark Blue",
        hexCode: "#0020A0",
        bricklinkColorId: 232,
        semanticThemes: ["Silky", "Deep", "Rich", "Premium", "Elegant", "Sophisticated", "Luxurious", "Noble"]
    },
    {
        bricklinkColorName: "Satin Trans-Purple",
        hexCode: "#8320A7",
        bricklinkColorId: 230,
        semanticThemes: ["Silky", "Smooth", "Elegant", "Luxurious", "Refined", "Soft", "Glamorous", "Premium"]
    },
    {
        bricklinkColorName: "Satin Trans-Dark Pink",
        hexCode: "#DF6695",
        bricklinkColorId: 224,
        semanticThemes: ["Silky", "Feminine", "Elegant", "Premium", "Refined", "Glamorous", "Special", "Luxurious"]
    },
    {
        bricklinkColorName: "Metallic Silver",
        hexCode: "#A5A9B4",
        bricklinkColorId: 67,
        semanticThemes: ["Modern", "Sleek", "Industrial", "Tech", "Futuristic", "Shiny", "Premium", "Metallic"]
    },
    {
        bricklinkColorName: "Metallic Green",
        hexCode: "#899B5F",
        bricklinkColorId: 70,
        semanticThemes: ["Metallic", "Natural", "Modern", "Premium", "Special", "Rich", "Sophisticated", "Unique"]
    },
    {
        bricklinkColorName: "Metallic Gold",
        hexCode: "#DBAC34",
        bricklinkColorId: 65,
        semanticThemes: ["Precious", "Luxury", "Rich", "Premium", "Royal", "Elegant", "Special", "Classic"]
    },
    {
        bricklinkColorName: "Metallic Copper",
        hexCode: "#C27F53",
        bricklinkColorId: 250,
        semanticThemes: ["Metallic", "Industrial", "Warm", "Premium", "Rich", "Classic", "Special", "Traditional"]
    },
    {
        bricklinkColorName: "Milky White",
        hexCode: "#FFFFFF",
        bricklinkColorId: 60,
        semanticThemes: ["Translucent", "Soft", "Cloudy", "Dreamy", "Gentle", "Subtle", "Ethereal", "Delicate"]
    },
    {
        bricklinkColorName: "Glow In Dark White",
        hexCode: "#D9D9D9",
        bricklinkColorId: 159,
        semanticThemes: ["Luminous", "Night", "Ethereal", "Supernatural", "Sci-fi", "Mysterious", "Special Effect"]
    },
    {
        bricklinkColorName: "Glow In Dark Opaque",
        hexCode: "#E0FFB0",
        bricklinkColorId: 46,
        semanticThemes: ["Luminous", "Night", "Glowing", "Special", "Supernatural", "Sci-fi", "Magical", "Bright"]
    },
    {
        bricklinkColorName: "Glow In Dark Trans",
        hexCode: "#BDC6AD",
        bricklinkColorId: 118,
        semanticThemes: ["Luminous", "Crystal", "Glowing", "Magical", "Ethereal", "Sci-fi", "Special", "Mysterious"]
    },
    {
        bricklinkColorName: "Glitter Trans-Clear",
        hexCode: "#FFFFFF",
        bricklinkColorId: 101,
        semanticThemes: ["Sparkle", "Crystal", "Magical", "Premium", "Special", "Bright", "Festive", "Decorative"]
    },
    {
        bricklinkColorName: "Glitter Trans-Orange",
        hexCode: "#F08F1C",
        bricklinkColorId: 222,
        semanticThemes: ["Sparkle", "Fire", "Magical", "Warm", "Dynamic", "Festive", "Special", "Bright"]
    },
    {
        bricklinkColorName: "Glitter Trans-Neon Green",
        hexCode: "#C0FF00",
        bricklinkColorId: 163,
        semanticThemes: ["Sparkle", "Electric", "Magical", "High-Visibility", "Dynamic", "Modern", "Special", "Bright"]
    },
    {
        bricklinkColorName: "Glitter Trans-Light Blue",
        hexCode: "#AEE9EF",
        bricklinkColorId: 162,
        semanticThemes: ["Sparkle", "Crystal", "Ice", "Magical", "Light", "Fresh", "Special", "Delicate"]
    },
    {
        bricklinkColorName: "Glitter Trans-Purple",
        hexCode: "#8320A7",
        bricklinkColorId: 102,
        semanticThemes: ["Sparkle", "Magic", "Fantasy", "Royal", "Mystical", "Enchanted", "Glamorous", "Festive"]
    },
    {
        bricklinkColorName: "Glitter Trans-Dark Pink",
        hexCode: "#DF6695",
        bricklinkColorId: 100,
        semanticThemes: ["Sparkle", "Magical", "Feminine", "Glamorous", "Special", "Bright", "Festive", "Sweet"]
    },
    {
        bricklinkColorName: "Speckle Black-Silver",
        hexCode: "#000000",
        bricklinkColorId: 111,
        semanticThemes: ["Starry", "Night Sky", "Glitter", "Space", "Cosmic", "Sparkle", "Textured", "Premium"]
    },
    {
        bricklinkColorName: "Speckle Black-Gold",
        hexCode: "#000000",
        bricklinkColorId: 151,
        semanticThemes: ["Starry", "Night Sky", "Galaxy", "Luxury", "Premium", "Textured", "Special Effect", "Decorative"]
    },
    {
        bricklinkColorName: "Speckle Black-Copper",
        hexCode: "#000000",
        bricklinkColorId: 116,
        semanticThemes: ["Starry", "Metallic", "Rich", "Special", "Premium", "Textured", "Decorative", "Unique"]
    },
    {
        bricklinkColorName: "Speckle DBGray-Silver",
        hexCode: "#635F61",
        bricklinkColorId: 117,
        semanticThemes: ["Metallic", "Industrial", "Modern", "Special", "Textured", "Premium", "Sophisticated", "Tech"]
    }
];

export default colors;
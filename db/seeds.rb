require 'faker'

LANGUAGES = [
            {name: "English", code: "en", img_url: "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/english.jpg"},
            {name: "Spanish", code: "es", img_url: "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/spain.png"}]

LEVELS = [
  {name: "beginner", value: 1},
  {name: "intermediate beginner", value: 2},
  {name: "advanced beginner", value: 3},
  {name: "low intermediate", value: 4},
  {name: "mid intermediate", value: 5},
  {name: "advanced intermediate", value: 6},
  {name: "low advanced", value: 7},
  {name: "mid advanced", value: 8},
  {name: "high advanced", value: 9},
  {name: "expert", value: 10}
]

BEGINNER_TOPICS = [
  "Introduce Yourself",
  "How is the weather?",
  "Who are your family members?",
  "Where do you live?",
  "What is your favorite food?"
]

MID_BEGINNER_TOPICS = [
  "Tell me about a sport that you like",
  "What is your favorite holiday?",
  "What type of pets have you had in the past?",
  "Tell me about your mother and father",
  "Tell me about the school that you attended"
]

ADVANCED_BEGINNER_TOPICS = [
  "Tell me about your favorite movie",
  "Tell me about a place you would like to visit",
  "Tell me about your favorite band",
  "Tell me about your best friend",
  "Tell me about your daily routine"
]

LOW_INTERMEDIATE_TOPICS = [
  "Tell me about a time when you were really afraid",
  "Tell me about a time when you were really happy",
  "Tell me about an accomplishment of yours",
  "Tell me about your daily routine at work",
  "Tell me about a meal that you like to cook"
]

MID_INTERMEDIATE_TOPICS = [
  "Tell me about the last book that you read",
  "Explain to me the plot of the last movie you saw",
  "Who is your favorite artist and why?",
  "Who is someone you look up to?",
  "What is your idea of a perfect day?"
]

ADVANCED_INTERMEDIATE_TOPICS = [
  "What would you change in your country if you were President?",
  "What is one of your earliest memories?",
  "What is your favorite TV show? Why?",
  "What does your family do every year for the holidays?",
  "Tell me about a challenge you faced recently at work."
]

LOW_ADVANCED_TOPICS = [
  "Tell me about a time when you overcame adversity",
  "Tell me what you look for in a good friend",
  "Tell me what values you consider to be most important",
  "Tell me about your views on politics",
  "Tell me about your views on religion"
]

MID_ADVANCED_TOPICS = [
  "Tell me what you think is the best way to learn something new",
  "Tell me what you feel is the best way to deal with stress",
  "Tell me how you deal with situations that make you angry",
  "Tell me what you think a perfect vacation would be",
  "Tell me what you do to relax"
]

HIGH_ADVANCED_TOPICS = [
  "Tell me what you feel are the flaws in the political system in your country",
  "How do you feel about the saying, 'it is better to spare an individual than a village'. Why do you feel that way?",
  "What do you think would be a solution to conflict in the world? Why are wars fought?",
  "How much of success do you think depends on luck, and how much on skill?",
  "How do you feel about the growth of technology? What dangers do you think it might have?"
]

EXPERT_TOPICS = [
  "Take me step by step through your best recipe",
  "Explain to me in detail the plot of a movie",
  "Tell me in detail about your family and how they have shaped your personality",
  "Tell me about a hobby you have describe what it feels like to you",
  "Pick a political topic and discuss the arguments for and against it"
]

COUNTRIES = [
  {name: "United States", image_url: "http://freeassembly.net/wp-content/uploads/2014/04/USA-flag.jpg"},
  {name: "Canada", image_url: "http://lenthom.ca/wp-content/uploads/2015/02/Canada-Flag.jpg"},
  {name: "Mexico", image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Mexico_(reverse).png"},
  {name: "Spain", image_url: "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/spain.png"},
  {name: "Argentina", image_url: "http://argentinaflag.facts.co/argentinaflagimage1.png"},
  {name: "Columbia", image_url: "http://flaglane.com/download/colombian-flag/colombian-flag-medium.png"},
  {name: "Peru", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Peru_(1825-1950).svg/2000px-Flag_of_Peru_(1825-1950).svg.png" },
  {name: "United Kingdom", image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/300px-Flag_of_the_United_Kingdom.svg.png"},
  {name: "Venezuela", image_url: "http://flaglane.com/download/venezuelan-flag/venezuelan-flag-medium.png"},
  {name: "Ecuador", image_url: "http://flaglane.com/download/ecuadorian-flag/ecuadorian-flag-medium.png"},
  {name: "Cuba", image_url: "http://flaglane.com/download/cuban-flag/cuban-flag-medium.png"},
  {name: "Uruguay", image_url: "http://flaglane.com/download/uruguayan-flag/uruguayan-flag-medium.png"},
  {name: "Costa Rica", image_url: "http://flaglane.com/download/costa-rican-flag/costa-rican-flag-medium.png"},
  {name: "Guatemala", image_url: "http://flaglane.com/download/guatemalan-flag/guatemalan-flag-medium.png"},
  {name: "Panama", image_url: "http://flaglane.com/download/panamanian-flag/panamanian-flag-medium.png"},
  {name: "Chile", image_url: "http://flaglane.com/download/chilean-flag/chilean-flag-medium.png"},
  {name: "Dominican Republic", image_url: "http://flaglane.com/download/dominican-republic-flag/dominican-republic-flag-medium.png"}
]

TOPICS = [
    BEGINNER_TOPICS,
    MID_BEGINNER_TOPICS,
    ADVANCED_BEGINNER_TOPICS,
    LOW_INTERMEDIATE_TOPICS,
    MID_INTERMEDIATE_TOPICS,
    ADVANCED_INTERMEDIATE_TOPICS,
    LOW_ADVANCED_TOPICS,
    MID_ADVANCED_TOPICS,
    HIGH_ADVANCED_TOPICS,
    EXPERT_TOPICS
]

COUNTRIES.each do |country|
  Country.create(name: country[:name], image_url: country[:image_url])
end

LANGUAGES.each do |language|
  new_language = Language.create(name: language[:name], code: language[:code], img_url: language[:img_url])
  # p new_language.name
  LEVELS.each_with_index do |level, idx|
    new_level = Level.create(name: level[:name], value: level[:value], language_id: new_language.id)
    # p new_level.name
    TOPICS[idx].each do |topic|
      new_topic = Topic.create(name: topic, level_id: new_level.id, language_id: new_language.id)
      # p new_topic.name
    end
  end
end

Language.all.each_with_index do |language, idx|
  study_language = Language.all[idx -1]
  p study_language.name
  50.times do
    user = User.create(
    native_language_id: language.id,
    study_language_id: study_language.id,
    level_id: study_language.levels.first.id,
    country_id: Country.all.sample.id,
    username: Faker::Name.name,
    email: Faker::Internet.email,
    password: "password")
  end
end

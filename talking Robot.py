import pyttsx3

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Function to speak
def speak(text):
    print("Robot:", text)  # Also print to console
    engine.say(text)
    engine.runAndWait()

# Test the robot
speak("Hello, I am your talking robot. Ready to help you!")
# You can call the speak function with any text you want the robot to say
speak("What would you like to know today?")
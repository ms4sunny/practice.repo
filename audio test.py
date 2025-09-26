import speech_recognition as sr
import pyttsx3
from datetime import datetime
import time

def speak(text):
    print(f"Robot: {text}")
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 1)
    engine.say(text)
    engine.runAndWait()
    engine.stop()  # Explicitly stop the engine
    del engine  # Clean up the engine instance
    time.sleep(0.3)  # Brief pause for stability

# Initial greeting
speak("Hello, I am your offline talking robot. Ready to help you!")

listener = sr.Recognizer()
listener.pause_threshold = 1.5
listener.energy_threshold = 4000  # Adjust based on your microphone

while True:
    try:
        with sr.Microphone() as source:
            print("\nListening...")
            listener.adjust_for_ambient_noise(source, duration=1)
            audio = listener.listen(source, timeout=5, phrase_time_limit=5)

        command = listener.recognize_google(audio).lower()
        print(f"You said: {command}")

        if "hello" in command:
            speak("Hello there! How can I help you?")
        elif "your name" in command:
            speak("I am your talking robot.")
        elif "joke" in command:
            speak("Why don't skeletons fight each other? They don't have the guts.")
        elif "time" in command:
            speak("The time is " + datetime.now().strftime("%I:%M %p"))
        elif "stop" in command or "goodbye" in command:
            speak("Goodbye! Have a nice day!")
            break
        else:
            speak("I heard you say " + command)

    except sr.WaitTimeoutError:
        print("Listening timed out. Try again.")
    except sr.UnknownValueError:
        speak("Sorry, I didn't catch that.")
    except sr.RequestError:
        speak("Could not connect to the speech service.")
    except Exception as e:
        print(f"Error: {e}")
        speak("Sorry, something went wrong. Let's try again.")
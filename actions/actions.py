from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionWeather(Action):

    def name(self) -> str:
        return "action_weather"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:
        location = tracker.get_slot('location')
        dispatcher.utter_message(text=f"The weather in {location} is sunny.")
        return []

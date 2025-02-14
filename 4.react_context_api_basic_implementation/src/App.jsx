/*

Basic implementation
Here’s an example of a basic implementation of the Context API in React for managing localization (i.e., providing different language translations) in an application.

 This example will have three main components: App, GeneralLayout, LocalizationProvider, and LocalizedTet.


LocalizationContext: 
    This context is created using createContext(). 
    It will hold the current language and translations, and provide a method to switch languages. 
    It returns a Context object that has two parts:

Context.Provider a React component that takes a value property that becomes the value of the context, it can wrap children that will have access to the context.
Context.Consumer a React component that was used to consume the context. It's rarely used now since we have a better way, a hook!

LocalizationProvider: 
  This component manages the state for the current language and provides translations for different languages. 
  It uses the useState hook to manage the current language and provides a switchLanguage function to change the language. 
  The translations object holds the greeting text in different languages.

LocalizedText: 
  This component consumes the localization data using the useContext hook and displays the greeting text based on the current language. 

LanguageSwitcher: 
  This component provides buttons to switch between different languages by calling the switchLanguage function from the context. 

GeneralLayout: It's just here to add a nesting level between the context provider and the components that consume the context!

Context can be used for a LOT of things: authentication data that is needed across the application, localization, themes! anything!
It's just a more efficient way to organise and share state :D 


*/

import { createContext, useContext, useState } from "react";

// Create a Context for the localization
const LocalizationContext = createContext();

// LocalizationProvider component to provide localization data to its children
const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Discover the Art of Coffee",
      text: "Savor the rich flavors and aromas of the finest coffee beans from around the world. Join us in celebrating the timeless tradition of coffee making.",
    },
    de: {
      title: "Entdecken Sie die Kunst des Kaffees",
      text: "Genie�en Sie die reichen Aromen und Geschmacksrichtungen der besten Kaffeebohnen aus aller Welt. Feiern Sie mit uns die zeitlose Tradition der Kaffeezubereitung.",
    },
    fr: {
      title: "D�couvrez l'Art du Caf�",
      text: "Savourez les riches saveurs et ar�mes des meilleurs grains de caf� du monde entier. Rejoignez-nous pour c�l�brer la tradition intemporelle de la pr�paration du caf�.",
    },
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LocalizationContext.Provider
      value={{ language, switchLanguage, translations }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

// LocalizedText component to consume and display localized text
const LocalizedText = () => {
  const { language, translations } = useContext(LocalizationContext);
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">{translations[language].title}</h1>
      <p>{translations[language].text}</p>
    </div>
  );
};

// LanguageSwitcher component to change the language
const LanguageSwitcher = () => {
  const { switchLanguage } = useContext(LocalizationContext);
  return (
    <div className="flex justify-center space-x-4 p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => switchLanguage("en")}
      >
        English
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => switchLanguage("de")}
      >
        Deutsch
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => switchLanguage("fr")}
      >
        Fran�ais
      </button>
    </div>
  );
};

// Parent component to nest children
const GeneralLayout = () => {
  return (
    <div className="min-h-screenbg-gray-100">
      <LanguageSwitcher />
      <LocalizedText />
    </div>
  );
};

// App component where LocalizationProvider wraps the component tree
const App = () => {
  return (
    <LocalizationProvider>
      <GeneralLayout />
    </LocalizationProvider>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';
import profilePic1 from './pics/profile1.png'; 
import profilePic2 from './pics/profile2.jpeg'; 
import profilePic3 from './pics/profile3.jpeg'; 
import profilePic4 from './pics/profile4.jpeg'; 
import profilePic5 from './pics/profile5.jpeg'; 
import profilePic6 from './pics/profile6.jpg'; 
import breakmapPic1 from './pics/breakmap1.jpg'; 
import breakmapPic2 from './pics/breakmap2.jpg';
import breakmapPic3 from './pics/breakmap3.jpg'; 
import breakmapPic4 from './pics/breakmap4.jpg'; 
import sunsetPic1 from './pics/sunset1.jpg';
import sunsetPic2 from './pics/sunset2.jpg';
import sunsetPic3 from './pics/sunset3.jpg';
import sunsetPic4 from './pics/sunset4.jpg';
import acaiPic1 from './pics/acai1.jpg';
import acaiPic2 from './pics/acai2.jpg';
import acaiPic3 from './pics/acai3.jpg';
import acaiPic4 from './pics/acai4.jpg';

const customStyles = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeOutDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(20px); } }
  @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;


const Lordle = ({ isDarkMode }) => {
  const LORDE_WORDS = ["ROYAL", "SOLAR", "TEETH", "SOBER", "POWER", "DAVID"];
  const [targetWord] = useState(() => LORDE_WORDS[Math.floor(Math.random() * LORDE_WORDS.length)]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing"); 

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length !== 5 || gameStatus !== "playing") return;
    
    const newGuesses = [...guesses, currentGuess.toUpperCase()];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess.toUpperCase() === targetWord) {
      setGameStatus("won");
    } else if (newGuesses.length >= 6) {
      setGameStatus("lost");
    }
  };

  const getBoxStyle = (letter, index, isSubmitted) => {
    if (!isSubmitted) {
      return letter 
        ? (isDarkMode ? 'border-pink-500 text-pink-400' : 'border-pink-400 text-pink-600')
        : (isDarkMode ? 'border-slate-700' : 'border-slate-300');
    }
    
    if (targetWord[index] === letter) {
      return 'bg-green-500 border-green-500 text-white'; 
    }
    if (targetWord.includes(letter)) {
      return 'bg-yellow-500 border-yellow-500 text-white'; 
    }
    return isDarkMode ? 'bg-slate-800 border-slate-800 text-slate-500' : 'bg-slate-200 border-slate-200 text-slate-400'; 
  };

  return (
    <div className={`p-8 rounded-3xl border shadow-sm transition-colors duration-500 flex flex-col items-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black tracking-tight mb-2">LORDLE</h3>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          I like Lorde so I made Lordle (it's really hard to think of 5 letter words related to Lorde)
        </p>
      </div>

      <div className="grid grid-rows-6 gap-2 mb-6">
        {[...Array(6)].map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const guessToRender = rowIndex < guesses.length 
            ? guesses[rowIndex] 
            : (isCurrentRow ? currentGuess.padEnd(5, " ") : "     ");
          const isSubmittedRow = rowIndex < guesses.length;

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {guessToRender.split('').map((letter, colIndex) => (
                <div 
                  key={colIndex} 
                  className={`w-12 h-12 flex items-center justify-center text-xl font-bold uppercase border-2 rounded-lg transition-all duration-300 ${getBoxStyle(letter !== " " ? letter : null, colIndex, isSubmittedRow)}`}
                >
                  {letter !== " " ? letter : ""}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {gameStatus === "playing" ? (
        <form onSubmit={handleGuessSubmit} className="flex gap-2 w-full max-w-xs">
          <input
            type="text"
            maxLength={5}
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            placeholder="Type 5 letters..."
            className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold uppercase ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'}`}
          />
          <button 
            type="submit"
            disabled={currentGuess.length !== 5}
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${currentGuess.length === 5 ? 'bg-pink-500 text-white hover:bg-pink-400' : (isDarkMode ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')}`}
          >
            Guess
          </button>
        </form>
      ) : (
        <div className="text-center animate-bounce">
          <p className="text-xl font-bold text-pink-500 mb-2">
            {gameStatus === "won" ? "Baby you're a... BIG STARRRR" : `Nice try. The word was ${targetWord}.`}
          </p>
        </div>
      )}
    </div>
  );
};


const App = () => {
  const [cwd, setCwd] = useState('~');
  const [history, setHistory] = useState([
    { text: "visitor@zhongxian:~$ ./welcome.sh", type: "command" },
    { text: "Initializing portfolio... [OK]", type: "output" },
    { text: "Type 'help' to see available commands.", type: "output" }
  ]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const terminalContainerRef = useRef(null);
  const profileGalleryRef = useRef(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      const { scrollHeight, clientHeight } = terminalContainerRef.current;
      if (scrollHeight > clientHeight) {
        terminalContainerRef.current.scrollTop = scrollHeight;
      }
    }
  }, [history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProject]);

  useEffect(() => {
    if (galleryImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [galleryImage]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollGallery = (direction) => {
    if (profileGalleryRef.current) {
      const scrollAmount = direction === 'left' ? -256 : 256; 
      profileGalleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePageChange = (projectTarget) => {
    if (isTransitioning) return; 
    
    if (projectTarget && projectTarget.title === "This Website!") {
      window.location.reload();
      return;
    }

    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveProject(projectTarget);
      setIsTransitioning(false);
    }, 300);
  };

  const fileSystem = {
    '~': ['projects', 'education', 'hobbies'],
    '~/projects': ['breakmap.swift', 'sunset_bot.py', 'acai_bot.py'],
    '~/education': ['nus_transcript.pdf', 'tembusu_college.txt'],
    '~/hobbies': ['breakinus.mp4']
  };

  const fileContents = {
    '~/projects/breakmap.swift': 'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Tracking power and freezes...")\n    }\n}',
    '~/projects/sunset_bot.py': 'import requests\nimport telebot\n\ndef get_sunset_quality():\n    # Fetching weather API to predict sunset colors\n    return "100% gorgeous, just like the reader"',
    '~/projects/acai_bot.py': 'import sqlite3\nimport telebot\n\n# Acailability Orders\ndef process_order(user_id, item):\n    db.execute("INSERT INTO orders...")\n    return "Order secured. 🥣"',
    '~/education/nus_transcript.pdf': 'Error: GPA too high. Cannot render PDF in standard text output. :)',
    '~/education/tembusu_college.txt': 'I LOVE TEMBUUUU\nShan House Best House\nYou heard it here first: I wanna host an eating competition during reading week 🤫',
    '~/hobbies/breakinus.mp4': 'Error: Binary video file.\nToo much heat to render in standard text.',
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const fullCmd = input.trim().toLowerCase();
      const args = fullCmd.split(' ').filter(Boolean);
      const command = args[0];
      const target = args[1];
      
      let output = '';
      let newCwd = cwd;

      const funfacts = ['I can solve a Rubik\'s cube in under a minute. 🧊', 'My whole family has the same horoscope! ♉', 'I am forklift ceritfied for some reason. 🚜', 'My favourite animal is the wombat <3', 'My favourite Wingstop flavour is Lemon Pepper! 🍋'];

      function getRandomString(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
      }

      if (command === 'help') {
        output = 'Available commands: about, skills, funfact, clear, ls, cd <dir>, cat <file>';
      } else if (command === 'about') {
        output = 'Problem Solver. Learner. Breaker. Builder.';
      } else if (command === 'skills') {
        output = 'Python, Swift, Java, JavaScript, React, SQL and more :)';
      } else if (command === 'funfact') {
        output = getRandomString(funfacts);
      } else if (command === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (command === 'ls') {
        output = fileSystem[cwd].join('   ');
      } else if (command === 'cd') {
        if (!target || target === '~') {
          newCwd = '~';
        } else if (target === '..') {
          newCwd = '~'; 
        } else {
          const potentialPath = cwd === '~' ? `~/${target}` : `${cwd}/${target}`;
          if (fileSystem[potentialPath]) {
            newCwd = potentialPath;
          } else if (fileSystem[cwd].includes(target)) {
            output = `cd: not a directory: ${target}`;
          } else {
            output = `cd: no such file or directory: ${target}`;
          }
        }
      } else if (command === 'cat') {
        if (!target) {
          output = 'cat: missing file operand';
        } else {
          const filePath = cwd === '~' ? `~/${target}` : `${cwd}/${target}`;
          if (fileContents[filePath]) {
            output = fileContents[filePath];
          } else if (fileSystem[filePath]) {
             output = `cat: ${target}: Is a directory`;
          } else {
            output = `cat: ${target}: No such file or directory`;
          }
        }
      } else if (command === undefined) {
        output = '';
      } else {
        output = `zsh: command not found: ${command}`;
      }

      const promptText = `visitor@zhongxian:${cwd}$ ${input}`;
      if (output !== '') {
        setHistory([...history, { text: promptText, type: "command" }, { text: output, type: "output" }]);
      } else {
        setHistory([...history, { text: promptText, type: "command" }]);
      }
      
      setCwd(newCwd);
      setInput('');
    }
  };

  const projects = [
    {
      title: "BreakMap iOS App",
      description: "Architected and deployed a SwiftUI application for breakers (breakdancers) to track their progression.",
      longDescription: "As a breaker (breakdancer), I always thought that learning new moves and figuring out what to do next was tough. Built with SwiftUI, this iOS application allows breakers to track their mastery of specific skills and visualize their progress over time.",
      tech: ["Swift", "Go (Golang)", "PostgreSQL", "SwiftUI"],
      images: [breakmapPic1, breakmapPic2, breakmapPic3, breakmapPic4], 
      github: "https://apps.apple.com/us/app/breakmap-b-boy-companion-app/id6759797675" 
    },
    {
      title: "This Website!",
      description: "A responsive, single-page application featuring a custom functional command-line interface and modern UI.",
      longDescription: "You are looking at it! 💅 I built this entire Single Page Application using React and Tailwind CSS. It features custom state management for a simulated UNIX terminal file system, dynamic dark mode routing, and conditional rendering for these beautiful project detail pages.",
      tech: ["React", "Tailwind CSS", "JavaScript", "HTML", "Next.js"],
      images: [],
      github: "https://github.com/yourusername/portfolio-v1"
    },
    {
      title: "Singapore Sunset Bot",
      description: "Telegram bot predicting sunset beauty using a weather API and letting users share sunset photos with each other.",
      longDescription: "A Python-based Telegram bot using external weather APIs and a SQLite database. It analyzes atmospheric data to predict the quality of upcoming sunsets in Singapore. Also implements a community feature allowing users to upload and share their sunset photography, as well as rate fellow users' photos.",
      tech: ["Python", "SQLite", "REST APIs"],
      images: [sunsetPic1, sunsetPic2, sunsetPic3, sunsetPic4],
      github: "https://t.me/sgsunsetbot"
    },
    {
      title: "Acai Ordering Bot",
      description: "Automated ordering for a student-led acai business in Tembusu College.",
      longDescription: "Developed to solve a real-world manpower crunch for Acailabilty, an acai business run by my friend Melvin serving residents in Tembusu College. This bot handles complex state management for order queuing, customization, and user tracking, completely replacing manual overhead with an automated backend system.",
      tech: ["Python", "SQLite"],
      images: [acaiPic1, acaiPic2, acaiPic3, acaiPic4],
      github: "https://github.com/wongzhongxian/acai-bot"
    }
  ];


  if (activeProject) {
    return (
      <div className={`min-h-screen font-sans pb-10 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
        <style>{customStyles}</style>
        
        <nav className={`p-6 border-b flex justify-between items-center sticky top-0 z-10 shadow-sm transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h1 className="text-xl font-bold tracking-tight cursor-pointer" onClick={() => handlePageChange(null)}>
            WONG ZHONG XIAN
          </h1>
          <button 
            onClick={() => handlePageChange(null)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            Back to Home
          </button>
        </nav>

        <main 
          className="max-w-4xl mx-auto py-16 px-6" 
          style={{ animation: isTransitioning ? 'fadeOutDown 0.3s ease-in forwards' : 'slideUp 0.4s ease-out forwards' }}
        >
          <div className="mb-10 text-center">
             <div className="flex flex-wrap justify-center gap-2 mb-6">
                {activeProject.tech.map(t => (
                  <span key={t} className={`px-3 py-1 text-xs font-mono font-bold rounded-full ${isDarkMode ? 'bg-pink-950 text-pink-300' : 'bg-pink-50 text-pink-600'}`}>{t}</span>
                ))}
              </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">{activeProject.title}</h1>
            <p className={`text-xl leading-relaxed max-w-3xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeProject.longDescription}
            </p>
            
            {activeProject.github && (
              <a 
                href={activeProject.github} 
                target="_blank" 
                rel="noreferrer"
                className={`mt-8 inline-block px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 ${isDarkMode ? 'bg-pink-600 hover:bg-pink-500 text-white' : 'bg-pink-500 hover:bg-pink-400 text-white'}`}
              >
                View Project
              </a>
            )}
          </div>
          
          {activeProject.images && activeProject.images.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProject.images.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setGalleryImage(img)}
                  className={`h-64 rounded-3xl overflow-hidden shadow-2xl border cursor-pointer hover:shadow-pink-500/20 transition-all ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}
                >
                  <img 
                    src={img} 
                    alt={`${activeProject.title} preview ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={`mt-12 p-12 rounded-3xl border border-dashed flex items-center justify-center text-center ${isDarkMode ? 'border-slate-700 text-slate-500' : 'border-slate-300 text-slate-400'}`}>
              <p>This project is so meta it doesn't even need a screenshot. 🚀</p>
            </div>
          )}
        </main>

        {galleryImage && (
          <div 
            style={{ animation: 'fadeIn 0.2s ease-out forwards' }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
            onClick={() => setGalleryImage(null)}
          >
            <p className="absolute top-8 right-8 text-white font-bold text-xl opacity-50 hover:opacity-100 transition-opacity">Click anywhere to close ✕</p>
            <img 
              style={{ animation: 'zoomIn 0.3s ease-out forwards' }}
              src={galleryImage} 
              alt="Expanded gallery view" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
            />
          </div>
        )}
      </div>
    );
  }

  
  const profileGalleryImages = [profilePic1, profilePic2, profilePic3, profilePic4, profilePic5, profilePic6]; 

  return (
    <div className={`min-h-screen font-sans pb-10 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      <style>{customStyles}</style>

      <nav className={`p-6 border-b flex justify-between items-center sticky top-0 z-10 shadow-sm transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <h1 className="text-xl font-bold tracking-tight cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>WONG ZHONG XIAN</h1>
        
        <div className="space-x-6 text-sm font-semibold flex items-center">
          <button onClick={() => scrollToSection('terminal')} className="hover:text-pink-500 transition focus:outline-none">Terminal</button>
          <button onClick={() => scrollToSection('lordle')} className="hover:text-pink-500 transition focus:outline-none">Lordle</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-pink-500 transition focus:outline-none">Projects</button>
        </div>
      </nav>

      <main 
        className="max-w-5xl mx-auto py-12 px-6" 
        style={{ animation: isTransitioning ? 'fadeOutDown 0.3s ease-in forwards' : 'slideUp 0.4s ease-out forwards' }}
      >

        <section id="terminal" className="mb-20">
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="bg-[#323233] px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-400 text-xs ml-2 font-mono">zhongxian — zsh</span>
            </div>
            
            <div ref={terminalContainerRef} className="p-6 font-mono text-sm h-[300px] overflow-y-auto text-green-400">
              {history.map((line, i) => (
                <div key={i} className={`mb-1 whitespace-pre-wrap ${line.type === 'command' ? 'text-white' : 'text-green-400'}`}>
                  {line.text}
                </div>
              ))}
              <div className="flex items-center mt-2">
                <span className="text-white mr-2">visitor@zhongxian:{cwd}$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none text-white w-full flex-1"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mb-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Software Engineer & Builder</h2>
            <p className={`text-xl leading-relaxed max-w-2xl transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Hi! I'm Zhong Xian, and I love solving problems and building things that make an impact.
              I'm currently studying Computer Science and Business at NUS under the Merit Scholarship. 
              I'm fluent in multiple languages, including Python, Swift, Java, and JavaScript. 
              You'll probably catch me working on my next project, breaking or spending time with people who matter to me :D
            </p>
          </div>

          <div className="relative w-64 h-64 shrink-0 group">
            
            <button 
              onClick={(e) => { e.stopPropagation(); scrollGallery('left'); }}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl ${isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
            >
              &#10094;
            </button>

            <div ref={profileGalleryRef} className={`w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-full border-8 shadow-xl transition-all duration-500 ${isDarkMode ? 'border-slate-800 hover:border-pink-500/50' : 'border-pink-50 hover:border-pink-200'}`}>
              {profileGalleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="w-full h-full shrink-0 snap-center relative cursor-pointer overflow-hidden"
                  onClick={() => setGalleryImage(img)}
                >
                   <img 
                      src={img} 
                      alt={`Zhong Xian - Gallery ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                   />
                </div>
              ))}
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); scrollGallery('right'); }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl ${isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
            >
              &#10095;
            </button>

          </div>
        </section>

        <section id="experience" className="mb-20 grid md:grid-cols-2 gap-8">
          <div className={`p-8 rounded-3xl border shadow-sm transition-colors duration-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h3 className="text-sm uppercase tracking-widest text-pink-500 font-bold mb-4">Leadership</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg">Secretary | Vice President in Training</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>BreakiNUS • Event Planning and Execution</p>
              </div>
              <div>
                <p className="font-bold text-lg">House Committee</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Tembusu College • Shan House</p>
              </div>
              <div>
                <p className="font-bold text-lg">Platoon Commander</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Singapore Armed Forces • Transport Hub West</p>
              </div>
            </div>
          </div>

          <div className={`text-white p-8 rounded-3xl shadow-sm border transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-transparent'}`}>
            <h3 className="text-sm uppercase tracking-widest text-pink-400 font-bold mb-4">Education</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg">National University of Singapore</p>
                <p className="text-slate-400">Bachelor of Computing (2025 - 2029)</p>
                <p className="text-slate-400">Bachelor of Business Administration (2025 - 2029)</p>
                <p className="text-pink-400 mt-1 font-mono text-sm">Dean's List AY25/26</p>
              </div>
              <div>
                <p className="font-bold text-lg">Raffles Institution</p>
                <p className="text-slate-400">GCE 'A' Level (2017 - 2022)</p>
              </div>
            </div>
          </div>
        </section>

        <hr className={`my-16 border-t transition-colors duration-500 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`} />

        <section id="lordle">
          <Lordle isDarkMode={isDarkMode} />
        </section>

        <hr className={`my-16 border-t transition-colors duration-500 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`} />

        <section id="projects" className="mb-20">
          <h2 className="text-3xl font-black mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <div 
                key={i} 
                onClick={() => handlePageChange(p)}
                className={`p-8 border rounded-3xl shadow-sm cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:shadow-pink-500/10' : 'bg-white border-slate-200 hover:shadow-md'}`}
              >
                <div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-pink-500">{p.title} <span className="text-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">→</span></h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.tech.map(t => (
                    <span key={t} className={`px-3 py-1 text-xs font-mono font-bold rounded-full ${isDarkMode ? 'bg-pink-950 text-pink-300' : 'bg-pink-50 text-pink-600'}`}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <footer className={`pt-12 border-t flex flex-col items-center justify-center text-center transition-colors duration-500 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 ${isDarkMode ? 'bg-slate-50 text-slate-900' : 'bg-slate-900 text-slate-50'}`}
          >
            {isDarkMode ? '☀️ Turn on the lights' : '🌙 TURN IT OFFFF'}
          </button>
          <p className={`mt-6 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            I added this button ⬆️ to teach myself React state management
          </p>

          <div className={`mt-8 flex gap-8 font-bold text-lg ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`}>
            <a href="mailto:wzhongxianmu@gmail.com" className="hover:text-pink-300 transition-colors hover:-translate-y-1 transform inline-block">
              Email
            </a>
            <a href="https://instagram.com/wongzhongsilver" target="_blank" rel="noreferrer" className="hover:text-pink-300 transition-colors hover:-translate-y-1 transform inline-block">
              Instagram
            </a>
            <a href="https://linkedin.com/in/zhong-xian-wong" target="_blank" rel="noreferrer" className="hover:text-pink-300 transition-colors hover:-translate-y-1 transform inline-block">
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      {galleryImage && (
        <div 
          style={{ animation: 'fadeIn 0.2s ease-out forwards' }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setGalleryImage(null)}
        >
          <p className="absolute top-8 right-8 text-white font-bold text-xl opacity-50 hover:opacity-100 transition-opacity">Click anywhere to close ✕</p>
          <img 
            style={{ animation: 'zoomIn 0.3s ease-out forwards' }}
            src={galleryImage} 
            alt="Expanded gallery view" 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
          />
        </div>
      )}
    </div>
  );
};

export default App;
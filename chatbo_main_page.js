// --- CONFIGURATION ---
        // Replace 'Rishikesh Majumder' with the actual user name for personalized greetings
        const CHAT_CONTAINER = document.getElementById('chatContainer');
        const MESSAGE_INPUT = document.getElementById('messageInput');
        const TOOLS_ICON = document.getElementById('toolsIcon');
        const COMPANION_DROPDOWN = document.getElementById('companionDropdown');
        const MODE_DISPLAY = document.getElementById('modeDisplay');
        const MODE_DROPDOWN = document.getElementById('modeDropdown');
        const SEND_BUTTON = document.getElementById('sendButton');
        const INITIAL_BOT_MESSAGE = document.getElementById('initialBotMessage').parentElement;

        // Current companion state
        let currentCompanion = 'None';
        let conversationCount = JSON.parse(localStorage.getItem('companion_conversations')) || {};

        // Define companion personalities and greeting logic
        const companionData = {
            'None': {
                name: 'Standard AI',
                greeting: () => "Hi! I'm your default assistant. What can I help you with today?"
            },
            'Bob': {
                name: 'Bob (Mental Health)',
                greeting: (isReturning) => isReturning ?
                    `Hey ${USER_NAME}, glad to see you again!` : `Hi ${USER_NAME}, nice to meet you, what's going on?`
            },
            'Sara': {
                name: 'Sara (English Learning)',
                greeting: (isReturning) => isReturning ?
                    `Oh, it's you ${USER_NAME}, glad to see you again!` : `Hey ${USER_NAME}, glad to see you, I hope we will have a great conversation. So what's on your mind?`
            },
            'Cristiana': {
                name: 'Cristiana (The Strategist)',
                greeting: (isReturning) => isReturning ?
                    `Welcome back, ${USER_NAME}. Let's cut to the chase: what challenge are we optimizing today?` : `Greetings, ${USER_NAME}. I specialize in tactical planning. State your objective, and we'll strategize.`
            },
            'Aryan': {
                name: 'Aryan (The Historian)',
                greeting: (isReturning) => isReturning ?
                    `Ah, ${USER_NAME}, your presence is noted once more. What chapter of knowledge shall we delve into this time?` : `Hello ${USER_NAME}. I am Aryan, a curator of history and lore. Which tale or fact shall we explore today?`
            },
            'Maya': {
                name: 'Maya (The Creative)',
                greeting: (isReturning) => isReturning ?
                    `Hey ${USER_NAME}! Good to see your spark again. Ready to paint some ideas on the canvas of conversation?` : `Hi there, ${USER_NAME}! I'm Maya, here to help you unlock your creativity. What masterpiece are we imagining?`
            },
            'Amar': {
                name: 'Amar (The Technologist)',
                greeting: (isReturning) => isReturning ?
                    `Access granted, ${USER_NAME}. System status is optimal. Let's process some data.` : `[BOOT UP COMPLETE] Greetings, ${USER_NAME}. I am Amar, your technical interface. How may I assist in debugging your query?`
            }
        };

        function displayMessage(content, sender) {
            const rowClass = sender === 'user' ? 'user-row' : 'bot-row';
            const newMessage = document.createElement('div');
            newMessage.className = `message-row ${rowClass}`;
            newMessage.innerHTML = `<div class="message-bubble">${content}</div>`;

            // Use a slight timeout to trigger the CSS animation
            setTimeout(() => {
                CHAT_CONTAINER.appendChild(newMessage);
                scrollToBottom();
            }, 50); // Small delay for animation effect
        }

        /**
         * Scrolls the chat container to the bottom.
         */
        function scrollToBottom() {
            CHAT_CONTAINER.scrollTop = CHAT_CONTAINER.scrollHeight;
        }

        /**
         * Handles the logic for sending a message (simulated).
         */
        function sendMessage() {
            const content = MESSAGE_INPUT.value.trim();
            if (content === '') return;

            // 1. Display User Message
            displayMessage(content, 'user');

            // 2. Clear the input and reset height
            MESSAGE_INPUT.value = '';
            adjustInputHeight();

            // 3. Simulate Bot Response (simple echo + companion name)
            const companionName = companionData[currentCompanion].name;
            const botResponse = `(Response from **${companionName}**): You said: "${content}". This is a dummy reply. In a real app, I would now generate a context-aware response.`;

            // Simulate a delay for the bot response
            setTimeout(() => {
                displayMessage(botResponse, 'bot');
            }, 800);
        }

        /**
         * Generates and displays the companion's first-time or returning greeting.
         * @param {string} companionKey - The key of the selected companion (e.g., 'Bob').
         */
        function displayGreeting(companionKey) {
            const isFirstTime = !conversationCount[companionKey];
            const greetingText = companionData[companionKey].greeting(isFirstTime);

            // Remove the default message if it exists
            if (INITIAL_BOT_MESSAGE && CHAT_CONTAINER.contains(INITIAL_BOT_MESSAGE)) {
                CHAT_CONTAINER.removeChild(INITIAL_BOT_MESSAGE);
            }

            // Display the special greeting
            displayMessage(greetingText, 'bot');

            // Update conversation count and localStorage
            conversationCount[companionKey] = (conversationCount[companionKey] || 0) + 1;
            localStorage.setItem('companion_conversations', JSON.stringify(conversationCount));
        }

        /**
         * Updates the UI and triggers the greeting when a new companion is selected.
         * @param {string} newCompanionKey - The key of the selected companion.
         */
        function selectCompanion(newCompanionKey) {
            if (currentCompanion === newCompanionKey) return; // No change

            currentCompanion = newCompanionKey;

            // 1. Update the dropdown UI
            document.querySelectorAll('#companionDropdown .dropdown-item').forEach(item => {
                item.classList.remove('selected');
                if (item.getAttribute('data-char') === newCompanionKey) {
                    item.classList.add('selected');
                }
            });

            // 2. Close dropdown
            COMPANION_DROPDOWN.classList.remove('show');

            // 3. Display the companion's greeting
            displayGreeting(newCompanionKey);

            // 4. Update the input placeholder
            const companionName = companionData[newCompanionKey].name;
            MESSAGE_INPUT.placeholder = `Ask your companion (${companionName})...`;
        }

        /**
         * Adjusts the height of the textarea to fit its content (max 200px).
         */
        function adjustInputHeight() {
            MESSAGE_INPUT.style.height = 'auto'; // Reset height
            MESSAGE_INPUT.style.height = MESSAGE_INPUT.scrollHeight + 'px';
        }

        // --- EVENT LISTENERS ---

        // 1. Companion Dropdown Logic (Toggle)
        TOOLS_ICON.addEventListener('click', () => {
            COMPANION_DROPDOWN.classList.toggle('show');
            MODE_DROPDOWN.classList.remove('show'); // Close other dropdown
        });

        // 2. Companion Selection
        COMPANION_DROPDOWN.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const charKey = item.getAttribute('data-char');
                selectCompanion(charKey);
            }
        });

        // 3. Mode Dropdown Logic (Toggle)
        MODE_DISPLAY.addEventListener('click', () => {
            MODE_DROPDOWN.classList.toggle('show');
            COMPANION_DROPDOWN.classList.remove('show'); // Close other dropdown
        });

        // 4. Mode Selection (Visual Only)
        MODE_DROPDOWN.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const mode = item.getAttribute('data-mode');
                MODE_DISPLAY.innerHTML = `${mode} <span class="material-icons">arrow_drop_down</span>`;

                document.querySelectorAll('#modeDropdown .dropdown-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');

                MODE_DROPDOWN.classList.remove('show');
            }
        });

        // 5. Input Field Handling (Enter Key and Height Adjustment)
        MESSAGE_INPUT.addEventListener('input', adjustInputHeight);
        MESSAGE_INPUT.addEventListener('keydown', (e) => {
            // Check for Enter key without Shift
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent new line
                sendMessage();
            }
        });

        // 6. Send Button (Click)
        SEND_BUTTON.addEventListener('click', sendMessage);

        // 7. Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            const isToolsClick = e.target === TOOLS_ICON;
            const isModeClick = e.target.closest('#modeDropdownContainer');

            if (!isToolsClick && !e.target.closest('#companionDropdownContainer')) {
                COMPANION_DROPDOWN.classList.remove('show');
            }
            if (!isModeClick) {
                MODE_DROPDOWN.classList.remove('show');
            }
        });
        // 8. mic button (click)
          const micBtn = document.getElementById("micIcon");
  const input = document.getElementById("messageInput");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported in this browser");
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;

  micBtn.addEventListener("click", () => {
    recognition.start();
    micBtn.classList.add("active");
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
  };

  recognition.onend = () => {
    micBtn.classList.remove("active");
  };


        /**
         * Initialization function run on page load.
         */
        function init() {
            // Restore initial height of the textarea
            adjustInputHeight();
            // Set initial companion to 'None' (Standard AI)
            selectCompanion('None');
            // Ensure chat is at the bottom initially (for the default message)
            scrollToBottom();
        }

        // Run the initialization
        window.onload = init;